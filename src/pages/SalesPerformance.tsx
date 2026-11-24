import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { FilterBar } from '../components/FilterBar'
import { Tabs } from '../components/Tabs'
import { BarSeriesChart, ChartCard, LineSeriesChart } from '../components/charts'
import { Panel } from '../components/Card'
import { EmptyState } from '../components/states'
import { DataTable, makeColumns } from '../components/DataTable'

const dims = [
  { id: 'region', label: 'Region' }, { id: 'sector', label: 'Sector' },
  { id: 'channel', label: 'Channel' }, { id: 'product', label: 'Product' },
]

export default function SalesPerformance() {
  const [dim, setDim] = useState('region')
  const label = dims.find((d) => d.id === dim)!.label
  return (
    <>
      <PageHeader title="Sales Performance" subtitle="Analyze sales by region, sector, channel and product." />
      <FilterBar />
      <Tabs tabs={dims} value={dim} onChange={setDim} />
      <div className="mb-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title={`Sales by ${label}`}><BarSeriesChart series={[{ key: 'sales', name: 'Sales' }]} /></ChartCard>
        <ChartCard title="Period Comparison" subtitle="Current vs previous period">
          <BarSeriesChart series={[{ key: 'current', name: 'Current' }, { key: 'previous', name: 'Previous' }]} />
        </ChartCard>
      </div>
      <ChartCard className="mb-6" title="Sales Trend Comparison"><LineSeriesChart series={[{ key: 'current', name: 'Current' }, { key: 'previous', name: 'Previous' }]} /></ChartCard>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Panel title="Top Products"><EmptyState compact /></Panel>
        <Panel title="Bottom Products"><EmptyState compact /></Panel>
      </div>
      <h3 className="mb-3 text-base font-semibold">Sales Performance Table</h3>
      <DataTable columns={makeColumns([label, 'Sales', 'Orders', 'Share', 'Growth'])} />
    </>
  )
}
