import type { JailbirdsRarity } from "@/data/jailbirds-collection"

interface RarityGuideProps {
  rarities: JailbirdsRarity[]
}

export function RarityGuide({ rarities }: RarityGuideProps) {
  return (
    <div className="bg-black/40 rounded-lg p-4 border border-amber-500/20 mb-6">
      <h3 className="font-bold text-lg mb-3 text-white">Rarity Guide</h3>

      <div className="space-y-2">
        {rarities.map((rarity) => (
          <div key={rarity.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: rarity.color }} />
              <span className="text-sm text-amber-100">{rarity.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-200/70">{(rarity.probability * 100).toFixed(1)}%</span>
              <span className="text-xs text-amber-400">{rarity.multiplier}x</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
