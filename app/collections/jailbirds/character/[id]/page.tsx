import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { jailbirdsCollection } from "@/data/jailbirds-collection"
import { CharacterDetail } from "@/components/collections/character-detail"

interface CharacterPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const character = jailbirdsCollection.characters.find((c) => c.id.toString() === params.id)

  if (!character) {
    return {
      title: "Character Not Found",
    }
  }

  return {
    title: `${character.name} | Gold Digger: Jailbirds`,
    description: character.backstory,
  }
}

export default function CharacterPage({ params }: CharacterPageProps) {
  const character = jailbirdsCollection.characters.find((c) => c.id.toString() === params.id)

  if (!character) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CharacterDetail character={character} />
    </div>
  )
}
