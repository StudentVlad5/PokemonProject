import Image from 'next/image'
import { useState } from 'react'

export default function MemeImage({
  src,
  alt,
  className,
  ...props
}: {
  src: string
  alt: string
  className?: string
  [key: string]: any
}) {
  const [imgError, setImgError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
<div className="relative rounded overflow-hidden bg-gray-100 flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 group">
  {!loaded && (
    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
      <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )}
  <Image
    src={imgError ? '/fallback.jpg' : src}
    alt={alt}
    width={176}
    height={176}
    className={`transition-all duration-300 object-cover rounded ${
      loaded ? 'opacity-100' : 'opacity-0'
    } w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 group-hover:scale-105 group-hover:shadow-lg`}
    onError={() => setImgError(true)}
    onLoadingComplete={() => setLoaded(true)}
    {...props}
  />
</div>
  )
}
