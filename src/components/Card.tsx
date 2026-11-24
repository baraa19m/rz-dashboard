import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-surface-border bg-white shadow-card ${className}`}>{children}</section>
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-surface-border px-5 py-4">
      <div>
        <h3 className="text-base font-semibold text-brand-900">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Panel({ title, subtitle, action, children, className = '' }: {
  title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader title={title} subtitle={subtitle} action={action} />
      <div className="p-5">{children}</div>
    </Card>
  )
}
