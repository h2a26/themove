import { MotionWrapper } from '@/shared/components/MotionWrapper';
import Image from 'next/image';
import aboutData from '@/public/data/about.json';

interface About {
  id: number;
  title: string;
  position?: string;
  image: string;
  description: string[];
  bg: string;
}

export default function AboutPage() {
  const about: About[] = aboutData;
  if (!about.length) return null;

  return (
    <>
      <MotionWrapper>
        <section className="w-full max-w-[1920px] mx-auto pt-16">
          {about.map((item, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''}
                md:h-[100vh] lg:h-[75vh] xl:h-[100vh] `}
              >
                {/* Text Content */}
                <div
                  className={`w-full md:w-1/2 flex ${
                    item.bg || 'bg-light-beige'
                  } text-white px-5 md:px-[5vw] lg:px-[4vw] py-5 md:py-[4vw] lg:py-[4vw]`}
                >
                  <div
                    className="max-w-xl space-y-6 text-sm leading-relaxed tracking-[0.5px]"
                    style={{ fontFamily: 'var(--font-allrounder-antiqua)' }}
                  >
                    <h2
                      className="tracking-[2px] uppercase text-[14px] md:text-[18px] mb-2"
                      style={{ fontFamily: 'var(--font-euclid-circular-b)' }}
                    >
                      {item.title}
                      {item.position && (
                        <span
                          className="normal-case ml-1 text-[14px]"
                          style={{ fontFamily: 'var(--font-euclid)' }}
                        >
                          , {item.position}
                        </span>
                      )}
                    </h2>

                    {item.description.map((para, i) => (
                      <p
                        key={i}
                        className="opacity-90 text-light-beige text-[13px] md:text-[15px] tracking-wide"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Image Content */}
                {item.title === 'Pyae Thiri' ? (
                  <div className="w-full md:w-1/2 flex items-center justify-center bg-light-beige p-5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="
                    w-[80%] md:w-[90%] lg:w-[90%] xl:w-[60%]
                    object-contain shadow-md"
                    />
                  </div>
                ) : (
                  <div className="w-full md:w-1/2">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-[400px] h-[300px] md:w-full md:h-[100vh] object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </MotionWrapper>
    </>
  );
}
