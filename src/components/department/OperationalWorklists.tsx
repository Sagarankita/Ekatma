'use client';

import { APPLICATION_CONTEXTS, applicationStateLabel } from '@/data/fixtures/application-contexts';
import { useApplicationWorkspace } from '@/components/application/ApplicationWorkspace';

const applications = Object.values(APPLICATION_CONTEXTS);

function Worklist({ title, description, rows, onOpen }: { title: string; description: string; rows: typeof applications; onOpen: (id: string) => void }) {
  return (
    <section className="bg-[#F8F9FA] p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#17365D]">{title}</h1>
        <p className="mt-1 text-xs text-[#5C6470]">{description}</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full min-w-[760px] text-left text-[13px]">
          <thead className="bg-[#F8F9FA] text-[#17365D] border-b border-slate-200">
            <tr>
              {['Application', 'Business', 'Service', 'State', 'Current desk', 'SLA', 'Action'].map(h => (
                <th key={h} className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(a => (
              <tr key={a.id} className="hover:bg-[#F0F5FA] transition-colors">
                <td className="px-4 py-3.5 font-mono font-bold text-[#245B8A]">{a.id}</td>
                <td className="px-4 py-3.5 font-semibold text-[#20242A]">{a.business}</td>
                <td className="px-4 py-3.5 text-[#20242A]">{a.service}</td>
                <td className="px-4 py-3.5 text-[#20242A]">{applicationStateLabel(a.state)}</td>
                <td className="px-4 py-3.5 text-[#5C6470]">{a.desk}</td>
                <td className="px-4 py-3.5 text-[#5C6470]">{a.sla}</td>
                <td className="px-4 py-3.5">
                  <button onClick={() => onOpen(a.id)} className="rounded-lg bg-[#17365D] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#245B8A] transition-colors shadow-xs">
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-6 text-xs text-[#5C6470]">No records in this worklist.</p>}
      </div>
    </section>
  );
}

export function QueryWorklist({ onOpen, onOpenBuilder }: { onOpen: (id: string) => void; onOpenBuilder?: (id: string) => void }) {
  const rows = applications.filter(a => a.queryVersion || ['QUERY_RAISED', 'RESUBMITTED', 'CORRECTION_REQUIRED'].includes(a.state));
  return (
    <section className="bg-[#F8F9FA] p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#17365D]">Query & Deficiency Worklist</h1>
        <p className="mt-1 text-xs text-[#5C6470]">Department-wide query and deficiency tracking. Open Query History (M19) to view responses or Query Builder (M18) to draft new queries.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full min-w-[760px] text-left text-[13px]">
          <thead className="bg-[#F8F9FA] text-[#17365D] border-b border-slate-200">
            <tr>
              {['Application', 'Business', 'Service', 'State', 'Query Reference', 'Desk', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(a => (
              <tr key={a.id} className="hover:bg-[#F0F5FA] transition-colors">
                <td className="px-4 py-3.5 font-mono font-bold text-[#245B8A]">{a.id}</td>
                <td className="px-4 py-3.5 font-semibold text-[#20242A]">{a.business}</td>
                <td className="px-4 py-3.5 text-[#20242A]">{a.service}</td>
                <td className="px-4 py-3.5 text-[#20242A]">{applicationStateLabel(a.state)}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-[#5C6470]">{a.queryVersion ?? 'Pending Draft'}</td>
                <td className="px-4 py-3.5 text-[#5C6470]">{a.desk}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onOpen(a.id)} className="rounded-lg bg-[#17365D] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#245B8A] transition-colors shadow-xs">
                      {a.queryVersion ? 'View History (M19)' : 'Open (M19)'}
                    </button>
                    {onOpenBuilder && (
                      <button onClick={() => onOpenBuilder(a.id)} className="rounded-lg border border-[#245B8A] bg-white px-3 py-1.5 text-xs font-semibold text-[#245B8A] hover:bg-[#F0F5FA] transition-colors shadow-xs">
                        Draft (M18)
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-6 text-xs text-[#5C6470]">No records in this worklist.</p>}
      </div>
    </section>
  );
}

export function ScrutinyWorklist({ onOpen, onOpenQueries }: { onOpen: (id: string) => void; onOpenQueries: (id: string) => void }) {
  const rows = applications.filter(a => ['DOCUMENT_SCRUTINY', 'INITIAL_SCRUTINY', 'TECHNICAL_SCRUTINY', 'RESUBMITTED'].includes(a.state));
  return (
    <section className="bg-[#F8F9FA] p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#17365D]">Scrutiny Worklist</h1>
        <p className="mt-1 text-xs text-[#5C6470]">Open an application’s Scrutiny tab. Query drafting and response review are owned by the Queries tab.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full min-w-[760px] text-left text-[13px]">
          <thead className="bg-[#F8F9FA] text-[#17365D] border-b border-slate-200">
            <tr>
              {['Application', 'Business', 'Service', 'State', 'Unresolved queries', 'Action'].map(h => (
                <th key={h} className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(a => (
              <tr key={a.id} className="hover:bg-[#F0F5FA] transition-colors">
                <td className="px-4 py-3.5 font-mono font-bold text-[#245B8A]">{a.id}</td>
                <td className="px-4 py-3.5 font-semibold text-[#20242A]">{a.business}</td>
                <td className="px-4 py-3.5 text-[#20242A]">{a.service}</td>
                <td className="px-4 py-3.5 text-[#20242A]">{applicationStateLabel(a.state)}</td>
                <td className="px-4 py-3.5">
                  {a.queryVersion ? (
                    <button onClick={() => onOpenQueries(a.id)} className="font-semibold text-[#245B8A] hover:underline">
                      1 · Open Queries
                    </button>
                  ) : '0'}
                </td>
                <td className="px-4 py-3.5">
                  <button onClick={() => onOpen(a.id)} className="rounded-lg bg-[#17365D] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#245B8A] transition-colors shadow-xs">
                    Open Scrutiny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function DecisionQueue({ onOpen }: { onOpen: (id: string) => void }) {
  return <Worklist title="Decision Queue" description="Applications ready for decision review. Conditions and dependency updates remain inside the selected application." rows={applications.filter(a => ['FINAL_DECISION', 'APPROVED', 'REJECTED'].includes(a.state) || a.decisionState !== 'NOT_STARTED')} onOpen={onOpen} />;
}

export function InspectionRecords({ onOpen }: { onOpen: (id: string) => void }) {
  return <Worklist title="Inspection Records" description="Inspection history and application-linked records. Scheduling work remains in Inspection Queue." rows={applications.filter(a => a.inspectionId || ['INSPECTION_PENDING', 'INSPECTION_SCHEDULED'].includes(a.state))} onOpen={onOpen} />;
}

export function ApplicationInspections() {
  const a = useApplicationWorkspace();
  return (
    <section className="bg-[#F8F9FA] p-6">
      <div className="max-w-4xl rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <h2 className="text-lg font-bold text-[#17365D]">Application inspections</h2>
        <p className="mt-1 text-xs text-[#5C6470]">Inspection records are restricted to {a.id}.</p>
        {a.inspectionId ? (
          <dl className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-[#F8F9FA] p-3.5 border border-slate-100">
              <dt className="text-[11px] font-semibold text-[#5C6470]">Inspection ID</dt>
              <dd className="mt-1 font-mono text-xs font-bold text-[#20242A]">{a.inspectionId}</dd>
            </div>
            <div className="rounded-lg bg-[#F8F9FA] p-3.5 border border-slate-100">
              <dt className="text-[11px] font-semibold text-[#5C6470]">Application</dt>
              <dd className="mt-1 font-mono text-xs font-bold text-[#20242A]">{a.id}</dd>
            </div>
            <div className="rounded-lg bg-[#F8F9FA] p-3.5 border border-slate-100">
              <dt className="text-[11px] font-semibold text-[#5C6470]">State</dt>
              <dd className="mt-1 text-xs font-bold text-[#20242A]">{applicationStateLabel(a.state)}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-4 rounded-lg border border-slate-200 bg-[#F8F9FA] p-4 text-xs text-[#5C6470]">
            No inspection has been initiated for this application.
          </p>
        )}
      </div>
    </section>
  );
}
