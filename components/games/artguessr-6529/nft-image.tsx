import Image from 'next/image'

interface NFTImageProps {
  src: string
  alt: string
}

export function NFTImage({ src, alt }: NFTImageProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="w-full h-full object-cover"
        sizes="100vw"
        priority
        quality={90}
      />
    </div>
  )
}

