import Image from 'next/image'

interface NFTImageProps {
  src: string
  alt: string
}

export function NFTImage({ src, alt }: NFTImageProps): JSX.Element {
  const isGoogleImage = src.includes('googleusercontent.com')
  
  return (
    <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden artcade-nft-container">
      <Image
        src={src}
        alt={alt}
        fill
        className="w-full h-full object-cover scale-110 artcade-nft-image"
        sizes="100vw"
        priority
        quality={90}
        unoptimized={isGoogleImage}
      />
    </div>
  )
}

