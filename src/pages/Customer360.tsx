import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Tabs } from '../components/Tabs'
import { Card, Panel } from '../components/Card'
import { KpiCard } from '../components/KpiCard'
import { ChartCard, LineSeriesChart } from '../components/charts'
import { DataTable, makeColumns } from '../components/DataTable'
import { EmptyState } from '../components/states'

const tabs = [
  { id: 'overview', label: 'Overview' }, { id: 'behavior', label: 'Purchasing Behavior' },
  { id: 'risk', label: 'Risk Status' }, { id: 'opps', label: 'Opportunities' },
]
const info = ['Customer ID', 'Sector', 'Region', 'Channel', 'Account Manager', 'First Purchase']

export default function Customer360() {
  const { customerId } = useParams()
  const [tab, setTab] = useState('overview')
  return (
    <>
      <Link to="/customers" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:underline"><ArrowLeft size={14} /> Back to customers</Link>
      <Card className="mb-6 flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-xl font-semibold text-brand-700">—</div>
        <div>
          <h1 className="text-xl font-semibold">Customer name — <span className="text-sm font-normal text-slate-400">ID: {customerId}</span></h1>
          <span className="badge mt-1 bg-slate-100 text-slate-500">Status: —</span>
        </div>
      </Card>
      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div className="grid gap-6 xl:grid-cols-3">
          <Panel title="Customer Information">
            <dl className="space-y-3 text-sm">
              {info.map((i) => <div key={i} className="flex justify-between border-b border-surface-border pb-2"><dt className="text-slate-500">{i}</dt><dd className="font-medium">—</dd></div>)}
            </dl>
          </Panel>
          <div className="space-y-6 xl:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <KpiCard label="Lifetime Sales" /><KpiCard label="Avg. Order Value" /><KpiCard label="Last Purchase" />
            </div>
            <ChartCard title="Purchasing Trend"><LineSeriesChart series={[{ key: 'amount', name: 'Purchases' }]} /></ChartCard>
          </div>
        </div>
      )}
      {tab === 'behavior' && (<>
        <ChartCard className="mb-6" title="Purchases by Category"><LineSeriesChart /></ChartCard>
        <DataTable columns={makeColumns(['Date', 'Product', 'Quantity', 'Amount'])} />
      </>)}
      {tab === 'risk' && (
        <Panel title="Risk Status" subtitle="Risk level and contributing indicators"><EmptyState hint="Awaiting risk model integration." /></Panel>
      )}
      {tab === 'opps' && (<>
        <PageHeader title="Opportunities" />
        <DataTable columns={makeColumns(['Product / Category', 'Opportunity Type', 'Estimated Potential', 'Confidence'])} />
      </>)}
    </>
  )
}
