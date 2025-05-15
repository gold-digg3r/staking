import RarityGuide from "@/components/rarity/rarity-guide"
import RarityCalculator from "@/components/rarity/rarity-calculator"

export const metadata = {
  title: "Rarity Guide & Calculator | Gold Digger",
  description: "Understand rarity multipliers and calculate potential rewards in the Gold Diggers ecosystem",
}

export default function RarityPage() {
  return (
    <div className="space-y-12 pb-12">
      <RarityGuide />
      <RarityCalculator />
    </div>
  )
}
