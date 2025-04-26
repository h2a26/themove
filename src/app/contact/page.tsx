import { MotionWrapper } from '@/shared/components/MotionWrapper';
import Image from 'next/image';
import contactData from '@/public/data/contact.json';

export default function ContactPage() {
  const {
    image,
    address,
    telephone,
    generalEnquiries,
    newBusinessEnquiries,
    careers,
  } = contactData[0];

  return (
    <>
      <MotionWrapper>
        <section className="w-full max-w-[1920px] mx-auto pt-16 overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-screen md:min-h-[75vh] lg:min-h-[75vh] xl:min-h-screen">

            {/* Image Section */}
            {/* Image Section */}
            <div className="relative w-full h-[70vh] md:w-1/2 md:h-auto aspect-[3/4] md:aspect-auto">
              <Image
                src={image}
                alt="Contact Image"
                priority
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>


            {/* Text Section */}
            <div className="w-full md:w-1/2 flex bg-deep-chocolate text-light-beige px-5 md:px-[5vw] lg:px-[4vw] py-5 md:py-[4vw] lg:py-[4vw]">
              <div
                className="max-w-xl space-y-6 text-sm leading-relaxed tracking-[0.5px]"
                style={{ fontFamily: 'var(--font-allrounder-antiqua)' }}
              >
                {[
                  { title: 'Address', content: address },
                  { title: 'Telephone', content: telephone },
                  { title: 'General Enquiries', content: generalEnquiries },
                  { title: 'New Business Enquiries', content: newBusinessEnquiries },
                  { title: 'Careers', content: careers },
                ].map(({ title, content }, index) => (
                  <div key={index} className="space-y-1">
                    <h2
                      className="uppercase tracking-wider text-sm sm:text-base"
                      style={{ fontFamily: 'var(--font-euclid-circular-b)' }}
                    >
                      {title}
                    </h2>
                    <p
                      className="tracking-wider"
                      style={{ fontFamily: 'var(--font-euclid)' }}
                    >
                      {content}
                    </p>
                    {title === 'Address' && (
                      <p
                        className="mt-2 text-sm"
                        style={{ fontFamily: 'var(--font-euclid)' }}
                      >
                        We’re open Monday – Friday, 9am – 5pm
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </MotionWrapper>
    </>
  );
}
