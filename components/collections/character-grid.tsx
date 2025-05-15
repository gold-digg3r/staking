import { CharacterCard } from "@/components/collections/character-card"
import type { JailbirdsCharacter } from "@/data/jailbirds-collection"

interface CharacterGridProps {
  characters: JailbirdsCharacter[]
}

export function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Characters ({characters.length})</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  )
}
