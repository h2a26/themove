import Link from 'next/link';
import Image from 'next/image';

export type ProjectCardProps = {
  title: string;
  image: string;
  borderColor: string;
  routeTo: string;
};

export function ProjectsCard({ title, image, borderColor, routeTo }: ProjectCardProps) {
  return (
    <Link href={routeTo} className="w-full hover:cursor-pointer group box-border">
      {/* Image Container with Border Overlay */}
      <div className="relative overflow-hidden">
        {/* Border Overlay */}
        <div className="border-overlay" style={{ borderColor }}></div>

        {/* Image */}
        <Image
          alt={title}
          src={image}
          className="w-full h-auto object-cover"
          width={800}
          height={600}
          priority={true}
        />
      </div>

      {/* Caption */}
      <p
        className="mt-[17px] mb-[54px] text-sm uppercase tracking-wide text-center text-deep-black"
        style={{ fontFamily: 'var(--font-euclid)' }}
      >
        {title}
      </p>
    </Link>
  );
}
