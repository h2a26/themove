import { MotionWrapper } from '@/shared/components/MotionWrapper';
import Image from 'next/image';
import { ProjectOpeningReveal } from '@/shared/components/project/ProjectOpeningReveal';
import { Project } from '@/shared/types/project';

type ProjectsSectionProps = {
  projects: Project[];
};

export const ProjectSection = ({ projects }: ProjectsSectionProps) => {
  const [first, ...rest] = projects;

  return (
    <MotionWrapper>
      <div className="max-w-[1920px] mx-auto pt-13">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          {first && (
            <div
              className={
                first.aspect === 'landscape' ? 'col-span-1 md:col-span-2' : 'col-span-1'
              }
            >
              <ProjectOpeningReveal
                image={first.image}
                aspect={first.aspect}
                caption={first.caption}
                location={first.location}
                category={first.category}
                moodTags={first.moodTags}
                frameArchetype={first.frameArchetype}
                style={first.style}
              />
            </div>
          )}
          {rest.map(({ id, image, aspect, caption }) => (
            <div
              key={id}
              className={aspect === 'landscape' ? 'col-span-1 md:col-span-2' : 'col-span-1'}
            >
              <div className={`relative w-full ${aspect === 'landscape' ? 'aspect-[16/10]' : 'aspect-[9/13]'}`}>
                <Image
                  src={image}
                  alt={caption || ''}
                  className="object-cover w-full h-full transition-opacity duration-500 ease-in-out"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                />
                {caption && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center">
                    <p
                      className="text-white text-sm md:text-xl lg:text-2xl uppercase font-extrabold tracking-[0.2em]"
                      style={{ fontFamily: 'var(--font-acaslon-pro)' }}
                    >
                      {caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </MotionWrapper>
  );
};
