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
  formsCount: number;
  completedFormsCount: number;
  completedSubFormIndices: number[];
  subForms: string[];
  prerequisitesSummary?: string;
  unlocksSummary?: string;
  dependencies: { reqId: string; type: string }[];
  unlocks: string[];
  enrichment: ReqEnrichment;
}

// Map stage key to X position rank order for swimlanes
const STAGE_X_OFFSET: Record<string, number> = {
  land: 40,
  establishment: 360,
  construction: 680,
  utilities: 1000,
  'pre-operation': 1320,
  compliance: 1640,
  operations: 1640,
  growth: 1640,
};

// Compute Dagre Hierarchical Layout
function getLayoutedElements(nodes: Node<GraphNodeData>[], edges: Edge[]) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Graph direction Left-to-Right for DAG swimlane flow
  dagreGraph.setGraph({ rankdir: 'LR', nodesep: 70, ranksep: 140 });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: 260, height: 160 });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const stageKey = node.data.stage;
    const customX = STAGE_X_OFFSET[stageKey] ?? (nodeWithPosition ? nodeWithPosition.x : 0);
    const customY = nodeWithPosition ? nodeWithPosition.y - 80 : 0;

    return {
      ...node,
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: {
        x: customX,
        y: customY,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

export function useDependencyGraph(projectId: string, initialCteApproved = false) {
  const [cteApproved, setCteApproved] = useState(initialCteApproved);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('EST-001');

  // Sub-form completion tracking: nodeId -> array of completed subform indices
  const [formCompletions, setFormCompletions] = useState<Record<string, number[]>>({
    'LAND-001': [0, 1, 2, 3], // Land possession is completed by default
  });

  // Base raw nodes from domain engine
  const baseJourneyNodes = useMemo(() => buildJourneyNodes(cteApproved), [cteApproved]);

  // Compute live node statuses based on sub-form completions and parent prerequisite states
  const computedNodesData = useMemo(() => {
    const nodesMap: Record<string, GraphNodeData> = {};

    // 1. Initial mapping
    baseJourneyNodes.forEach(req => {
      const enrichment = getEnrichment(req.id);
      const subForms = enrichment.forms.map(f => f.name);
      const completedIndices = formCompletions[req.id] || [];

      // Initial status check
      let status: GraphNodeData['status'] = 'blocked';

      if (req.displayState === 'not-applicable' || req.displayState === 'conditional') {
        status = 'conditional';
      } else if (req.displayState === 'approved' || completedIndices.length >= subForms.length) {
        status = 'completed';
      } else if (completedIndices.length > 0) {
        status = 'in-progress';
      } else if (req.displayState === 'ready') {
        status = 'ready';
      }

      nodesMap[req.id] = {
        id: req.id,
        title: req.service,
        department: req.department,
        stage: req.stage,
        status,
        formsCount: subForms.length,
        completedFormsCount: completedIndices.length,
        completedSubFormIndices: completedIndices,
        subForms,
        dependencies: req.dependencies,
        unlocks: req.unlocks || [],
        enrichment,
      };
    });

    // 2. DAG Progression Engine (Loop to resolve prerequisite dependencies according to FEATURE_FLOW.md)
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
            changed = true;
          } else if (!allPrereqsCompleted && node.status !== 'blocked') {
            node.status = 'blocked';
            changed = true;
          }
        } else if (node.status === 'blocked') {
          node.status = 'ready';
          changed = true;
        }
      });
    }

    // 3. Summaries for tooltips / node cards
    Object.values(nodesMap).forEach(node => {
      const prereqNames = node.dependencies
        .map(d => nodesMap[d.reqId]?.title)
        .filter(Boolean);
      node.prerequisitesSummary = prereqNames.length > 0 ? prereqNames.join(', ') : undefined;
    });

    return Object.values(nodesMap);
  }, [baseJourneyNodes, formCompletions]);

  // Next Recommended Action Node
  const nextRecommendedNode = useMemo(() => {
    return computedNodesData.find(n => n.status === 'ready' || n.status === 'in-progress') || computedNodesData[0] || null;
  }, [computedNodesData]);

  // Construct React Flow Nodes & Edges
  const rawFlowNodes: Node<GraphNodeData>[] = useMemo(() => {
    return computedNodesData.map(data => ({
      id: data.id,
      type: 'approval',
      data,
      position: { x: 0, y: 0 },
    }));
  }, [computedNodesData]);

  // Smart Edge Highlighting: Dim unrelated edges when a node is selected
  const rawFlowEdges: Edge[] = useMemo(() => {
    const edgesList: Edge[] = [];
    computedNodesData.forEach(node => {
      node.dependencies.forEach(dep => {
        const isConditional = dep.type === 'conditional';
        const sourceNode = computedNodesData.find(n => n.id === dep.reqId);
        const isSourceCompleted = sourceNode?.status === 'completed';

        // Check if edge is connected to current selected node
        const isConnected = selectedNodeId
          ? dep.reqId === selectedNodeId || node.id === selectedNodeId
          : true;

        edgesList.push({
          id: `${dep.reqId}->${node.id}`,
          source: dep.reqId,
          target: node.id,
          animated: isConnected && (isSourceCompleted && node.status === 'in-progress'),
          style: {
            stroke: isConnected
              ? isSourceCompleted ? '#10b981' : isConditional ? '#f59e0b' : '#2563eb'
              : '#cbd5e1',
            strokeWidth: isConnected ? 2.5 : 1,
            opacity: selectedNodeId ? (isConnected ? 1 : 0.25) : 1,
            strokeDasharray: isConditional ? '5 5' : undefined,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isConnected
              ? isSourceCompleted ? '#10b981' : isConditional ? '#f59e0b' : '#2563eb'
              : '#cbd5e1',
          },
        });
      });
    });
    return edgesList;
  }, [computedNodesData, selectedNodeId]);

  // Layout elements with Dagre
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

  // Complete sub-form action in sidebar
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

  const selectedNode = useMemo(() => {
    return computedNodesData.find(n => n.id === selectedNodeId) || null;
  }, [computedNodesData, selectedNodeId]);

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
