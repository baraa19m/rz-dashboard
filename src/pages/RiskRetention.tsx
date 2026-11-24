import { AlertTriangle, TrendingDown, UserMinus } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { FilterBar } from '../components/FilterBar'
import { KpiCard } from '../components/KpiCard'
import { BarSeriesChart, ChartCard } from '../components/charts'
import { DataTable, makeColumns } from '../components/DataTable'
import { Panel } from '../components/Card'
import { EmptyState } from '../components/states'

export default function RiskRetention() {
  return (
    <>
      <PageHeader title="Customer Risk & Retention" subtitle="Identify declining, at-risk and lost customers." />
      <FilterBar />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <KpiCard label="Declining Customers" icon={<TrendingDown size={18} />} />
        <KpiCard label="At-Risk Customers" icon={<AlertTriangle size={18} />} accent="red" />
        <KpiCard label="Lost Customers" icon={<UserMinus size={18} />} accent="red" />
      </div>
      <h3 className="mb-3 text-base font-semibold">Customer Risk Table</h3>
      <div className="mb-6">
        <DataTable columns={makeColumns(['Customer', 'Risk Level', 'Last Purchase', 'Decline %', 'Sales Change', 'Action'])} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Purchasing Decline Indicators" subtitle="Decline by customer or period">
          <BarSeriesChart layout="vertical" series={[{ key: 'decline', name: 'Decline' }]} />
        </ChartCard>
        <Panel title="Risk Explanation" subtitle="Why a customer is flagged">
          <EmptyState title="No explanation available" hint="Select a customer once risk analysis is connected." />
        </Panel>
      </div>
    </>
  )
}
