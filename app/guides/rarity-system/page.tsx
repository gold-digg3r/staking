import RaritySystemGuide from "@/components/guides/rarity-system-guide"

export const metadata = {
  title: "Rarity System Guide | Gold Digger",
  description:
    "Understand how rarity affects staking power, rewards, and mission success in the Gold Diggers ecosystem",
}

export default function RaritySystemPage() {
  return (
    <div className="space-y-12 pb-12">
      <RaritySystemGuide />
    </div>
  )
}
