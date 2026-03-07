import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type FallbackImageProps = ImageProps & {
  fallbackSrc?: string;
};

export default function FallbackImage({
  fallbackSrc = '/truck-accident-2.jpg',
  src,
  alt,
  ...rest
}: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (typeof currentSrc === 'string' && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}

