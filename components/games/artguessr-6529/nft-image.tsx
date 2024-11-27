import Image from 'next/image'

interface NFTImageProps {
  src: string
  alt: string
}

export function NFTImage({ src, alt }: NFTImageProps) {
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        unoptimized
        priority
      />
    </div>
  )
}

