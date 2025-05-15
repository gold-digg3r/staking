import Image from "next/image"

interface DigrIconProps {
  size?: number
  className?: string
}

export function DigrIcon({ size = 24, className = "" }: DigrIconProps) {
  return <Image src="/digr.svg" alt="DIGR Token" width={size} height={size} className={className} />
}
