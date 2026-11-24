export type TabItem = { id: string; label: string }

export function Tabs({ tabs, value, onChange }: { tabs: TabItem[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="mb-5 flex flex-wrap gap-1 rounded-full border border-surface-border bg-white p-1 shadow-card w-fit">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            value === t.id ? 'bg-brand-800 text-white' : 'text-brand-800 hover:bg-brand-50'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
