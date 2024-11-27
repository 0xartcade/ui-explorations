import Image from 'next/image'

interface NFTImageProps {
  src: string
  alt: string
}

export function NFTImage({ src, alt }: NFTImageProps) {
  return (
    <div className="w-full h-[45%] relative overflow-hidden rounded-lg mb-4">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}

