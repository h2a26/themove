'use client';

import { useEffect, useState } from 'react';
import { ProjectIndexCarousel } from '@/shared/components/project/ProjectIndexCarousel';
import Image from 'next/image';

interface ProjectIndexGalleryProps {
  slug: string | undefined;
}

type ProjectImage = { id: number; image: string; width?: number; height?: number };

export function ProjectIndexGallery({ slug }: ProjectIndexGalleryProps) {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    const formattedSlug = slug.replace(/[^a-z0-9-]/gi, '').toLowerCase();
    import(`@/public/data/projects/${formattedSlug}/index-images`)
      .then((mod) => setImages(mod.default || []))
      .catch(() => setImages([]));
  }, [slug]);

  if (!slug || !images.length) return null;

  const openCarousel = (index: number) => {
    setSelectedIndex(index);
    setCarouselOpen(true);
  };

  return (
    <>
      <section className="bg-light-beige py-16 px-2 sm:px-4">
        <h2
          className="text-center text-xl uppercase tracking-widest mb-10"
          style={{ fontFamily: 'var(--font-acaslon-pro)' }}
        >
          Index
        </h2>
        <div className="max-w-[1600px] mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 gap-[8px]">
          {images.map((image, index) => (
            <figure
              key={image.id || index}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => openCarousel(index)}
            >
              <Image
                src={image.image}
                alt={`Project image ${index + 1}`}
                width={image.width || 350}
                height={image.height || 350}
                className="rounded-xl group-hover:opacity-80 transition"
                style={{ objectFit: 'cover' }}
              />
            </figure>
          ))}
        </div>
        {carouselOpen && (
          <ProjectIndexCarousel
            slides={images}
            initialIndex={selectedIndex}
            onClose={() => setCarouselOpen(false)}
          />
        )}
      </section>
    </>
  );
}
