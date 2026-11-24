import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { SearchInput } from '../components/Fields'

export function AppLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-surface-border bg-white/90 px-6 py-3 backdrop-blur">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          <SearchInput placeholder="Search customers, products…" className="w-full max-w-md" />
          <div className="ml-auto flex items-center gap-4">
            <button className="rounded-full p-2 hover:bg-brand-50" aria-label="Notifications"><Bell size={18} /></button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-800 text-sm font-semibold text-white">—</div>
          </div>
        </header>
        <main className="mx-auto max-w-[1400px] p-6"><Outlet /></main>
      </div>
    </div>
  )
}
