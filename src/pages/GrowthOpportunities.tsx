import { Rocket, Target, TrendingUp } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { FilterBar } from '../components/FilterBar'
import { KpiCard } from '../components/KpiCard'
import { BarSeriesChart, ChartCard } from '../components/charts'
import { DataTable, makeColumns } from '../components/DataTable'
import { Panel } from '../components/Card'
import { EmptyState } from '../components/states'

export default function GrowthOpportunities() {
  return (
    <>
      <PageHeader title="Customer Growth Opportunities" subtitle="Where customers can grow compared with their peers." />
      <FilterBar />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <KpiCard label="Growth Customers" icon={<Rocket size={18} />} />
        <KpiCard label="Total Potential" icon={<TrendingUp size={18} />} />
        <KpiCard label="Avg. Gap vs Peers" icon={<Target size={18} />} />
      </div>
      <h3 className="mb-3 text-base font-semibold">Customer Growth Ranking</h3>
      <div className="mb-6"><DataTable columns={makeColumns(['Rank', 'Customer', 'Current Spend', 'Peer Benchmark', 'Gap', 'Potential'])} /></div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Customer Spending vs Peer Benchmark">
          <BarSeriesChart series={[{ key: 'customer', name: 'Customer' }, { key: 'peers', name: 'Peer benchmark' }]} />
        </ChartCard>
        <Panel title="Missing Product Categories" subtitle="Categories peers buy that this customer does not">
          <EmptyState />
        </Panel>
      </div>
    </>
  )
}
