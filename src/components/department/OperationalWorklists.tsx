'use client';

import { APPLICATION_CONTEXTS, applicationStateLabel } from '@/data/fixtures/application-contexts';
import { useApplicationWorkspace } from '@/components/application/ApplicationWorkspace';

const applications = Object.values(APPLICATION_CONTEXTS);

function Worklist({ title, description, rows, onOpen }: { title: string; description: string; rows: typeof applications; onOpen: (id: string) => void }) {
  return <section className="bg-[#f8f9fb] p-6"><div className="mb-4"><h1 className="text-xl font-bold text-[#1a3a5c]">{title}</h1><p className="mt-1 text-sm text-[#4b5563]">{description}</p></div><div className="overflow-x-auto rounded border border-[#d1d9e0] bg-white"><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-[#f0f4f8] text-[#374151]"><tr>{['Application', 'Business', 'Service', 'State', 'Current desk', 'SLA', 'Action'].map(h => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr></thead><tbody className="divide-y divide-[#e5e7eb]">{rows.map(a => <tr key={a.id} className="hover:bg-[#f8fbff]"><td className="px-4 py-3 font-mono font-bold text-[#1a56db]">{a.id}</td><td className="px-4 py-3 font-semibold">{a.business}</td><td className="px-4 py-3">{a.service}</td><td className="px-4 py-3">{applicationStateLabel(a.state)}</td><td className="px-4 py-3">{a.desk}</td><td className="px-4 py-3">{a.sla}</td><td className="px-4 py-3"><button onClick={() => onOpen(a.id)} className="rounded bg-[#1a3a5c] px-3 py-1.5 font-bold text-white">Open</button></td></tr>)}</tbody></table>{rows.length === 0 && <p className="p-6 text-sm text-[#4b5563]">No records in this worklist.</p>}</div></section>;
}

export function QueryWorklist({ onOpen, onOpenBuilder }: { onOpen: (id: string) => void; onOpenBuilder?: (id: string) => void }) {
  const rows = applications.filter(a => a.queryVersion || ['QUERY_RAISED', 'RESUBMITTED', 'CORRECTION_REQUIRED'].includes(a.state));
  return (
    <section className="bg-[#f8f9fb] p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-[#1a3a5c]">Query & Deficiency Worklist</h1>
        <p className="mt-1 text-sm text-[#4b5563]">Department-wide query and deficiency tracking. Open Query History (M19) to view responses or Query Builder (M18) to draft new queries.</p>
      </div>
      <div className="overflow-x-auto rounded border border-[#d1d9e0] bg-white">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-[#f0f4f8] text-[#374151]">
            <tr>
              {['Application', 'Business', 'Service', 'State', 'Query Reference', 'Desk', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb]">
            {rows.map(a => (
              <tr key={a.id} className="hover:bg-[#f8fbff]">
                <td className="px-4 py-3 font-mono font-bold text-[#1a56db]">{a.id}</td>
                <td className="px-4 py-3 font-semibold">{a.business}</td>
                <td className="px-4 py-3">{a.service}</td>
                <td className="px-4 py-3">{applicationStateLabel(a.state)}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#374151]">{a.queryVersion ?? 'Pending Draft'}</td>
                <td className="px-4 py-3">{a.desk}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onOpen(a.id)} className="rounded bg-[#1a3a5c] px-3 py-1.5 font-bold text-white hover:bg-[#0f2540]">
                      {a.queryVersion ? 'View History (M19)' : 'Open (M19)'}
                    </button>
                    {onOpenBuilder && (
                      <button onClick={() => onOpenBuilder(a.id)} className="rounded border border-[#1a3a5c] bg-white px-2.5 py-1.5 font-semibold text-[#1a3a5c] hover:bg-[#ebf3ff]">
                        Draft (M18)
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-6 text-sm text-[#4b5563]">No records in this worklist.</p>}
      </div>
    </section>
  );
}

export function ScrutinyWorklist({ onOpen, onOpenQueries }: { onOpen: (id: string) => void; onOpenQueries: (id: string) => void }) {
  const rows = applications.filter(a => ['DOCUMENT_SCRUTINY', 'INITIAL_SCRUTINY', 'TECHNICAL_SCRUTINY', 'RESUBMITTED'].includes(a.state));
  return <section className="bg-[#f8f9fb] p-6"><div className="mb-4"><h1 className="text-xl font-bold text-[#1a3a5c]">Scrutiny Worklist</h1><p className="mt-1 text-sm text-[#4b5563]">Open an application’s Scrutiny tab. Query drafting and response review are owned by the Queries tab.</p></div><div className="overflow-x-auto rounded border border-[#d1d9e0] bg-white"><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-[#f0f4f8]"><tr>{['Application', 'Business', 'Service', 'State', 'Unresolved queries', 'Action'].map(h => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr></thead><tbody className="divide-y divide-[#e5e7eb]">{rows.map(a => <tr key={a.id}><td className="px-4 py-3 font-mono font-bold text-[#1a56db]">{a.id}</td><td className="px-4 py-3 font-semibold">{a.business}</td><td className="px-4 py-3">{a.service}</td><td className="px-4 py-3">{applicationStateLabel(a.state)}</td><td className="px-4 py-3">{a.queryVersion ? <button onClick={() => onOpenQueries(a.id)} className="font-semibold text-[#1a56db] hover:underline">1 · Open Queries</button> : '0'}</td><td className="px-4 py-3"><button onClick={() => onOpen(a.id)} className="rounded bg-[#1a3a5c] px-3 py-1.5 font-bold text-white">Open Scrutiny</button></td></tr>)}</tbody></table></div></section>;
}

export function DecisionQueue({ onOpen }: { onOpen: (id: string) => void }) {
  return <Worklist title="Decision Queue" description="Applications ready for decision review. Conditions and dependency updates remain inside the selected application." rows={applications.filter(a => ['FINAL_DECISION', 'APPROVED', 'REJECTED'].includes(a.state) || a.decisionState !== 'NOT_STARTED')} onOpen={onOpen} />;
}

export function InspectionRecords({ onOpen }: { onOpen: (id: string) => void }) {
  return <Worklist title="Inspection Records" description="Inspection history and application-linked records. Scheduling work remains in Inspection Queue." rows={applications.filter(a => a.inspectionId || ['INSPECTION_PENDING', 'INSPECTION_SCHEDULED'].includes(a.state))} onOpen={onOpen} />;
}

export function ApplicationInspections() {
  const a = useApplicationWorkspace();
  return <section className="bg-[#f8f9fb] p-6"><div className="max-w-4xl rounded border border-[#d1d9e0] bg-white p-5"><h2 className="text-lg font-bold text-[#1a3a5c]">Application inspections</h2><p className="mt-1 text-sm text-[#4b5563]">Inspection records are restricted to {a.id}.</p>{a.inspectionId ? <dl className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded bg-[#f8f9fb] p-3"><dt className="text-[11px] text-[#6b7280]">Inspection ID</dt><dd className="mt-1 font-mono text-sm font-bold">{a.inspectionId}</dd></div><div className="rounded bg-[#f8f9fb] p-3"><dt className="text-[11px] text-[#6b7280]">Application</dt><dd className="mt-1 font-mono text-sm font-bold">{a.id}</dd></div><div className="rounded bg-[#f8f9fb] p-3"><dt className="text-[11px] text-[#6b7280]">State</dt><dd className="mt-1 text-sm font-bold">{applicationStateLabel(a.state)}</dd></div></dl> : <p className="mt-4 rounded border border-[#d1d9e0] bg-[#f8f9fb] p-4 text-sm">No inspection has been initiated for this application.</p>}</div></section>;
}
