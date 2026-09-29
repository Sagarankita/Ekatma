'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  Position,
  MarkerType,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import {
  buildJourneyNodes,
  getEnrichment,
  type ReqEnrichment,
} from '../data';

export interface GraphNodeData extends Record<string, unknown> {
  id: string;
  title: string;
  department: string;
  stage: string;
  status: 'completed' | 'in-progress' | 'ready' | 'blocked' | 'conditional';
  statusLabel?: string;
  isSelected?: boolean;
  isPrerequisite?: boolean;
  isDownstream?: boolean;
  isDeemphasized?: boolean;
  dependencies: { reqId: string; type: string; reason?: string }[];
  unlocks: string[];
  enrichment: ReqEnrichment;
  subForms: string[];
  formsCount: number;
  completedFormsCount: number;
  completedSubFormIndices: number[];
}

// Horizontal stage positioning to reinforce lifecycle milestone progression
const STAGE_X_OFFSET: Record<string, number> = {
  land: 40,
  establishment: 360,
  construction: 680,
  utilities: 1000,
  'pre-operation': 1320,
  compliance: 1640,
  operations: 1960,
  growth: 2280,
};

// Compute Dagre Hierarchical Layout with stage vertical spacing (Left-to-Right DAG workflow)
function getLayoutedElements(nodes: Node<GraphNodeData>[], edges: Edge[]) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: 'LR', nodesep: 70, ranksep: 120 });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: 230, height: 130 });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  // Group nodes by stage to assign non-overlapping vertical positions
  const nodesByStage: Record<string, Node<GraphNodeData>[]> = {};
  nodes.forEach(node => {
    const stageKey = node.data.stage || 'land';
    if (!nodesByStage[stageKey]) nodesByStage[stageKey] = [];
    nodesByStage[stageKey].push(node);
  });

  const NODE_HEIGHT = 135;
  const GAP_Y = 35;
  const layoutedNodes: Node<GraphNodeData>[] = [];

  Object.entries(nodesByStage).forEach(([stage, stageNodes]) => {
    const customX = STAGE_X_OFFSET[stage] ?? (dagreGraph.node(stageNodes[0]?.id)?.x ?? 40);

    // Sort nodes within the stage by Dagre Y rank or ID
    stageNodes.sort((a, b) => {
      const posA = dagreGraph.node(a.id)?.y ?? 0;
      const posB = dagreGraph.node(b.id)?.y ?? 0;
      return posA - posB;
    });

    stageNodes.forEach((node, index) => {
      const customY = 40 + index * (NODE_HEIGHT + GAP_Y);
      layoutedNodes.push({
        ...node,
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        position: {
          x: customX,
          y: customY,
        },
      });
    });
  });

  return { nodes: layoutedNodes, edges };
}

export function useDependencyGraph(projectId: string, initialCteApproved = false) {
  const [cteApproved, setCteApproved] = useState(initialCteApproved);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('EST-001');

  // Sub-form completion tracking: nodeId -> array of completed subform indices
  const [formCompletions, setFormCompletions] = useState<Record<string, number[]>>({
    'LAND-001': [0, 1, 2, 3], // Land possession completed by default
  });

  // Base raw nodes from domain engine
  const baseJourneyNodes = useMemo(() => buildJourneyNodes(cteApproved), [cteApproved]);

  // Compute live node data based on domain statuses and prerequisite completions
  const computedNodesData = useMemo(() => {
    const nodesMap: Record<string, GraphNodeData> = {};

    // 1. Initial mapping
    baseJourneyNodes.forEach(req => {
      const enrichment = getEnrichment(req.id);
      const subForms = enrichment.forms.map(f => f.name);
      const completedIndices = formCompletions[req.id] || [];

      let status: GraphNodeData['status'] = 'blocked';
      let statusLabel = 'Pending prerequisite';

      if (req.displayState === 'not-applicable' || req.displayState === 'conditional') {
        status = 'conditional';
        statusLabel = 'Conditional';
      } else if (req.displayState === 'approved' || completedIndices.length >= subForms.length) {
        status = 'completed';
        statusLabel = 'Completed';
      } else if (completedIndices.length > 0) {
        status = 'in-progress';
        statusLabel = 'In progress';
      } else if (req.displayState === 'ready') {
        status = 'ready';
        statusLabel = 'Ready to apply';
      }

      nodesMap[req.id] = {
        id: req.id,
        title: req.service,
        department: req.department,
        stage: req.stage,
        status,
        statusLabel,
        formsCount: subForms.length,
        completedFormsCount: completedIndices.length,
        completedSubFormIndices: completedIndices,
        subForms,
        dependencies: req.dependencies,
        unlocks: req.unlocks || [],
        enrichment,
      };
    });

    // 2. DAG Progression Engine (Prerequisite dependencies resolution)
    let changed = true;
    let iterations = 0;
    while (changed && iterations < 10) {
      changed = false;
      iterations++;

      Object.values(nodesMap).forEach(node => {
        if (node.status === 'completed' || node.status === 'conditional') return;

        const hardPrereqs = node.dependencies.filter(d => d.type === 'hard');
        if (hardPrereqs.length > 0) {
          const allPrereqsCompleted = hardPrereqs.every(dep => {
            const parent = nodesMap[dep.reqId];
            return parent && parent.status === 'completed';
          });

          if (allPrereqsCompleted && node.status === 'blocked') {
            node.status = node.completedFormsCount > 0 ? 'in-progress' : 'ready';
            node.statusLabel = node.completedFormsCount > 0 ? 'In progress' : 'Ready to apply';
            changed = true;
          } else if (!allPrereqsCompleted && node.status !== 'blocked') {
            node.status = 'blocked';
            node.statusLabel = 'Pending prerequisite';
            changed = true;
          }
        } else if (node.status === 'blocked') {
          node.status = 'ready';
          node.statusLabel = 'Ready to apply';
          changed = true;
        }
      });
    }

    return Object.values(nodesMap);
  }, [baseJourneyNodes, formCompletions]);

  // Selected node object
  const selectedNode = useMemo(() => {
    return computedNodesData.find(n => n.id === selectedNodeId) || null;
  }, [computedNodesData, selectedNodeId]);

  // Identify direct prerequisites and downstream of selected node
  const { prerequisiteIds, downstreamIds } = useMemo(() => {
    if (!selectedNode) {
      return { prerequisiteIds: new Set<string>(), downstreamIds: new Set<string>() };
    }

    // Direct prerequisites: parents of selectedNode
    const prereqSet = new Set<string>(selectedNode.dependencies.map(d => d.reqId));

    // Direct downstream: nodes that have selectedNode in their dependencies or unlocks
    const downSet = new Set<string>(selectedNode.unlocks);
    computedNodesData.forEach(n => {
      if (n.dependencies.some(d => d.reqId === selectedNode.id)) {
        downSet.add(n.id);
      }
    });

    return { prerequisiteIds: prereqSet, downstreamIds: downSet };
  }, [selectedNode, computedNodesData]);

  // Construct React Flow Nodes with dependency highlighting & de-emphasis flags
  const rawFlowNodes: Node<GraphNodeData>[] = useMemo(() => {
    return computedNodesData.map(data => {
      const isSelected = selectedNodeId ? data.id === selectedNodeId : false;
      const isPrerequisite = selectedNodeId ? prerequisiteIds.has(data.id) : false;
      const isDownstream = selectedNodeId ? downstreamIds.has(data.id) : false;
      const isDeemphasized = selectedNodeId
        ? !isSelected && !isPrerequisite && !isDownstream
        : false;

      return {
        id: data.id,
        type: 'approval',
        data: {
          ...data,
          isSelected,
          isPrerequisite,
          isDownstream,
          isDeemphasized,
        },
        position: { x: 0, y: 0 },
      };
    });
  }, [computedNodesData, selectedNodeId, prerequisiteIds, downstreamIds]);

  // Construct React Flow Edges with clear arrows and dependency highlighting
  const rawFlowEdges: Edge[] = useMemo(() => {
    const edgesList: Edge[] = [];

    computedNodesData.forEach(node => {
      node.dependencies.forEach(dep => {
        const isConditional = dep.type === 'conditional';
        const sourceNode = computedNodesData.find(n => n.id === dep.reqId);
        const isSourceCompleted = sourceNode?.status === 'completed';

        // Check relationship to currently selected node
        const isIncomingToSelected = selectedNodeId === node.id;
        const isOutgoingFromSelected = selectedNodeId === dep.reqId;
        const isDirectlyConnected = isIncomingToSelected || isOutgoingFromSelected;

        let edgeColor = '#555C56';
        let strokeWidth = 2;
        let opacity = 0.75;
        let isAnimated = false;

        if (selectedNodeId) {
          if (isIncomingToSelected) {
            // Prerequisite line flowing into selected node
            edgeColor = '#059669'; // Emerald
            strokeWidth = 3;
            opacity = 1;
            isAnimated = true;
          } else if (isOutgoingFromSelected) {
            // Downstream line flowing out of selected node
            edgeColor = '#6DAE7C'; // Blue
            strokeWidth = 3;
            opacity = 1;
            isAnimated = true;
          } else {
            // Unrelated edge dimmed
            edgeColor = '#9ab098';
            strokeWidth = 1.5;
            opacity = 0.12;
          }
        } else {
          // Default unselected appearance
          if (isSourceCompleted) {
            edgeColor = '#10b981';
          } else if (isConditional) {
            edgeColor = '#8b5cf6';
          }
        }

        edgesList.push({
          id: `${dep.reqId}->${node.id}`,
          source: dep.reqId,
          target: node.id,
          animated: isAnimated,
          style: {
            stroke: edgeColor,
            strokeWidth,
            opacity,
            strokeDasharray: isConditional ? '6 4' : undefined,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 16,
            height: 16,
            color: edgeColor,
          },
        });
      });
    });

    return edgesList;
  }, [computedNodesData, selectedNodeId]);

  // Compute Dagre Layout
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    return getLayoutedElements(rawFlowNodes, rawFlowEdges);
  }, [rawFlowNodes, rawFlowEdges]);

  const [nodes, setNodes] = useState<Node<GraphNodeData>[]>(layoutedNodes);
  const [edges, setEdges] = useState<Edge[]>(layoutedEdges);

  // Sync state when layout recalculates
  useMemo(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges]);

  const onNodesChange: OnNodesChange<Node<GraphNodeData>> = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds) as Node<GraphNodeData>[]),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const completeSubFormStep = useCallback((nodeId: string, formIdx: number) => {
    setFormCompletions(prev => {
      const current = prev[nodeId] || [];
      if (current.includes(formIdx)) return prev;
      return { ...prev, [nodeId]: [...current, formIdx] };
    });
  }, []);

  const resetGraph = useCallback(() => {
    setCteApproved(false);
    setFormCompletions({ 'LAND-001': [0, 1, 2, 3] });
  }, []);

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = computedNodesData.length;
    const completed = computedNodesData.filter(n => n.status === 'completed').length;
    const inProgress = computedNodesData.filter(n => n.status === 'in-progress').length;
    const ready = computedNodesData.filter(n => n.status === 'ready').length;
    const blocked = computedNodesData.filter(n => n.status === 'blocked').length;
    const conditional = computedNodesData.filter(n => n.status === 'conditional').length;

    return { total, completed, inProgress, ready, blocked, conditional };
  }, [computedNodesData]);

  // Next recommended action
  const nextRecommendedNode = useMemo(() => {
    return (
      computedNodesData.find(n => n.status === 'ready' || n.status === 'in-progress') ||
      computedNodesData[0] ||
      null
    );
  }, [computedNodesData]);

  return {
    nodes,
    edges,
    selectedNodeId,
    selectedNode,
    nextRecommendedNode,
    allNodes: computedNodesData,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
    setSelectedNodeId,
    completeSubFormStep,
    resetGraph,
    cteApproved,
    setCteApproved,
    metrics,
  };
}
