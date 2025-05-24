import { CiCdDashboard } from "@/components/ci-cd-dashboard"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function CiCdPage() {
  return (
    <DashboardLayout>
      <CiCdDashboard/>
    </DashboardLayout>
  )
}
