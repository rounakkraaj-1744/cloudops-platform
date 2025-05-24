import { DashboardLayout } from "@/components/dashboard-layout"
import { InfrastructureDashboard } from "@/components/infrastructure-dashboard"

export default function InfrastructurePage() {
  return (
    <DashboardLayout children={undefined}>
      <InfrastructureDashboard />
    </DashboardLayout>
  )
}
