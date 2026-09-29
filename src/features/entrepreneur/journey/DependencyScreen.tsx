'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  ReactFlow,
  MiniMap,
  Background,
  BackgroundVariant,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ENTREPRENEUR_ROUTES } from '@/lib/routes/entrepreneur';
import type { BusinessProject } from '../businesses/catalog';
import { ApprovalNode } from './components/ApprovalNode';
import { StageSwimlanes } from './components/StageSwimlanes';
import { ApprovalSidebar } from './components/ApprovalSidebar';
import { useDependencyGraph } from './hooks/useDependencyGraph';
import { ZoomIn, ZoomOut, Maximize2, Info, ArrowLeft } from 'lucide-react';

const nodeTypes = {
  approval: ApprovalNode,
};

// Automatic initial fit to screen
function AutoFitView() {
  const { fitView } = useReactFlow();

  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ padding: 0.12, duration: 400 });
    }, 120);
    return () => clearTimeout(timer);
  }, [fitView]);

  return null;
}

// Clear floating zoom and reset controls
function GraphControlsBar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md rounded-xl p-1.5 flex items-center gap-1 text-slate-700 text-xs">
      <button
        type="button"
        onClick={() => zoomIn({ duration: 250 })}
        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1 font-semibold text-xs text-slate-700 hover:text-slate-900"
        title="Zoom In (+)"
        aria-label="Zoom in"
      >
        <ZoomIn className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => zoomOut({ duration: 250 })}
        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1 font-semibold text-xs text-slate-700 hover:text-slate-900"
        title="Zoom Out (-)"
        aria-label="Zoom out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-slate-200 mx-0.5" />

      <button
        type="button"
        onClick={() => fitView({ padding: 0.12, duration: 400 })}
        className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5 font-semibold text-xs text-slate-800"
        title="Fit graph to screen"
        aria-label="Fit view"
      >
        <Maximize2 className="w-3.5 h-3.5 text-slate-700" />
        <span>Fit View</span>
      </button>
    </div>
  );
}

export function DependencyScreen({ project }: { project: BusinessProject }) {
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
    completeSubFormStep,
    metrics,
  } = useDependencyGraph(project.id);

  return (
    <main id="main-content" className="flex-1 bg-[#F9FAF2] min-h-screen pb-16 font-sans" tabIndex={-1}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
          <nav className="text-xs text-[#555C56] flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href={ENTREPRENEUR_ROUTES.businesses()} className="hover:text-[#355E3B] hover:underline">
              My Businesses
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.business(project.id)} className="hover:text-[#355E3B] hover:underline">
              {project.name}
            </Link>
            <span>›</span>
            <Link href={ENTREPRENEUR_ROUTES.journey(project.id)} className="hover:text-[#355E3B] hover:underline">
              Regulatory Journey
            </Link>
            <span>›</span>
            <span className="text-[#355E3B] font-bold">Dependency Graph</span>
          </nav>

          {/* Primary back link to the simpler journey */}
          <Link
            href={ENTREPRENEUR_ROUTES.journey(project.id)}
            className="text-xs border border-slate-300 bg-white text-[#355E3B] px-3.5 py-1.5 rounded-lg hover:bg-slate-50 font-bold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Step-by-Step Journey</span>
          </Link>
        </div>

        {/* Power-User Context Banner */}
        <div className="mb-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#355E3B] bg-[#355E3B]/8 border border-[#355E3B]/15 px-2 py-0.5 rounded">
                Power-User Relationship View
              </span>
            </div>
            <h1 className="text-xl font-bold text-[#355E3B]">Regulatory Dependency Map</h1>
            <p className="text-xs sm:text-sm text-[#555C56] mt-1 max-w-2xl leading-relaxed">
              Detailed statutory relationship map showing sequential prerequisites, parallel approvals, and downstream unlocks.
              Click any requirement to highlight its direct dependencies and view its details.
            </p>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2 max-w-sm">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-snug text-[11px]">
              <span className="font-bold">Normal Journey Available:</span> Entrepreneurs can follow the simpler step-by-step
              checklist in Regulatory Journey. This graph provides deep prerequisite analysis.
            </p>
          </div>
        </div>

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
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Ready to Apply
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-amber-900">{metrics.ready}</span>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">Unlocked</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-300 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400" /> Pending Prerequisite
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-slate-700">{metrics.blocked}</span>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">Waiting</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-purple-200 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" /> Conditional
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-purple-800">{metrics.conditional}</span>
              <span className="text-xs font-bold text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded">Rule Gate</span>
            </div>
          </div>
        </div>

        {/* Stage Milestones Swimlane Header */}
        <StageSwimlanes />

        {/* Split Screen Container: Left Graph Canvas, Right Detail Panel */}
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
              onPaneClick={() => setSelectedNodeId(null)}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={true}
              fitView
              minZoom={0.4}
              maxZoom={1.5}
              defaultEdgeOptions={{
                type: 'smoothstep',
              }}
            >
              {/* Background grid */}
              <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#c8d4c7" />

              {/* Automatic initial fit-to-screen */}
              <AutoFitView />

              {/* Floating Zoom & Fit Controls */}
              <GraphControlsBar />

              {/* MiniMap */}
              <MiniMap
                className="!bg-white !border-slate-200 !shadow-md !rounded-xl !bottom-4 !right-4"
                zoomable={false}
                pannable={false}
                nodeColor={n => {
                  const status = (n.data as any)?.status;
                  if (status === 'completed') return '#10b981';
                  if (status === 'in-progress') return '#6DAE7C';
                  if (status === 'ready') return '#D4A017';
                  if (status === 'conditional') return '#8b5cf6';
                  return '#9ab098';
                }}
              />

              {/* Dependency Direction Legend */}
              <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 shadow-sm rounded-xl p-2.5 flex items-center gap-4 text-[11px] text-slate-600 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 bg-slate-600 inline-block" />
                  <span className="font-semibold text-slate-800">──▶ Sequential Prerequisite</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 border-t-2 border-dashed border-purple-500 inline-block" />
                  <span className="font-semibold text-slate-800">- -▶ Conditional</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span>Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                  <span>Pending Prerequisite</span>
                </div>
              </div>
            </ReactFlow>
          </div>

          {/* Right Focused Detail Panel */}
          {selectedNode && (
            <ApprovalSidebar
              selectedNode={selectedNode}
              allNodes={allNodes}
              onClose={() => setSelectedNodeId(null)}
              onSelectNode={setSelectedNodeId}
              onCompleteSubFormStep={completeSubFormStep}
              projectId={project.id}
            />
          )}
        </div>
      </div>
    </main>
  );
}
