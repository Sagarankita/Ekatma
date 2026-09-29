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
import type { GovNodeData } from '../components/GovApprovalNode';

export const BASE_GOV_NODES: GovNodeData[] = [
  {
    id: 'land',
    label: 'MIDC Land / Plot Context',
    dept: 'MIDC',
    type: 'midc',
    status: 'completed',
    ref: 'MIDC-APP-2026-00418-LAND',
    relationship: 'Upstream / MIDC Controlled',
    blocking: false,
    children: ['bldg'],
  },
  {
    id: 'mpcb',
    label: 'MPCB Consent to Establish',
    dept: 'MPCB',
    type: 'external',
    status: 'completed',
    ref: 'MPCB-CTE-2026-7812',
    relationship: 'External / Upstream',
    blocking: false,
    children: ['bldg'],
  },
  {
    id: 'bldg',
    label: 'MIDC Building / Planning',
    dept: 'MIDC',
    type: 'midc',
    status: 'current',
    ref: 'MIDC-APP-2026-00418',
    relationship: 'MIDC Controlled / Current',
    blocking: false,
    children: ['fire', 'water', 'construction'],
  },
  {
    id: 'fire',
    label: 'Provisional Fire NOC',
    dept: 'Fire Authority',
    type: 'external',
    status: 'conditional',
    ref: '-',
    relationship: 'Conditional / Downstream',
    blocking: false,
    unlockCondition: 'Building / Planning reaches configured required state',
    children: ['preop'],
  },
  {
    id: 'water',
    label: 'MIDC Water / Utility',
    dept: 'MIDC',
    type: 'midc',
    status: 'ready',
    ref: '-',
    relationship: 'Parallel / Downstream',
    blocking: false,
    unlockCondition: 'Building / Planning approved; may proceed in parallel per config',
    children: ['preop'],
  },
  {
    id: 'cond-noc',
    label: 'Conditional NOC(s)',
    dept: 'Configured Authority',
    type: 'external',
    status: 'blocked',
    ref: '-',
    relationship: 'Conditional',
    blocking: true,
    unlockCondition: 'Upstream configured dependencies satisfied',
    children: ['construction'],
  },
  {
    id: 'construction',
    label: 'Construction',
    dept: 'Entrepreneur',
    type: 'milestone',
    status: 'blocked',
    ref: '-',
    relationship: 'Downstream Milestone',
    blocking: true,
    unlockCondition: 'Building / Planning, Fire NOC and configured utilities complete',
    children: ['preop'],
  },
  {
    id: 'preop',
    label: 'Pre-operation Approvals',
    dept: 'Multiple',
    type: 'milestone',
    status: 'blocked',
    ref: '-',
    relationship: 'Downstream Milestone',
    blocking: true,
    unlockCondition: 'Construction milestone reached + configured upstream requirements',
  },
];

const BASE_GOV_EDGES: { id: string; source: string; target: string; type?: string }[] = [
  { id: 'land->bldg', source: 'land', target: 'bldg' },
  { id: 'mpcb->bldg', source: 'mpcb', target: 'bldg' },
  { id: 'bldg->water', source: 'bldg', target: 'water' },
  { id: 'bldg->fire', source: 'bldg', target: 'fire', type: 'conditional' },
  { id: 'bldg->construction', source: 'bldg', target: 'construction' },
  { id: 'cond-noc->construction', source: 'cond-noc', target: 'construction', type: 'conditional' },
  { id: 'water->preop', source: 'water', target: 'preop' },
  { id: 'fire->preop', source: 'fire', target: 'preop' },
  { id: 'construction->preop', source: 'construction', target: 'preop' },
];

function getLayoutedElements(nodes: Node<GovNodeData>[], edges: Edge[]) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: 'LR', nodesep: 65, ranksep: 130 });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: 270, height: 160 });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: {
        x: nodeWithPosition ? nodeWithPosition.x : 0,
        y: nodeWithPosition ? nodeWithPosition.y - 80 : 0,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

export function useGovDependencyGraph() {
  const [nodesData, setNodesData] = useState<GovNodeData[]>(BASE_GOV_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('bldg');
  const [relationshipFilter, setRelationshipFilter] = useState<'all' | 'prerequisites' | 'parallel' | 'conditional' | 'downstream' | 'blocked'>('all');

  // Compute prerequisite summaries for each node
  const computedNodesData = useMemo(() => {
    return nodesData.map(node => {
      const parentNodes = nodesData.filter(n => n.children?.includes(node.id));
      const prereqNames = parentNodes.map(p => p.label);
      return {
        ...node,
        prerequisitesSummary: prereqNames.length > 0 ? prereqNames.join(', ') : undefined,
      };
    });
  }, [nodesData]);

  // Construct React Flow Nodes
  const rawFlowNodes: Node<GovNodeData>[] = useMemo(() => {
    return computedNodesData
      .filter(data => {
        if (relationshipFilter === 'all') return true;
        if (relationshipFilter === 'prerequisites') return data.id === 'land' || data.id === 'mpcb';
        if (relationshipFilter === 'parallel') return data.id === 'water';
        if (relationshipFilter === 'conditional') return data.id === 'fire' || data.id === 'cond-noc';
        if (relationshipFilter === 'downstream') return data.children?.includes('bldg') || data.id === 'water' || data.id === 'fire' || data.id === 'construction' || data.id === 'preop';
        if (relationshipFilter === 'blocked') return data.status === 'blocked';
        return true;
      })
      .map(data => ({
        id: data.id,
        type: 'govApproval',
        data,
        position: { x: 0, y: 0 },
      }));
  }, [computedNodesData, relationshipFilter]);

  // Construct React Flow Edges with Smart Dimming
  const rawFlowEdges: Edge[] = useMemo(() => {
    return BASE_GOV_EDGES.map(edge => {
      const isConnected = selectedNodeId
        ? edge.source === selectedNodeId || edge.target === selectedNodeId
        : true;

      const isConditional = edge.type === 'conditional';
      const sourceNode = computedNodesData.find(n => n.id === edge.source);
      const isSourceCompleted = sourceNode?.status === 'completed';

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: isConnected && (isSourceCompleted && edge.target === 'bldg'),
        style: {
          stroke: isConnected
            ? isSourceCompleted ? '#10b981' : isConditional ? '#D4A017' : '#6DAE7C'
            : '#c8d4c7',
          strokeWidth: isConnected ? 2.5 : 1,
          opacity: selectedNodeId ? (isConnected ? 1 : 0.25) : 1,
          strokeDasharray: isConditional ? '5 5' : undefined,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isConnected
            ? isSourceCompleted ? '#10b981' : isConditional ? '#D4A017' : '#6DAE7C'
            : '#c8d4c7',
        },
      };
    });
  }, [computedNodesData, selectedNodeId]);

  // Dagre Layout
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    return getLayoutedElements(rawFlowNodes, rawFlowEdges);
  }, [rawFlowNodes, rawFlowEdges]);

  const [nodes, setNodes] = useState<Node<GovNodeData>[]>(layoutedNodes);
  const [edges, setEdges] = useState<Edge[]>(layoutedEdges);

  useMemo(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges]);

  const onNodesChange: OnNodesChange<Node<GovNodeData>> = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds) as Node<GovNodeData>[]),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const approveNode = useCallback((nodeId: string) => {
    setNodesData(prev =>
      prev.map(node => {
        if (node.id === nodeId) {
          return { ...node, status: 'completed' };
        }
        // Unlock downstream child nodes
        if (nodeId === 'bldg' && (node.id === 'water' || node.id === 'fire' || node.id === 'construction')) {
          return { ...node, status: node.id === 'water' ? 'completed' : 'ready' };
        }
        return node;
      })
    );
  }, []);

  const selectedNode = useMemo(() => {
    return computedNodesData.find(n => n.id === selectedNodeId) || null;
  }, [computedNodesData, selectedNodeId]);

  const metrics = useMemo(() => {
    const total = computedNodesData.length;
    const prerequisites = computedNodesData.filter(n => n.id === 'land' || n.id === 'mpcb').length;
    const current = computedNodesData.filter(n => n.status === 'current').length;
    const parallel = computedNodesData.filter(n => n.id === 'water').length;
    const conditional = computedNodesData.filter(n => n.status === 'conditional' || n.id === 'cond-noc').length;
    const downstream = computedNodesData.filter(n => n.id === 'construction' || n.id === 'preop').length;
    const blocked = computedNodesData.filter(n => n.status === 'blocked').length;

    return { total, prerequisites, current, parallel, conditional, downstream, blocked };
  }, [computedNodesData]);

  return {
    nodes,
    edges,
    selectedNodeId,
    selectedNode,
    allNodes: computedNodesData,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
    setSelectedNodeId,
    relationshipFilter,
    setRelationshipFilter,
    approveNode,
    metrics,
  };
}
