import type { Metadata } from "next"
import ClientWrapper from "./client-wrapper"

export const metadata: Metadata = {
  title: "Staking Dashboard | Gold Digger",
  description: "Manage your staked assets and track your rewards in the Gold Digger ecosystem",
}

export default function StakingDashboardPage() {
  return <ClientWrapper />
}
