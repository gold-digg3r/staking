import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PoolDetails from "@/components/staking/pools/pool-details"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Pool ${params.id} | Gold Digger Staking`,
    description: `Details and statistics for staking pool ${params.id}`,
  }
}

export default function PoolDetailsPage({ params }: Props) {
  const { id } = params

  // This would typically fetch pool data from an API
  // For now, we'll just pass the ID to the component

  if (!id) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PoolDetails poolId={id} />
    </div>
  )
}
