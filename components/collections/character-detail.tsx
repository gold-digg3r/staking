import Image from "next/image"
import Link from "next/link"
import { type JailbirdsCharacter, jailbirdsCollection } from "@/data/jailbirds-collection"
import { Badge } from "@/components/ui/badge"
import { StarIcon, ArrowLeft, Share2, Heart } from "lucide-react"

interface CharacterDetailProps {
  character: JailbirdsCharacter
}

export function CharacterDetail({ character }: CharacterDetailProps) {
  const rarityInfo = jailbirdsCollection.rarities.find((r) => r.name === character.rarity)

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/collections/jailbirds"
          className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Collection
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative">
          <div className="sticky top-24 bg-black/40 rounded-lg overflow-hidden border border-amber-500/20">
            <div className="relative aspect-square">
              <Image src={character.image || "/placeholder.svg"} alt={character.name} fill className="object-cover" />
            </div>

            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    size={16}
                    className={i < character.stars ? "text-amber-400 fill-amber-400" : "text-gray-600"}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-amber-500/20 text-amber-400 transition-colors">
                  <Heart size={18} />
                </button>
                <button className="p-2 rounded-full hover:bg-amber-500/20 text-amber-400 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge style={{ backgroundColor: rarityInfo?.color || "#9CA3AF" }} className="text-white px-2 py-0.5">
              {character.rarity}
            </Badge>
            <Badge variant="outline" className="border-amber-500/50 text-amber-200">
              #{character.id.toString().padStart(4, "0")}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-white mb-1">{character.name}</h1>
          <p className="text-xl text-amber-200 mb-6">{character.alias}</p>

          <div className="bg-black/40 rounded-lg p-5 border border-amber-500/20 mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Backstory</h2>
            <p className="text-amber-100/80">{character.backstory}</p>
          </div>

          <div className="bg-black/40 rounded-lg p-5 border border-amber-500/20 mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Appearance</h2>
            <p className="text-amber-100/80">{character.appearance}</p>

            <div className="mt-4">
              <span className="text-amber-400 font-medium">Iconic Item:</span>
              <span className="text-amber-100/80 ml-2">{character.iconic_item}</span>
            </div>
          </div>

          <div className="bg-black/40 rounded-lg p-5 border border-amber-500/20">
            <h2 className="text-lg font-semibold text-white mb-3">Attributes</h2>

            <div className="grid grid-cols-2 gap-4">
              {character.attributes.map((attr) => (
                <div key={attr.trait_type} className="bg-black/30 rounded p-3 border border-amber-500/10">
                  <span className="text-amber-400 text-sm block mb-1">{attr.trait_type}</span>
                  <span className="text-white font-medium">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 rounded-md transition">
              Stake Character
            </button>
            <button className="flex-1 bg-transparent hover:bg-amber-800/50 text-amber-200 border border-amber-500/50 font-medium py-3 rounded-md transition">
              View on Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
