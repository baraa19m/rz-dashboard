import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Card } from './Card'
import { Select } from './Fields'

type FilterKey = 'date' | 'sector' | 'region' | 'channel'
const presets = ['7D', '30D', '90D', 'YTD', 'Custom']

export function FilterBar({ filters = ['date', 'sector', 'region', 'channel'] }: { filters?: FilterKey[] }) {
  const [preset, setPreset] = useState('30D')
  return (
    <Card className="mb-6 flex flex-wrap items-end gap-4 p-4">
      {filters.includes('date') && (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500">Period</span>
            <div className="flex rounded-full border border-brand-900/30 p-0.5">
              {presets.map((p) => (
                <button key={p} onClick={() => setPreset(p)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${preset === p ? 'bg-brand-800 text-white' : 'text-brand-800 hover:bg-brand-50'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          {preset === 'Custom' && (
            <>
              <label className="flex flex-col gap-1"><span className="text-xs font-medium text-slate-500">From</span><input type="date" className="input" /></label>
              <label className="flex flex-col gap-1"><span className="text-xs font-medium text-slate-500">To</span><input type="date" className="input" /></label>
            </>
          )}
        </>
      )}
      {filters.includes('sector') && <Select label="Sector" placeholder="All sectors" />}
      {filters.includes('region') && <Select label="Region" placeholder="All regions" />}
      {filters.includes('channel') && <Select label="Channel" placeholder="All channels" />}
      <button className="btn-outline ml-auto" onClick={() => setPreset('30D')}><RotateCcw size={14} /> Reset</button>
    </Card>
  )
}
