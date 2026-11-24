import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Tabs } from '../components/Tabs'
import { SearchInput, Select } from '../components/Fields'
import { DataTable, makeColumns } from '../components/DataTable'
import { Modal } from '../components/Modal'
import { KpiCard } from '../components/KpiCard'
import { ChartCard, LineSeriesChart, ScatterPlot } from '../components/charts'

const tabs = [
  { id: 'directory', label: 'Directory' },
  { id: 'rfm', label: 'Segmentation (RFM)' },
  { id: 'history', label: 'Purchasing History' },
]
const segments = ['Champions', 'Loyal', 'Potential Loyalists', 'Needs Attention', 'At Risk', 'Lost']

export default function CustomerIntelligence() {
  const [tab, setTab] = useState('directory')
  const [filters, setFilters] = useState(false)
  const nav = useNavigate()
  return (
    <>
      <PageHeader title="Customer Intelligence" subtitle="Explore customers, segments and purchasing history." />
      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === 'directory' && (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <SearchInput placeholder="Search by name or ID…" className="w-80" />
            <button className="btn-outline" onClick={() => setFilters(true)}><SlidersHorizontal size={14} /> Filters</button>
            <button className="btn-primary ml-auto" onClick={() => nav('/customers/preview')}>Open Customer 360 (preview)</button>
          </div>
          <DataTable columns={makeColumns(['Customer', 'Sector', 'Region', 'Channel', 'Last Purchase', 'Total Sales', 'Status'])}
            emptyHint="Customer directory will populate after data upload." />
          <Modal open={filters} onClose={() => setFilters(false)} title="Customer Filters"
            footer={<><button className="btn-outline" onClick={() => setFilters(false)}>Cancel</button><button className="btn-primary" onClick={() => setFilters(false)}>Apply</button></>}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Sector" /><Select label="Region" /><Select label="Channel" /><Select label="Status" />
            </div>
          </Modal>
        </>
      )}

      {tab === 'rfm' && (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {segments.map((s) => <KpiCard key={s} label={s} hint="Customers" />)}
          </div>
          <ChartCard title="RFM Segmentation Map" subtitle="Recency vs Frequency"><ScatterPlot /></ChartCard>
        </>
      )}

      {tab === 'history' && (
        <>
          <div className="mb-4 flex gap-3"><Select label="Customer" placeholder="Select a customer" /></div>
          <ChartCard className="mb-6" title="Purchasing History"><LineSeriesChart series={[{ key: 'amount', name: 'Purchases' }]} /></ChartCard>
          <DataTable columns={makeColumns(['Date', 'Product', 'Quantity', 'Amount', 'Channel'])} />
        </>
      )}
    </>
  )
}
