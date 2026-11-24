import { PageHeader } from '../components/PageHeader'
import { Select } from '../components/Fields'
import { Card, Panel } from '../components/Card'
import { DataTable, makeColumns } from '../components/DataTable'
import { ChartCard, ScatterPlot } from '../components/charts'
import { EmptyState } from '../components/states'

export default function CrossSelling() {
  return (
    <>
      <PageHeader title="Cross-Selling Opportunities" subtitle="Product recommendations and associations." />
      <Card className="mb-6 flex flex-wrap items-end gap-4 p-4">
        <Select label="Customer" placeholder="Select customer" />
        <Select label="Product" placeholder="Select product" />
        <Select label="Sector" placeholder="All sectors" />
        <button className="btn-red ml-auto" disabled>Generate recommendations</button>
      </Card>
      <h3 className="mb-3 text-base font-semibold">Product Recommendations</h3>
      <div className="mb-6">
        <DataTable columns={makeColumns(['Customer', 'Recommended Product', 'Association Strength', 'Expected Value', 'Reason'])} />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <ChartCard className="xl:col-span-2" title="Product Association" subtitle="Relationships between products"><ScatterPlot /></ChartCard>
        <Panel title="Recommendation Explanation"><EmptyState title="Nothing selected" hint="Awaiting data integration." compact /></Panel>
      </div>
    </>
  )
}
