'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { DepNode } from '@/domain/types';

export interface DepEdge {
  id: string;
  source: string;
  target: string;
  relationship: 'prerequisite' | 'conditional' | 'parallel' | 'downstream';
  label: string;
  condition?: string;
  blocking?: boolean;
}

export const M17_DEFAULT_EDGES: DepEdge[] = [
  { id: 'e-land-bldg', source: 'land', target: 'bldg', relationship: 'prerequisite', label: 'Prerequisite (Satisfied)', condition: 'Land / Plot allotment confirmed & verified by MIDC Land Desk', blocking: false },
  { id: 'e-mpcb-bldg', source: 'mpcb', target: 'bldg', relationship: 'prerequisite', label: 'Prerequisite (External CTE)', condition: 'MPCB Consent to Establish (CTE) verified; reference provided', blocking: false },
  { id: 'e-bldg-fire', source: 'bldg', target: 'fire', relationship: 'conditional', label: 'Conditional Trigger', condition: 'Building / Planning reaches configured required state before Fire NOC activates', blocking: false },
  { id: 'e-bldg-water', source: 'bldg', target: 'water', relationship: 'parallel', label: 'Parallel Track', condition: 'Building / Planning approved; utility review proceeds in parallel per config', blocking: false },
  { id: 'e-fire-condnoc', source: 'fire', target: 'cond-noc', relationship: 'conditional', label: 'Conditional Gate', condition: 'Upstream configured dependencies and technical criteria satisfied', blocking: true },
  { id: 'e-water-condnoc', source: 'water', target: 'cond-noc', relationship: 'conditional', label: 'Utility Clearance', condition: 'Water connection clearance satisfies prerequisite gate', blocking: true },
  { id: 'e-bldg-construction', source: 'bldg', target: 'construction', relationship: 'downstream', label: 'Prerequisite Approval', condition: 'Building / Planning final approval required before construction milestone', blocking: true },
  { id: 'e-condnoc-construction', source: 'cond-noc', target: 'construction', relationship: 'prerequisite', label: 'Required for Milestone', condition: 'All provisional NOCs and utility clearances required before physical construction', blocking: true },
  { id: 'e-construction-preop', source: 'construction', target: 'preop', relationship: 'downstream', label: 'Downstream Milestone', condition: 'Physical construction completed; enables pre-operation and occupancy certificates', blocking: true },
];

interface CytoscapeDependencyGraphProps {
  nodes: DepNode[];
  edges?: DepEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  activeFilter?: 'all' | 'prerequisites' | 'parallel' | 'conditional' | 'downstream' | 'blocked';
  onSelectNode: (node: DepNode | null) => void;
  onSelectEdge: (edge: DepEdge | null) => void;
}

export function CytoscapeDependencyGraph({
  nodes,
  edges = M17_DEFAULT_EDGES,
  selectedNodeId,
  selectedEdgeId,
  activeFilter = 'all',
  onSelectNode,
  onSelectEdge,
}: CytoscapeDependencyGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const onSelectNodeRef = useRef(onSelectNode);
  const onSelectEdgeRef = useRef(onSelectEdge);

  useEffect(() => {
    onSelectNodeRef.current = onSelectNode;
  }, [onSelectNode]);

  useEffect(() => {
    onSelectEdgeRef.current = onSelectEdge;
  }, [onSelectEdge]);

  // Initialize Cytoscape once on client
  useEffect(() => {
    let isCancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    async function initCytoscape() {
      if (!containerRef.current || isCancelled) return;

      const cytoscapeModule = await import('cytoscape');
      const dagreModule = await import('cytoscape-dagre');
      const cyLib = cytoscapeModule.default || cytoscapeModule;
      const dagreExt = dagreModule.default || dagreModule;

      try {
        cyLib.use(dagreExt);
      } catch {
        // already registered
      }

      if (isCancelled || !containerRef.current) return;

      // Clean up any existing instance
      if (cyRef.current) {
        try {
          cyRef.current.destroy();
        } catch {
          // ignore
        }
      }

      // Convert nodes to Cytoscape elements with clear multi-line display labels
      const cyNodes = nodes.map(n => {
        let badge = '';
        if (n.status === 'completed') badge = 'DONE • Completed';
        else if (n.status === 'current') badge = 'CURRENT • Active Scrutiny';
        else if (n.status === 'ready') badge = 'READY • Parallel Track';
        else if (n.status === 'conditional') badge = 'CONDITIONAL • Waiting Prereq';
        else if (n.status === 'blocked') badge = 'BLOCKED • Gated';

        const deptTag = n.type === 'external' ? ` (${n.dept})` : '';

        return {
          data: {
            id: n.id,
            label: n.label,
            dept: n.dept,
            displayLabel: `${n.label}${deptTag}\n[${badge}]`,
            type: n.type,
            status: n.status,
            raw: n,
          },
          classes: `type-${n.type} status-${n.status} ${n.id === 'bldg' ? 'node-current' : ''}`,
        };
      });

      // Convert edges to Cytoscape elements
      const cyEdges = edges.map(e => ({
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          relationship: e.relationship,
          label: e.label,
          raw: e,
        },
        classes: `edge-${e.relationship}`,
      }));

      const cy = cyLib({
        container: containerRef.current,
        elements: [...cyNodes, ...cyEdges],
        boxSelectionEnabled: false,
        autounselectify: false,
        autoungrabify: true,
        desktopTapThreshold: 15,
        touchTapThreshold: 15,
        layout: {
          name: 'dagre',
          rankDir: 'TB',
          align: 'UL',
          nodeSep: 60,
          rankSep: 70,
          padding: 35,
        } as any,
        style: [
          // Global Nodes
          {
            selector: 'node',
            style: {
              label: 'data(displayLabel)',
              content: 'data(displayLabel)',
              color: '#1a2533',
              shape: 'round-rectangle',
              width: 220,
              height: 70,
              'border-width': 2,
              'font-family': 'system-ui, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
              'font-size': 11,
              'font-weight': 600,
              'min-zoomed-font-size': 0, // Never hide labels when zoomed out!
              'text-opacity': 1,
              'text-valign': 'center',
              'text-halign': 'center',
              'text-justification': 'center',
              'text-wrap': 'wrap',
              'text-max-width': '200px',
              'line-height': 1.3,
              'transition-property': 'opacity, border-width, border-color, background-color',
              'transition-duration': 180,
            },
          },
          // Node statuses: Done -> Current / Ready / Conditional -> Blocked
          {
            selector: 'node.status-completed',
            style: {
              'background-color': '#f0fdf4',
              'border-color': '#059669',
              'border-width': 2,
              color: '#064e3b',
            },
          },
          {
            selector: 'node.status-current, node.node-current',
            style: {
              'background-color': '#0f2540',
              'border-color': '#2563eb',
              'border-width': 3,
              color: '#ffffff',
            },
          },
          {
            selector: 'node.status-ready',
            style: {
              'background-color': '#eff6ff',
              'border-color': '#2563eb',
              'border-width': 2,
              color: '#1e3a8a',
            },
          },
          {
            selector: 'node.status-conditional',
            style: {
              'background-color': '#faf5ff',
              'border-color': '#9333ea',
              'border-width': 2,
              color: '#581c87',
            },
          },
          {
            selector: 'node.status-blocked',
            style: {
              'background-color': '#fef2f2',
              'border-color': '#dc2626',
              'border-width': 2,
              color: '#7f1d1d',
            },
          },
          // Node Types
          {
            selector: 'node.type-external',
            style: {
              'border-style': 'dashed',
            },
          },
          {
            selector: 'node.type-milestone',
            style: {
              'border-width': 3,
            },
          },
          // Selection halo
          {
            selector: 'node.selected-node',
            style: {
              'border-width': 4,
              'border-color': '#1a56db',
              'z-index': 100,
            },
          },
          // Global Edges
          {
            selector: 'edge',
            style: {
              width: 2,
              'curve-style': 'bezier',
              'target-arrow-shape': 'triangle',
              'arrow-scale': 1.15,
              label: 'data(label)',
              content: 'data(label)',
              'font-family': 'system-ui, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
              'font-size': 9,
              'font-weight': 600,
              'min-zoomed-font-size': 0, // Never hide edge labels!
              color: '#334155',
              'text-opacity': 1,
              'text-rotation': 'autorotate',
              'text-background-opacity': 0.95,
              'text-background-color': '#ffffff',
              'text-background-padding': '3px',
              'text-background-shape': 'roundrectangle',
              'text-border-color': '#cbd5e1',
              'text-border-width': 1,
              'text-border-opacity': 1,
              'transition-property': 'opacity, width, line-color, target-arrow-color',
              'transition-duration': 180,
            },
          },
          {
            selector: 'edge.edge-prerequisite',
            style: {
              'line-color': '#64748b',
              'target-arrow-color': '#64748b',
              'line-style': 'solid',
            },
          },
          {
            selector: 'edge.edge-conditional',
            style: {
              'line-color': '#7c3aed',
              'target-arrow-color': '#7c3aed',
              'line-style': 'dashed',
              'line-dash-pattern': [6, 4],
            },
          },
          {
            selector: 'edge.edge-parallel',
            style: {
              'line-color': '#2563eb',
              'target-arrow-color': '#2563eb',
              'line-style': 'dotted',
              'line-dash-pattern': [3, 3],
            },
          },
          {
            selector: 'edge.edge-downstream',
            style: {
              'line-color': '#475569',
              'target-arrow-color': '#475569',
              'line-style': 'solid',
            },
          },
          {
            selector: 'edge.selected-edge',
            style: {
              width: 3.5,
              'line-color': '#1a56db',
              'target-arrow-color': '#1a56db',
              'z-index': 100,
            },
          },
          // Highlighting & Dimming
          {
            selector: '.dimmed',
            style: {
              opacity: 0.2,
            },
          },
          {
            selector: '.highlighted',
            style: {
              opacity: 1,
            },
          },
        ],
      });

      // Node click handler: listen to tap, click, and select
      cy.on('tap click select', 'node', (evt: any) => {
        const node = evt.target;
        const id = typeof node.id === 'function' ? node.id() : node.data('id');
        const raw = (node.data('raw') as DepNode) || nodes.find(n => n.id === id);
        if (raw) {
          onSelectNodeRef.current?.(raw);
          onSelectEdgeRef.current?.(null);
        }
      });

      // Edge click handler: listen to tap, click, and select
      cy.on('tap click select', 'edge', (evt: any) => {
        const edge = evt.target;
        const id = typeof edge.id === 'function' ? edge.id() : edge.data('id');
        const raw = (edge.data('raw') as DepEdge) || edges.find(e => e.id === id);
        if (raw) {
          onSelectEdgeRef.current?.(raw);
          onSelectNodeRef.current?.(null);
        }
      });

      cyRef.current = cy;
      setIsReady(true);

      // Ensure proper canvas dimensioning and fit immediately after mount
      requestAnimationFrame(() => {
        if (!isCancelled && cy) {
          cy.resize();
          cy.fit(undefined, 35);
        }
      });

      if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          if (cyRef.current) {
            cyRef.current.resize();
          }
        });
        resizeObserver.observe(containerRef.current);
      }
    }

    initCytoscape();

    return () => {
      isCancelled = true;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (cyRef.current) {
        try {
          cyRef.current.destroy();
        } catch {
          // ignore
        }
        cyRef.current = null;
      }
    };
  }, [nodes, edges]);

  // Handle Selection & Highlighting
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy || !isReady) return;

    cy.elements().removeClass('selected-node selected-edge highlighted dimmed');

    if (selectedNodeId) {
      const node = cy.getElementById(selectedNodeId);
      if (node.length > 0) {
        node.addClass('selected-node');
        const connected = node.neighborhood().add(node);
        connected.addClass('highlighted');
        cy.elements().difference(connected).addClass('dimmed');
      }
    } else if (selectedEdgeId) {
      const edge = cy.getElementById(selectedEdgeId);
      if (edge.length > 0) {
        edge.addClass('selected-edge');
        const connected = edge.connectedNodes().add(edge);
        connected.addClass('highlighted');
        cy.elements().difference(connected).addClass('dimmed');
      }
    }
  }, [selectedNodeId, selectedEdgeId, isReady]);

  // Handle Relationship Filter
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy || !isReady) return;

    if (selectedNodeId || selectedEdgeId) return; // Do not override active item click

    cy.elements().removeClass('dimmed highlighted');

    if (activeFilter === 'all') {
      cy.elements().removeClass('dimmed');
      return;
    }

    if (activeFilter === 'prerequisites') {
      const prereqNodes = cy.nodes().filter((n: any) => {
        const raw = n.data('raw') as DepNode;
        return raw.id === 'land' || raw.id === 'mpcb' || raw.id === 'bldg';
      });
      const prereqEdges = cy.edges().filter((e: any) => e.data('relationship') === 'prerequisite');
      const activeGroup = prereqNodes.add(prereqEdges);
      activeGroup.addClass('highlighted');
      cy.elements().difference(activeGroup).addClass('dimmed');
    } else if (activeFilter === 'parallel') {
      const parallelNodes = cy.nodes().filter((n: any) => {
        const raw = n.data('raw') as DepNode;
        return raw.id === 'water' || raw.id === 'bldg';
      });
      const parallelEdges = cy.edges().filter((e: any) => e.data('relationship') === 'parallel');
      const activeGroup = parallelNodes.add(parallelEdges);
      activeGroup.addClass('highlighted');
      cy.elements().difference(activeGroup).addClass('dimmed');
    } else if (activeFilter === 'conditional') {
      const condNodes = cy.nodes().filter((n: any) => {
        const raw = n.data('raw') as DepNode;
        return raw.id === 'fire' || raw.id === 'cond-noc' || raw.id === 'bldg';
      });
      const condEdges = cy.edges().filter((e: any) => e.data('relationship') === 'conditional');
      const activeGroup = condNodes.add(condEdges);
      activeGroup.addClass('highlighted');
      cy.elements().difference(activeGroup).addClass('dimmed');
    } else if (activeFilter === 'downstream') {
      const downNodes = cy.nodes().filter((n: any) => {
        const raw = n.data('raw') as DepNode;
        return raw.id === 'bldg' || raw.id === 'construction' || raw.id === 'preop' || raw.id === 'fire' || raw.id === 'water' || raw.id === 'cond-noc';
      });
      const downEdges = cy.edges().filter((e: any) => e.data('source') === 'bldg' || e.data('source') === 'construction' || e.data('source') === 'cond-noc');
      const activeGroup = downNodes.add(downEdges);
      activeGroup.addClass('highlighted');
      cy.elements().difference(activeGroup).addClass('dimmed');
    } else if (activeFilter === 'blocked') {
      const blockedNodes = cy.nodes().filter((n: any) => {
        const raw = n.data('raw') as DepNode;
        return raw.status === 'blocked';
      });
      blockedNodes.addClass('highlighted');
      cy.elements().difference(blockedNodes).addClass('dimmed');
    }
  }, [activeFilter, selectedNodeId, selectedEdgeId, isReady]);

  // Controls
  const handleZoomIn = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({
      level: cy.zoom() * 1.25,
      renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({
      level: cy.zoom() * 0.8,
      renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
    });
  }, []);

  const handleFit = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.fit(undefined, 35);
  }, []);

  const handleResetLayout = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.elements().removeClass('selected-node selected-edge highlighted dimmed');
    onSelectNode(nodes.find(n => n.id === 'bldg') ?? null);
    onSelectEdge(null);
    cy.layout({
      name: 'dagre',
      rankDir: 'TB',
      align: 'UL',
      nodeSep: 60,
      rankSep: 70,
      padding: 35,
      animate: true,
      animationDuration: 300,
    } as any).run();
    cy.fit(undefined, 35);
  }, [nodes, onSelectNode, onSelectEdge]);

  return (
    <div className="relative flex-1 w-full h-full min-h-[500px] bg-[#f8f9fb] overflow-hidden select-none">
      {/* Cytoscape canvas mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 rounded border border-[#d1d9e0] bg-white p-1 shadow-sm">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom In"
          className="flex h-7 w-7 items-center justify-center rounded text-xs font-bold text-[#1a2533] hover:bg-[#ebf3ff] hover:text-[#1a56db]"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom Out"
          className="flex h-7 w-7 items-center justify-center rounded text-xs font-bold text-[#1a2533] hover:bg-[#ebf3ff] hover:text-[#1a56db]"
        >
          −
        </button>
        <div className="h-4 w-px bg-[#d1d9e0]" />
        <button
          onClick={handleFit}
          title="Fit to Screen"
          className="px-2.5 py-1 text-[11px] font-semibold text-[#1a2533] hover:bg-[#ebf3ff] hover:text-[#1a56db] rounded"
        >
          Fit
        </button>
        <button
          onClick={handleResetLayout}
          title="Reset Layout & Selection"
          className="px-2.5 py-1 text-[11px] font-semibold text-[#1a2533] hover:bg-[#ebf3ff] hover:text-[#1a56db] rounded"
        >
          Reset
        </button>
      </div>

      {/* Canvas Status & Legend Footer */}
      <div className="absolute bottom-4 left-4 z-10 hidden md:flex items-center gap-4 rounded border border-[#d1d9e0] bg-white/95 px-3 py-1.5 text-[10px] text-[#4b5563] shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#10b981]" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#1a3a5c]" />
          <span>Current MIDC</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#2563eb]" />
          <span>Ready</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#7c3aed]" />
          <span>Conditional</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#dc2626]" />
          <span>Blocked</span>
        </div>
        <div className="h-3 w-px bg-[#d1d9e0]" />
        <span className="italic">Dashed = External Dept · Solid = MIDC Controlled</span>
      </div>
    </div>
  );
}
