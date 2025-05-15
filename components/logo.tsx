import Image from "next/image"
import Link from "next/link"

export default function Logo({ showText = true }: { showText?: boolean }) {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image src="/logo.png" alt="Gold Digger" width={32} height={32} className="rounded-full" />
      {showText && <span className="font-bold text-gold-600 dark:text-gold-500">Gold Digger</span>}
    </Link>
  )
}
