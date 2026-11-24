import type { ReactNode } from 'react'
import { Card } from './Card'

export function KpiCard({ label, value = '—', hint = 'Awaiting data integration', icon, accent = 'navy', loading = false }: {
  label: string; value?: string; hint?: string; icon?: ReactNode; accent?: 'navy' | 'red'; loading?: boolean
}) {
  const tone = accent === 'red' ? 'bg-rz-redSoft text-rz-red' : 'bg-brand-50 text-brand-700'
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {icon && <div className={`rounded-xl p-2 ${tone}`}>{icon}</div>}
      </div>
      {loading
        ? <div className="mt-4 h-8 w-24 animate-pulse rounded bg-brand-50" />
        : <p className="mt-3 text-3xl font-semibold text-brand-900">{value}</p>}
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </Card>
  )
}
