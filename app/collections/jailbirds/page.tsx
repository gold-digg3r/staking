import type { Metadata } from "next"
import { jailbirdsCollection } from "@/data/jailbirds-collection"
import { CollectionHeader } from "@/components/collections/collection-header"
import { CharacterGrid } from "@/components/collections/character-grid"
import { RarityGuide } from "@/components/collections/rarity-guide"
import { AttributeFilters } from "@/components/collections/attribute-filters"

export const metadata: Metadata = {
  title: "Gold Digger: Jailbirds Collection",
  description: jailbirdsCollection.description,
}

export default function JailbirdsCollectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CollectionHeader collection={jailbirdsCollection} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <RarityGuide rarities={jailbirdsCollection.rarities} />
            <AttributeFilters attributes={jailbirdsCollection.attributes} />
          </div>
        </div>

        <div className="lg:col-span-3">
          <CharacterGrid characters={jailbirdsCollection.characters} />
        </div>
      </div>
    </div>
  )
}
