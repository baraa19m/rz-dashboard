import { useState } from 'react'
import { CheckCircle2, FileSpreadsheet, UploadCloud } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Tabs } from '../components/Tabs'
import { Card, Panel } from '../components/Card'
import { KpiCard } from '../components/KpiCard'
import { Select } from '../components/Fields'
import { DataTable, makeColumns } from '../components/DataTable'

const tabs = [
  { id: 'upload', label: '1. Upload' }, { id: 'mapping', label: '2. Column Mapping' },
  { id: 'preview', label: '3. Preview' }, { id: 'quality', label: '4. Data Quality' },
  { id: 'status', label: '5. Processing' },
]
const fields = ['Customer ID', 'Customer Name', 'Date', 'Product', 'Quantity', 'Amount', 'Region', 'Sector', 'Channel']
const steps = ['Validation', 'Cleaning', 'Loading', 'Analytics']

export default function DataManagement() {
  const [tab, setTab] = useState('upload')
  const [fileName, setFileName] = useState<string | null>(null)
  return (
    <>
      <PageHeader title="Data Management" subtitle="Upload, map, preview and validate company data." />
      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === 'upload' && (
        <Card className="p-6">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 py-16 text-center hover:bg-brand-50">
            <UploadCloud size={36} className="text-brand-600" />
            <p className="mt-3 font-semibold">Drag & drop or click to upload</p>
            <p className="text-xs text-slate-500">CSV, XLSX or XLS</p>
            <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
          </label>
          {fileName && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-surface-border p-3 text-sm">
              <FileSpreadsheet size={18} className="text-brand-600" />{fileName}
              <span className="ml-auto text-xs text-slate-400">Selected — parsing not implemented yet</span>
            </div>
          )}
        </Card>
      )}

      {tab === 'mapping' && (
        <Panel title="Column Mapping" subtitle="Match your file columns to system fields">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {fields.map((f) => <Select key={f} label={f} placeholder="Select column (no file loaded)" disabled />)}
          </div>
        </Panel>
      )}

      {tab === 'preview' && <DataTable columns={makeColumns(['Column 1', 'Column 2', 'Column 3', 'Column 4'])} emptyHint="Upload a file to preview its first rows." />}

      {tab === 'quality' && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Completeness" /><KpiCard label="Missing Values" /><KpiCard label="Duplicate Rows" /><KpiCard label="Invalid Formats" />
        </div>
      )}

      {tab === 'status' && (
        <Panel title="Processing Status" subtitle="No job running">
          <div className="mb-6">
            <div className="mb-1 flex justify-between text-sm"><span>Overall progress</span><b>0%</b></div>
            <div className="h-3 rounded-full bg-brand-50"><div className="h-3 w-0 rounded-full bg-rz-red" /></div>
          </div>
          <ul className="space-y-3">
            {steps.map((s) => (
              <li key={s} className="flex items-center gap-3 text-sm text-slate-500"><CheckCircle2 size={18} className="text-slate-300" />{s}<span className="ml-auto text-xs">Not started</span></li>
            ))}
          </ul>
        </Panel>
      )}
    </>
  )
}
