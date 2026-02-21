'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}

export function ImagePreview({ src, alt, className, fill }: ImagePreviewProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={fill ? `relative block w-full h-full ${className ?? ''}` : (className ?? '')}
        aria-label={`Preview ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill ?? false}
          className="object-contain cursor-pointer"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setOpen(false)}
            aria-label="Close"
          />
          <div
            className="relative z-10 max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] w-auto object-contain"
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
