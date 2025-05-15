import type { Metadata } from "next"
import StakingHistory from "@/components/staking/staking-history"
import { PageTitle } from "@/components/ui/page-title"

export const metadata: Metadata = {
  title: "Staking History | Gold Digger",
  description: "View your staking history and rewards",
}

export default function StakingHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Staking History" description="View your staking history and rewards" />
      <StakingHistory />
    </div>
  )
}
