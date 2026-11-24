import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export function Modal({ open, onClose, title, children, footer }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/40 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1 hover:bg-brand-50"><X size={18} /></button>
        </div>
        <div className="p-5">{children}</div>
        <div className="flex justify-end gap-3 border-t border-surface-border px-5 py-3">
          {footer ?? <button className="btn-outline" onClick={onClose}>Close</button>}
        </div>
      </div>
    </div>
  )
}
