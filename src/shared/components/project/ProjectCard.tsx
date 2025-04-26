import Image from 'next/image';

export type ProjectCardProps = {
  image: string;
  aspect: string;
  caption?: string;
};

export function ProjectCard({ image, aspect, caption }: ProjectCardProps) {
  const aspectClass = aspect === 'landscape' ? 'aspect-[16/10]' : 'aspect-[9/13]';

  return (
    <div className={`relative w-full ${aspectClass}`}>
      <Image
        src={image}
        alt={caption || ''}
        className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
        priority
      />

      {/* Optional overlay caption for the first card */}
      {caption && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center">
          <p
            className="text-light-beige text-sm md:text-xl lg:text-2xl uppercase font-extrabold tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-acaslon-pro)' }}
          >
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}
