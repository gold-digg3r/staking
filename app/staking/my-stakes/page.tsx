import type { Metadata } from "next"
import StakedNftsList from "@/components/staking/staked-nfts-list"
import { PageTitle } from "@/components/ui/page-title"

export const metadata: Metadata = {
  title: "My Stakes | Gold Digger",
  description: "View and manage your staked NFTs and tokens",
}

export default function MyStakesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="My Stakes" description="View and manage your staked NFTs and tokens" />
      <StakedNftsList />
    </div>
  )
}
