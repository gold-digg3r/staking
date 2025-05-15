import { PageTitle } from "@/components/ui/page-title"
import { TokenStakingForm } from "@/components/staking/token-staking/token-staking-form"
import { TokenStakingPositions } from "@/components/staking/token-staking/token-staking-positions"
import { AutoCompoundExplainer } from "@/components/staking/token-staking/auto-compound-explainer"

export default function TokenStakingPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageTitle title="Token Staking" description="Stake your DIGR and GOLD tokens to earn rewards" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TokenStakingForm />
        <TokenStakingPositions />
      </div>

      <AutoCompoundExplainer />
    </div>
  )
}
