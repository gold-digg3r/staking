import type { Metadata } from "next"
import { StakingAnalyticsDashboard } from "@/components/staking/analytics/staking-analytics-dashboard"

export const metadata: Metadata = {
  title: "Staking Analytics | Gold Digger",
  description: "View detailed analytics for the Gold Digger staking ecosystem",
}

export default function StakingAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <StakingAnalyticsDashboard />
    </div>
  )
}
