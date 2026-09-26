'use client';

import React from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { GovApprovalNode } from './components/GovApprovalNode';
import { GovApprovalSidebar } from './components/GovApprovalSidebar';
import { useGovDependencyGraph } from './hooks/useGovDependencyGraph';
import { ShieldCheck, Info, Filter, Building2, ArrowLeft } from 'lucide-react';

const nodeTypes = {
  govApproval: GovApprovalNode,
};

export function GovDependencyScreen({
  onBack,
  onBackToOverview,
}: {
  onBack: () => void;
  onBackToOverview: () => void;
}) {
  const {
    nodes,
    edges,
    selectedNodeId,
    selectedNode,
    allNodes,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
    setSelectedNodeId,
    relationshipFilter,
    setRelationshipFilter,
    approveNode,
    metrics,
  } = useGovDependencyGraph();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 font-sans min-h-screen">
      {/* Header Bar */}
      <div className="bg-white border-b border-slate-200 px-5 py-3.5 shrink-0 shadow-2xs">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-slate-900 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1">
                <Building2 className="w-3 h-3 text-blue-400" />
                Government Scrutiny Console
              </span>
              <span className="text-xs text-slate-500 font-mono">MIDC-APP-2026-00418</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Regulatory Dependency View</h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Configured regulatory journey and multi-department scrutiny flow for Aster Precision Components Pvt. Ltd.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="text-xs border border-slate-300 text-slate-700 px-3.5 py-2 rounded-lg hover:bg-slate-100 font-semibold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Scrutiny</span>
          </button>
        </div>

        {/* Governance Application Key-Value Strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 mt-3 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-500 font-medium">Applicant: </span>
            <span className="font-bold text-slate-900">Aster Precision Components Pvt. Ltd.</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Current Service: </span>
            <span className="font-bold text-slate-900">Building / Planning Approval</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Workflow Stage: </span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
              TECHNICAL_SCRUTINY
            </span>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Fee Payment: </span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
              PAID (Verified)
            </span>
          </div>
          <div>
            <span className="text-slate-500 font-medium">SLA Clock: </span>
            <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
              14 Days Remaining
            </span>
          </div>
        </div>
      </div>

      {/* 6-Metric Dependency Bar */}
      <div className="bg-slate-900 px-5 py-2.5 flex items-center gap-6 shrink-0 text-xs text-white flex-wrap shadow-xs">
        <span className="text-blue-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          Scrutiny Topology Summary
        </span>
        <div className="flex items-center gap-4 text-xs">
          <span><span className="text-slate-400">Prerequisites:</span> <strong className="text-white">{metrics.prerequisites}</strong></span>
          <span><span className="text-slate-400">Current Desk:</span> <strong className="text-blue-300">{metrics.current}</strong></span>
          <span><span className="text-slate-400">Parallel Eligible:</span> <strong className="text-white">{metrics.parallel}</strong></span>
          <span><span className="text-slate-400">Conditional:</span> <strong className="text-amber-300">{metrics.conditional}</strong></span>
          <span><span className="text-slate-400">Downstream:</span> <strong className="text-emerald-300">{metrics.downstream}</strong></span>
          <span><span className="text-slate-400">Blocked:</span> <strong className="text-slate-300">{metrics.blocked}</strong></span>
        </div>
      </div>

      {/* Dependency Boundary Notice */}
      <div className="bg-amber-50/90 border-b border-amber-200/80 px-5 py-2.5 shrink-0 flex items-center justify-between gap-4 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
            Dependency Boundary
          </span>
          <p className="text-amber-800 leading-snug">
            MIDC tracks configured dependencies across departments. External department records (MPCB, Fire, DISH) are visible for context only.
          </p>
        </div>
        <Info className="w-4 h-4 text-amber-700 shrink-0" />
      </div>

      {/* Main Body Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left React Flow Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white border-r border-slate-200">
          {/* Relationship Filter Bar */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-slate-500" /> Filter View:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {(['all', 'prerequisites', 'parallel', 'conditional', 'downstream', 'blocked'] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setRelationshipFilter(f);
                      if (f !== 'all') {
                        setSelectedNodeId(null);
                      }
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all ${
                      relationshipFilter === f
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {f === 'all' ? 'All Dependencies' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quick Select:</span>
              {allNodes.map(n => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelectedNodeId(n.id)}
                  className={`px-2 py-0.5 text-[11px] rounded border font-semibold transition-all ${
                    selectedNodeId === n.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {n.label.split(' ')[0]} ({n.dept})
                </button>
              ))}
            </div>
          </div>

          {/* React Flow Canvas */}
          <div className="flex-1 w-full h-full relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={true}
              fitView
              minZoom={0.5}
              maxZoom={1.3}
              defaultEdgeOptions={{
                type: 'smoothstep',
              }}
            >
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
              <Controls className="!bg-white !border-slate-200 !shadow-md !rounded-xl" />
              <MiniMap
                className="!bg-white !border-slate-200 !shadow-md !rounded-xl"
                zoomable={false}
                pannable={false}
                nodeColor={n => {
                  const status = (n.data as any)?.status;
                  if (status === 'completed') return '#10b981';
                  if (status === 'current') return '#0f172a';
                  if (status === 'ready') return '#3b82f6';
                  if (status === 'conditional') return '#f59e0b';
                  return '#cbd5e1';
                }}
              />
            </ReactFlow>
          </div>
        </div>

        {/* Right Officer Scrutiny Sidebar Panel */}
        {selectedNode && (
          <GovApprovalSidebar
            selectedNode={selectedNode}
            allNodes={allNodes}
            onClose={() => setSelectedNodeId(null)}
            onApproveNode={approveNode}
            onBackToScrutiny={onBack}
          />
        )}
      </div>
    </div>
  );
}
