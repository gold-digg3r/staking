import Image from "next/image"
import Link from "next/link"
import { type JailbirdsCharacter, jailbirdsCollection } from "@/data/jailbirds-collection"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"

interface CharacterCardProps {
  character: JailbirdsCharacter
}

export function CharacterCard({ character }: CharacterCardProps) {
  const rarityInfo = jailbirdsCollection.rarities.find((r) => r.name === character.rarity)

  return (
    <Link href={`/collections/jailbirds/character/${character.id}`}>
      <div className="group relative bg-black/40 rounded-lg overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            width={300}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge
              style={{ backgroundColor: rarityInfo?.color || "#9CA3AF" }}
              className="text-white text-xs font-medium px-2 py-0.5"
            >
              {character.rarity}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  size={14}
                  className={i < character.stars ? "text-amber-400 fill-amber-400" : "text-gray-600"}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
            {character.name}
          </h3>
          <p className="text-amber-200/70 text-sm">{character.alias}</p>

          <div className="mt-3 flex flex-wrap gap-1">
            {character.attributes.slice(0, 3).map((attr) => (
              <Badge key={attr.trait_type} variant="outline" className="text-xs border-amber-500/30 text-amber-200/80">
                {attr.value}
              </Badge>
            ))}
            {character.attributes.length > 3 && (
              <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-200/80">
                +{character.attributes.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
