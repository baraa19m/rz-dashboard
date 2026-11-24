import type { ReactNode } from 'react'
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis,
} from 'recharts'
import { Card, CardHeader } from './Card'
import { EmptyState, ErrorState, LoadingState } from './states'

export const palette = ['#12337A', '#D72328', '#5B84CC', '#9AA7BD', '#B51A1F', '#B7CBEE']
export type Series = { key: string; name: string; color?: string }
type Data = Record<string, unknown>[]

const axis = { stroke: '#9AA7BD', fontSize: 12, tickLine: false, axisLine: false } as const

/** Wrapper: renders the (empty) chart and overlays states on top. */
export function ChartCard({ title, subtitle, height = 280, hasData = false, status = 'ready', action, className = '', children }: {
  title: string; subtitle?: string; height?: number; hasData?: boolean
  status?: 'ready' | 'loading' | 'error'; action?: ReactNode; className?: string; children: ReactNode
}) {
  return (
    <Card className={className}>
      <CardHeader title={title} subtitle={subtitle} action={action} />
      <div className="relative p-5" style={{ height }}>
        <div className={`h-full ${hasData ? '' : 'opacity-40'}`}>{children}</div>
        {status === 'ready' && !hasData && (
          <div className="absolute inset-0 flex items-center justify-center"><EmptyState compact /></div>
        )}
        {status === 'loading' && <div className="absolute inset-0 flex items-center justify-center bg-white/80"><LoadingState /></div>}
        {status === 'error' && <div className="absolute inset-0 flex items-center justify-center bg-white/90"><ErrorState /></div>}
      </div>
    </Card>
  )
}

export function LineSeriesChart({ data = [], xKey = 'x', series = [{ key: 'value', name: 'Value' }] }: { data?: Data; xKey?: string; series?: Series[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid stroke="#E3E8F2" vertical={false} />
        <XAxis dataKey={xKey} {...axis} /><YAxis {...axis} /><Tooltip /><Legend />
        {series.map((s, i) => <Line key={s.key} dataKey={s.key} name={s.name} stroke={s.color ?? palette[i]} strokeWidth={2.5} dot={false} />)}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function BarSeriesChart({ data = [], xKey = 'x', series = [{ key: 'value', name: 'Value' }], layout = 'horizontal' }: {
  data?: Data; xKey?: string; series?: Series[]; layout?: 'horizontal' | 'vertical'
}) {
  const v = layout === 'vertical'
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout={layout}>
        <CartesianGrid stroke="#E3E8F2" vertical={v} horizontal={!v} />
        {v ? <><XAxis type="number" {...axis} /><YAxis type="category" dataKey={xKey} {...axis} /></>
           : <><XAxis dataKey={xKey} {...axis} /><YAxis {...axis} /></>}
        <Tooltip /><Legend />
        {series.map((s, i) => <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color ?? palette[i]} radius={[6, 6, 0, 0]} />)}
      </BarChart>
    </ResponsiveContainer>
  )
}

export function DonutChart({ data = [], nameKey = 'name', valueKey = 'value' }: { data?: Data; nameKey?: string; valueKey?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} nameKey={nameKey} dataKey={valueKey} innerRadius="55%" outerRadius="80%">
          {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
        </Pie>
        <Tooltip /><Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function ScatterPlot({ data = [], xKey = 'x', yKey = 'y' }: { data?: Data; xKey?: string; yKey?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart>
        <CartesianGrid stroke="#E3E8F2" />
        <XAxis type="number" dataKey={xKey} {...axis} /><YAxis type="number" dataKey={yKey} {...axis} /><Tooltip />
        <Scatter data={data} fill="#12337A" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
