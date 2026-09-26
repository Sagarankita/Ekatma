'use client';

import React from 'react';
import Link from 'next/link';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { ApprovalNode } from './components/ApprovalNode';
import { StageSwimlanes } from './components/StageSwimlanes';
import { ApprovalSidebar } from './components/ApprovalSidebar';
import { useDependencyGraph } from './hooks/useDependencyGraph';
import { Target, ArrowRight } from 'lucide-react';

const nodeTypes = {
  approval: ApprovalNode,
};

export function DependencyScreen({ project }: { project: BusinessProject }) {
  const {
    nodes,
    edges,
    selectedNodeId,
    selectedNode,
    nextRecommendedNode,
    allNodes,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
    setSelectedNodeId,
    completeSubFormStep,
    metrics,
  } = useDependencyGraph(project.id);

  return (
    <main id="main-content" className="flex-1 bg-slate-50 min-h-screen pb-12 font-sans" tabIndex={-1}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-5">
        {/* Breadcrumb Navigation */}
        <div className="mb-3 flex items-center justify-between">
          <nav className="text-xs text-slate-500 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-blue-700 hover:underline">
              My Businesses
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-blue-700 hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="hover:text-blue-700 hover:underline">
              Regulatory Journey
            </Link>
            <span>›</span>
            <span className="text-slate-900 font-semibold">Dependency Map (DAG)</span>
          </nav>

          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="text-xs border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 font-medium transition-colors"
          >
            ← Back to List View
          </Link>
        </div>

        {/* Header Banner */}
        <div className="mb-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-slate-400 font-medium">E13 — Industrial Approval Journey</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Regulatory Dependency Map</h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Automatic hierarchical layout calculation. Locked approvals automatically unlock when prerequisite sub-forms are submitted.
            </p>
          </div>
        </div>

        {/* Sticky Next Recommended Action Bar */}
        {nextRecommendedNode && (
          <div className="mb-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-3.5 rounded-xl shadow-md border border-blue-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-2 z-20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded border border-blue-400/30">
                    Next Recommended Action
                  </span>
                  <span className="text-xs font-mono text-blue-300">{nextRecommendedNode.department}</span>
                </div>
                <p className="text-sm font-bold text-white mt-0.5">
                  {nextRecommendedNode.title}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedNodeId(nextRecommendedNode.id)}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Focus Requirement & Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 6-Metric Top Summary Bar */}
        <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Requirements</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-slate-900">{metrics.total}</span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">100%</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-emerald-700">{metrics.completed}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                {Math.round((metrics.completed / metrics.total) * 100)}%
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-blue-200 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> In Progress
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-blue-700">{metrics.inProgress}</span>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">Active</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Ready / Unlocked
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-amber-900">{metrics.ready}</span>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">Ready</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-300 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400" /> Blocked (Locked)
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-slate-700">{metrics.blocked}</span>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">Locked</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-purple-200 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" /> Conditional / N/A
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-purple-800">{metrics.conditional}</span>
              <span className="text-xs font-bold text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded">Evaluated</span>
            </div>
          </div>
        </div>

        {/* Swimlanes Header Banner */}
        <StageSwimlanes />

        {/* Split Screen Container: Left React Flow Canvas, Right Approval Sidebar */}
        <div className="mt-4 flex flex-col lg:flex-row gap-5 items-start">
          {/* React Flow Canvas */}
          <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm h-[720px] relative overflow-hidden">
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
              minZoom={0.6}
              maxZoom={1.2}
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
                  if (status === 'in-progress') return '#3b82f6';
                  if (status === 'ready') return '#f59e0b';
                  return '#cbd5e1';
                }}
              />
            </ReactFlow>
          </div>

          {/* Right Sidebar Panel */}
          {selectedNode && (
            <ApprovalSidebar
              selectedNode={selectedNode}
              allNodes={allNodes}
              onClose={() => setSelectedNodeId(null)}
              onCompleteSubFormStep={completeSubFormStep}
              projectId={project.id}
            />
          )}
        </div>
      </div>
    </main>
  );
}
