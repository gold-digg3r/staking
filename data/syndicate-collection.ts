import { syndicateCharacters } from "./rarity-system"

export const syndicateCollection = {
  name: "Gold Digger: Syndicate Character Collection",
  symbol: "S|",
  description:
    "A collection of elite criminal masterminds and specialists from the Syndicate. Each character has unique traits, abilities, and backstories for use within the Gold Digger universe.",
  image: "https://app.golddigger.dev/images/syndicate-cover.png",
  external_url: "https://app.golddigger.dev",
  seller_fee_basis_points: 500,
  fee_recipient: "GLDDPmVau3LYh59DbrCejTpcQnEpb3PpfR1VgjaQN4xY",
  rarities: [
    { name: "Common", probability: 0.5, multiplier: 1.0, color: "#9CA3AF" },
    { name: "Uncommon", probability: 0.25, multiplier: 1.5, color: "#10B981" },
    { name: "Rare", probability: 0.15, multiplier: 2.0, color: "#3B82F6" },
    { name: "Epic", probability: 0.07, multiplier: 5.0, color: "#8B5CF6" },
    { name: "Legendary", probability: 0.025, multiplier: 10.0, color: "#F59E0B" },
    { name: "Mythic", probability: 0.005, multiplier: 20.0, color: "#EF4444" },
  ],
  attributes: [
    {
      trait_type: "Trait Tag",
      values: [
        "Mastermind (Founder)",
        "Wildcard (Face)",
        "Tactician (Mind)",
        "Elite (Face)",
        "Hacker (Mind)",
        "Con (Face)",
        "Muscle (Enforcer)",
        "OG (Legacy)",
        "Engineer (Mind)",
        "Social Engineer (Face)",
        "Ghost (Escape)",
        "Fixer (Support)",
        "Tech (Breaker)",
        "Ops (Control)",
      ],
    },
    {
      trait_type: "Signature Traits",
      values: [
        "Strategic",
        "Unforgiving",
        "Visionary",
        "Impulsive",
        "Seductive",
        "Destructive",
        "Analytical",
        "Intense",
        "Unnerving",
        "Elegant",
        "Lethal",
        "Elusive",
        "Rational",
        "Predictive",
        "Cold",
        "Romantic",
        "Ambiguous",
        "Disarming",
        "Relentless",
        "Proud",
        "Protective",
        "Timeless",
        "Deadly",
        "Revered",
        "Meticulous",
        "Cool-headed",
        "Creative",
        "Shapeshifting",
        "Observant",
        "Charming",
        "Silent",
        "Adaptive",
        "Precise",
        "Stoic",
        "Ruthless",
        "Quiet",
        "Brilliant",
        "Devout",
        "Loyal",
        "Efficient",
        "Perfectionist",
      ],
    },
    {
      trait_type: "Iconic Item",
      values: [
        "Gold-plated chess piece",
        "Perfume-soaked matches",
        "Leather-bound journal",
        "Mourning veil",
        "Quantum tablet",
        "Polaroid photo stash",
        "Bloodstained knuckle tape",
        "Ivory-inlaid cane",
        "Folded napkin plans",
        "Mask-shaped mirror",
        "Origami passport",
        "Rubber gloves",
        "Titanium lockpick",
        "Redacted clipboard",
      ],
    },
    {
      trait_type: "Symbol",
      values: [
        "♛ Queen",
        "☼ Flame",
        "🧠 Eye",
        "⚰ Veil",
        "🔮 Circuit",
        "❤ Lock",
        "✊ Brass",
        "⚜ Cane",
        "📐 Map",
        "🎭 Mirror",
        "🕊 Fold",
        "🧼 Glove",
        "🔓 Key",
        "📋 Code",
      ],
    },
  ],
  characters: syndicateCharacters,
}

// Export the syndicateCharacters directly to ensure it's available
export { syndicateCharacters }

export type SyndicateCollection = typeof syndicateCollection
export type SyndicateCharacter = (typeof syndicateCollection.characters)[0]
export type SyndicateRarity = (typeof syndicateCollection.rarities)[0]
export type SyndicateAttribute = (typeof syndicateCollection.attributes)[0]
export type SyndicateCharacterAttribute = {
  trait_type: string
  value: string
}
