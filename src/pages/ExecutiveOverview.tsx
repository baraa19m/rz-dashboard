import { AlertTriangle, Rocket, Users, Wallet } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { FilterBar } from '../components/FilterBar'
import { KpiCard } from '../components/KpiCard'
import { ChartCard, DonutChart, LineSeriesChart } from '../components/charts'
import { Panel } from '../components/Card'
import { DataTable, makeColumns } from '../components/DataTable'

const health = [
  { label: 'Healthy', color: 'bg-brand-700' },
  { label: 'Declining', color: 'bg-brand-400' },
  { label: 'At Risk', color: 'bg-rz-red' },
  { label: 'Lost', color: 'bg-slate-400' },
]

export default function ExecutiveOverview() {
  return (
    <>
      <PageHeader title="Executive Overview" subtitle="High-level view of sales, customers and opportunities." />
      <FilterBar />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Sales" icon={<Wallet size={18} />} />
        <KpiCard label="Active Customers" icon={<Users size={18} />} />
        <KpiCard label="At-Risk Customers" icon={<AlertTriangle size={18} />} accent="red" />
        <KpiCard label="Growth Opportunities" icon={<Rocket size={18} />} />
      </div>
      <div className="mb-6 grid gap-6 xl:grid-cols-3">
        <ChartCard className="xl:col-span-2" title="Monthly Sales Trend" subtitle="Sales over time">
          <LineSeriesChart series={[{ key: 'sales', name: 'Sales' }]} />
        </ChartCard>
        <ChartCard title="Sales by Sector" subtitle="Distribution across sectors"><DonutChart /></ChartCard>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Customer Health Summary" subtitle="Customers by health status">
          <ul className="space-y-4">
            {health.map((h) => (
              <li key={h.label}>
                <div className="mb-1 flex justify-between text-sm"><span className="flex items-center gap-2"><i className={`h-2.5 w-2.5 rounded-full ${h.color}`} />{h.label}</span><b>—</b></div>
                <div className="h-2 rounded-full bg-brand-50" />
              </li>
            ))}
          </ul>
        </Panel>
        <div className="xl:col-span-2">
          <h3 className="mb-3 text-base font-semibold">Priority Opportunities</h3>
          <DataTable columns={makeColumns(['Customer', 'Opportunity', 'Estimated Potential', 'Priority', 'Action'])} pageSize={5} emptyHint="Opportunities will appear once data is integrated." />
        </div>
      </div>
    </>
  )
}
