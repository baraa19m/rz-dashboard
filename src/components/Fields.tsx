import { Search } from 'lucide-react'

export function SearchInput({ placeholder = 'Search…', className = '' }: { placeholder?: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input className="input w-full pl-10" placeholder={placeholder} />
    </div>
  )
}

export function Select({ label, options = [], placeholder = 'All', disabled = false }: {
  label?: string; options?: string[]; placeholder?: string; disabled?: boolean
}) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="text-xs font-medium text-slate-500">{label}</span>}
      <select className="input min-w-[150px] pr-8" disabled={disabled}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  )
}
