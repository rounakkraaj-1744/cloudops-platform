import { DashboardLayout } from "@/components/dashboard-layout"
import { MonitoringDashboard } from "@/components/monitoring-dashboard"

export default function MonitoringPage() {
  return (
    <DashboardLayout children={undefined}>
      <MonitoringDashboard />
    </DashboardLayout>
  )
}
