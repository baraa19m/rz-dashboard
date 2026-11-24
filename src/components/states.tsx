import { AlertCircle, Inbox, Loader2 } from 'lucide-react'

export function EmptyState({
  title = 'No data available',
  hint = 'Awaiting data integration.',
  compact = false,
}: { title?: string; hint?: string; compact?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-8' : 'py-14'}`}>
      <div className="mb-3 rounded-full bg-brand-50 p-3 text-brand-600"><Inbox size={22} /></div>
      <p className="text-sm font-semibold text-brand-800">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  )
}

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-brand-600">
      <Loader2 className="animate-spin" size={26} />
      <p className="mt-3 text-sm text-slate-500">{label}</p>
    </div>
  )
}

export function ErrorState({ message = 'Something went wrong.', onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="mb-3 rounded-full bg-rz-redSoft p-3 text-rz-red"><AlertCircle size={22} /></div>
      <p className="text-sm font-semibold text-brand-800">{message}</p>
      {onRetry && <button className="btn-outline mt-4" onClick={onRetry}>Try again</button>}
    </div>
  )
}
