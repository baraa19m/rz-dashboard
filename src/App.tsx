import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import ExecutiveOverview from './pages/ExecutiveOverview'
import SalesPerformance from './pages/SalesPerformance'
import CustomerIntelligence from './pages/CustomerIntelligence'
import Customer360 from './pages/Customer360'
import RiskRetention from './pages/RiskRetention'
import CrossSelling from './pages/CrossSelling'
import GrowthOpportunities from './pages/GrowthOpportunities'
import DataManagement from './pages/DataManagement'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ExecutiveOverview />} />
        <Route path="sales" element={<SalesPerformance />} />
        <Route path="customers" element={<CustomerIntelligence />} />
        <Route path="customers/:customerId" element={<Customer360 />} />
        <Route path="risk" element={<RiskRetention />} />
        <Route path="cross-sell" element={<CrossSelling />} />
        <Route path="growth" element={<GrowthOpportunities />} />
        <Route path="data" element={<DataManagement />} />
      </Route>
    </Routes>
  )
}
