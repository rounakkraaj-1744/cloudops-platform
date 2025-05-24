import { DashboardLayout } from "@/components/dashboard-layout"
import { LogsDashboard } from "@/components/logs-dashboard"

export default function LogsPage() {
  return (
    <DashboardLayout children={undefined}>
      <LogsDashboard />
    </DashboardLayout>
  )
}
