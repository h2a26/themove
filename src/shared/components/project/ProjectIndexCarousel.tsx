'use client';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, EffectFade, Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'phosphor-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Slide {
  id: number;
  image: string;
}

interface CarouselProps {
  slides: Slide[];
  initialIndex: number;
  onClose: () => void;
}

export function ProjectIndexCarousel(props: CarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(props.initialIndex, 0);
    }
  }, [props.initialIndex]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        loop={true}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        autoplay={{
          delay: 11000,
          disableOnInteraction: false,
        }}
        effect="fade"
        speed={1200}
        modules={[Navigation, Pagination, Keyboard, Autoplay, EffectFade]}
        className="w-full h-full"
      >
        {props.slides.map((slide, index) => (
          <SwiperSlide key={`${slide.id}-${index}`}>
            <motion.div
              className="relative w-full h-full flex items-center justify-center px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.4,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.2,
              }}
            >
              <div className="relative w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[75vw] xl:max-w-[70vw] aspect-[3/4] rounded-md overflow-hidden shadow-md border">
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation arrows — visible on all screen sizes */}
      <button
        className="custom-prev absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 z-30 opacity-80 hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer hover:scale-110"
        aria-label="Previous Slide"
      >
        <svg
          className="w-6 h-6 sm:w-6 sm:h-6 text-light-beige"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="custom-next absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 z-30 opacity-80 hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer hover:scale-110"
        aria-label="Next Slide"
      >
        <svg
          className="w-6 h-6 sm:w-6 sm:h-6 text-light-beige"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Close button */}
      <button
        onClick={props.onClose}
        aria-label="Close Carousel"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-3xl font-bold z-50 hover:scale-105 transition-transform"
      >
        <X className="hover:cursor-pointer" />
      </button>
    </div>
  );
}
