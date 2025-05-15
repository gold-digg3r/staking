import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { JailbirdsCollection } from "@/data/jailbirds-collection"

interface CollectionHeaderProps {
  collection: JailbirdsCollection
}

export function CollectionHeader({ collection }: CollectionHeaderProps) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-amber-900/80 to-yellow-800/80 border border-amber-500/20">
      <div className="absolute inset-0 bg-[url('/placeholder-2a21v.png')] opacity-20 bg-cover bg-center mix-blend-overlay" />

      <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-lg overflow-hidden border-2 border-amber-500/50 shadow-lg">
          <Image
            src="/placeholder-dforw.png"
            alt={collection.name}
            width={160}
            height={160}
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2">
            <Badge variant="gold" className="text-xs px-2 py-0.5">
              {collection.symbol}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-0.5 border-amber-500/50 text-amber-200">
              {collection.characters.length} Characters
            </Badge>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{collection.name}</h1>
          <p className="text-amber-100/80 max-w-2xl">{collection.description}</p>

          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            <button className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-4 py-2 rounded-md transition">
              View on Marketplace
            </button>
            <button className="bg-transparent hover:bg-amber-800/50 text-amber-200 border border-amber-500/50 font-medium px-4 py-2 rounded-md transition">
              Stake Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
