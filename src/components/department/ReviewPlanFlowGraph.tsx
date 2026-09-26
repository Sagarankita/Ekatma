'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface ReviewFlowNodeData {
  id: string;
  label: string;
  subLabel?: string;
  status: 'completed' | 'current' | 'upcoming' | 'attention' | 'pending' | 'na';
  desk?: string;
  whyActive?: string;
  findings?: string;
  actionText?: string;
  onAction?: () => void;
  isParallel?: boolean;
}

export interface ReviewFlowEdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  isParallel?: boolean;
}

interface ReviewPlanFlowGraphProps {
  nodes: ReviewFlowNodeData[];
  edges: ReviewFlowEdgeData[];
  selectedNodeId?: string;
  onSelectNode?: (node: ReviewFlowNodeData | null) => void;
  height?: number;
}

export function ReviewPlanFlowGraph({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  height = 700,
}: ReviewPlanFlowGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<any>(null);
  const [layoutDir, setLayoutDir] = useState<'TB' | 'LR'>('TB');
  const [activeNode, setActiveNode] = useState<ReviewFlowNodeData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSelectNode = useCallback(
    (node: ReviewFlowNodeData | null) => {
      setActiveNode(node);
      onSelectNode?.(node);
    },
    [onSelectNode]
  );

  const handleZoomIn = () => {
    if (cyRef.current) {
      const cur = cyRef.current.zoom();
      cyRef.current.zoom({
        level: cur * 1.2,
        renderedPosition: {
          x: cyRef.current.width() / 2,
          y: cyRef.current.height() / 2,
        },
      });
    }
  };

  const handleZoomOut = () => {
    if (cyRef.current) {
      const cur = cyRef.current.zoom();
      cyRef.current.zoom({
        level: cur * 0.8,
        renderedPosition: {
          x: cyRef.current.width() / 2,
          y: cyRef.current.height() / 2,
        },
      });
    }
  };

  useEffect(() => {
    let isCancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    async function initGraph() {
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

      if (cyRef.current) {
        try {
          cyRef.current.destroy();
        } catch {
          // ignore
        }
      }

      const cyNodes = nodes.map((n) => {
        let statusBadge = '';
        if (n.status === 'completed') statusBadge = '✓ COMPLETED';
        else if (n.status === 'current') statusBadge = '● ACTIVE IN SCRUTINY';
        else if (n.status === 'attention') statusBadge = '⚠ ACTION REQUIRED';
        else if (n.status === 'pending') statusBadge = '⏳ PREREQUISITE PENDING';
        else if (n.status === 'na') statusBadge = 'N/A NOT REQUIRED';
        else statusBadge = '○ UPCOMING STAGE';

        const lines = [n.label];
        if (n.subLabel) lines.push(n.subLabel);
        lines.push(statusBadge);

        return {
          data: {
            id: n.id,
            label: n.label,
            displayLabel: lines.join('\n'),
            status: n.status,
            raw: n,
          },
          classes: `status-${n.status} ${n.id === selectedNodeId ? 'selected-node' : ''}`,
        };
      });

      const cyEdges = edges.map((e) => ({
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label || '',
          isParallel: e.isParallel || false,
        },
        classes: e.isParallel ? 'edge-parallel' : '',
      }));

      const cy = cyLib({
        container: containerRef.current,
        elements: [...cyNodes, ...cyEdges],
        boxSelectionEnabled: false,
        autounselectify: false,
        autoungrabify: true,
        userZoomingEnabled: true,
        userPanningEnabled: true,
        zoomingEnabled: true,
        panningEnabled: true,
        style: [
          {
            selector: 'node',
            style: {
              label: 'data(displayLabel)',
              color: '#0f172a',
              shape: 'round-rectangle',
              width: 280,
              height: 92,
              'border-width': 2.5,
              'font-family': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              'font-size': 13,
              'font-weight': 700,
              'text-valign': 'center',
              'text-halign': 'center',
              'text-wrap': 'wrap',
              'text-max-width': '250px',
              'line-height': 1.38,
              'transition-property': 'background-color, border-color, border-width',
              'transition-duration': 150,
            },
          },
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
            selector: 'node.status-current',
            style: {
              'background-color': '#0f2540',
              'border-color': '#2563eb',
              'border-width': 3,
              color: '#ffffff',
            },
          },
          {
            selector: 'node.status-attention',
            style: {
              'background-color': '#fffbeb',
              'border-color': '#d97706',
              'border-width': 2.5,
              color: '#92400e',
            },
          },
          {
            selector: 'node.status-pending',
            style: {
              'background-color': '#faf5ff',
              'border-color': '#9333ea',
              'border-width': 2,
              color: '#581c87',
            },
          },
          {
            selector: 'node.status-upcoming',
            style: {
              'background-color': '#f8fafc',
              'border-color': '#cbd5e1',
              'border-width': 1.5,
              color: '#475569',
            },
          },
          {
            selector: 'node.status-na',
            style: {
              'background-color': '#f1f5f9',
              'border-color': '#e2e8f0',
              'border-style': 'dashed',
              'border-width': 1,
              color: '#94a3b8',
            },
          },
          {
            selector: 'node.selected-node',
            style: {
              'border-width': 4,
              'border-color': '#1a56db',
            },
          },
          {
            selector: 'edge',
            style: {
              width: 2.5,
              'line-color': '#94a3b8',
              'target-arrow-color': '#94a3b8',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              'arrow-scale': 1.15,
            },
          },
          {
            selector: 'edge[label]',
            style: {
              label: 'data(label)',
              'font-size': 11,
              'font-weight': 700,
              color: '#1e40af',
              'text-background-color': '#eff6ff',
              'text-background-opacity': 0.98,
              'text-background-padding': '4px',
              'text-background-shape': 'roundrectangle',
              'text-border-color': '#93c5fd',
              'text-border-width': 1.5,
              'text-border-opacity': 1,
            },
          },
          {
            selector: 'edge.edge-parallel',
            style: {
              width: 3,
              'line-color': '#2563eb',
              'target-arrow-color': '#2563eb',
              'line-style': 'dashed',
            },
          },
        ],
        layout: {
          name: 'dagre',
          rankDir: layoutDir,
          nodeSep: 40,
          rankSep: 64,
          padding: 30,
        } as any,
      });

      cy.on('tap', 'node', (evt: any) => {
        const raw = evt.target.data('raw') as ReviewFlowNodeData;
        cy.nodes().removeClass('selected-node');
        evt.target.addClass('selected-node');
        handleSelectNode(raw);
      });

      cy.on('tap', (evt: any) => {
        if (evt.target === cy) {
          cy.nodes().removeClass('selected-node');
          handleSelectNode(null);
        }
      });

      cyRef.current = cy;
      setIsLoaded(true);

      if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          if (cyRef.current) {
            cyRef.current.resize();
            cyRef.current.fit(undefined, 35);
          }
        });
        resizeObserver.observe(containerRef.current);
      }

      setTimeout(() => {
        if (cyRef.current) {
          cyRef.current.fit(undefined, 35);
        }
      }, 100);
    }

    initGraph();

    return () => {
      isCancelled = true;
      if (resizeObserver) resizeObserver.disconnect();
      if (cyRef.current) {
        try {
          cyRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [nodes, edges, layoutDir, selectedNodeId, handleSelectNode]);

  const fitGraph = () => {
    if (cyRef.current) {
      cyRef.current.fit(undefined, 35);
    }
  };

  return (
    <div className="bg-white border border-[#d1d9e0] rounded-xl overflow-hidden shadow-xs">
      {/* Graph Toolbar */}
      <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-[#1a2533]">Interactive Review Flow</span>
          <p className="text-[11px] text-[#64748b]">Click any node to inspect desk assignment, findings, and actions.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-[#cbd5e1] p-0.5 bg-white text-[11px]">
            <button
              type="button"
              onClick={() => setLayoutDir('TB')}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                layoutDir === 'TB' ? 'bg-[#1a3a5c] text-white' : 'text-[#475569] hover:bg-slate-50'
              }`}
            >
              Top-Down ↓
            </button>
            <button
              type="button"
              onClick={() => setLayoutDir('LR')}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                layoutDir === 'LR' ? 'bg-[#1a3a5c] text-white' : 'text-[#475569] hover:bg-slate-50'
              }`}
            >
              Left-Right →
            </button>
          </div>

          <div className="inline-flex rounded-md border border-[#cbd5e1] p-0.5 bg-white text-[11px]">
            <button
              type="button"
              onClick={handleZoomIn}
              className="px-2 py-0.5 text-xs font-bold text-[#1a3a5c] hover:bg-slate-50 rounded"
              title="Zoom In"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="px-2 py-0.5 text-xs font-bold text-[#1a3a5c] hover:bg-slate-50 rounded"
              title="Zoom Out"
            >
              -
            </button>
          </div>

          <button
            type="button"
            onClick={fitGraph}
            className="px-2.5 py-1 text-[11px] font-semibold text-[#1a3a5c] bg-white border border-[#cbd5e1] hover:bg-slate-50 rounded"
          >
            Fit Canvas
          </button>
        </div>
      </div>

      {/* Parallel Processing Active Banner */}
      <div className="px-4 py-2.5 bg-blue-50/90 border-b border-blue-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#1a3a5c]">
          <span className="text-sm">⚡</span>
          <span className="font-bold">Parallel Review Processing Active:</span>
          <span className="text-slate-700">
            From the Review Plan stage, Land / Plot, Building / Planning, and Water / Utility workstreams process concurrently across separate officer desks.
          </span>
        </div>
        <span className="text-[10px] font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200 shrink-0">
          Independent Desks
        </span>
      </div>

      {/* Graph Legend */}
      <div className="px-4 py-2 bg-slate-50/70 border-b border-[#e2e8f0] flex flex-wrap items-center gap-4 text-[10px] text-[#475569]">
        <span className="font-semibold uppercase tracking-wider text-slate-500">Legend:</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Completed</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0f2540] inline-block" /> Current / Active</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Attention / Action</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" /> Pending Prerequisite</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" /> Upcoming</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border border-dashed border-slate-400 inline-block" /> Not Applicable</span>
      </div>

      {/* Graph Canvas */}
      <div className="relative">
        <div ref={containerRef} style={{ height: `${height}px` }} className="w-full bg-[#fcfdfd]" />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="text-xs text-slate-500 animate-pulse">Rendering review flow...</span>
          </div>
        )}
      </div>

      {/* Selected Node Drawer / Inspector */}
      {activeNode && (
        <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1a2533]">{activeNode.label}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    activeNode.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : activeNode.status === 'current'
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : activeNode.status === 'attention'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : activeNode.status === 'pending'
                      ? 'bg-purple-50 text-purple-800 border-purple-300'
                      : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {activeNode.status === 'completed'
                    ? 'Completed'
                    : activeNode.status === 'current'
                    ? 'Current'
                    : activeNode.status === 'attention'
                    ? 'Attention Required'
                    : activeNode.status === 'pending'
                    ? 'Pending External'
                    : activeNode.status === 'na'
                    ? 'Not Applicable'
                    : 'Upcoming'}
                </span>
                {activeNode.isParallel && (
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                    <span>⚡</span> Parallel Review Stream (Independent Desk)
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Assigned Desk:</span>
                  <span className="text-slate-800 font-medium">{activeNode.desk || 'Not Assigned'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Why Active:</span>
                  <span className="text-slate-800 font-medium">{activeNode.whyActive || 'Configured service requirement'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Findings:</span>
                  <span className="text-slate-800 font-medium">{activeNode.findings || 'No automated exceptions'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeNode.onAction && (
                <button
                  type="button"
                  onClick={activeNode.onAction}
                  className="px-4 py-2 bg-[#1a3a5c] hover:bg-[#0f2540] text-white text-xs font-bold rounded transition-colors shadow-xs"
                >
                  {activeNode.actionText || 'Open Review →'}
                </button>
              )}
              <button
                type="button"
                onClick={() => handleSelectNode(null)}
                className="px-2.5 py-2 text-xs text-slate-500 hover:text-slate-800 rounded font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
