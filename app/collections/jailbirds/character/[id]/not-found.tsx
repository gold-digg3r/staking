import Link from "next/link"

export default function CharacterNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-white mb-4">Character Not Found</h1>
      <p className="text-amber-200/80 mb-8 max-w-md mx-auto">
        The character you're looking for doesn't exist in the Jailbirds collection.
      </p>
      <Link
        href="/collections/jailbirds"
        className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-medium px-6 py-3 rounded-md transition"
      >
        Back to Collection
      </Link>
    </div>
  )
}
