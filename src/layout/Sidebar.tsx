import { NavLink } from 'react-router-dom'
import {
  BarChart3, Database, LayoutDashboard, Rocket, Shuffle, ShieldAlert, UserSquare2, Users, X,
} from 'lucide-react'

const nav = [
  { to: '/', label: 'Executive Overview', icon: LayoutDashboard, end: true },
  { to: '/sales', label: 'Sales Performance', icon: BarChart3 },
  { to: '/customers', label: 'Customer Intelligence', icon: Users, end: true },
  { to: '/customers/preview', label: 'Customer 360', icon: UserSquare2 },
  { to: '/risk', label: 'Risk & Retention', icon: ShieldAlert },
  { to: '/cross-sell', label: 'Cross-Selling', icon: Shuffle },
  { to: '/growth', label: 'Growth Opportunities', icon: Rocket },
  { to: '/data', label: 'Data Management', icon: Database },
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-brand-900/40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-brand-900 text-white transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            {/* Replace with your logo: <img src="/logo.png" className="h-10" /> */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rz-red text-lg font-bold italic">RZ</div>
            <div className="leading-tight">
              <p className="font-semibold">RZ Analytics</p>
              <p className="text-xs text-brand-200">Customer Intelligence</p>
            </div>
          </div>
          <button className="lg:hidden" onClick={onClose} aria-label="Close menu"><X size={20} /></button>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-white/10 text-white' : 'text-brand-200 hover:bg-white/5 hover:text-white'}`}>
              {({ isActive }) => (<>
                {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-rz-red" />}
                <Icon size={18} />{label}
              </>)}
            </NavLink>
          ))}
        </nav>
        <p className="px-6 py-5 text-xs text-brand-200/70">Frontend skeleton · no data connected</p>
      </aside>
    </>
  )
}
