// components/Carousel.tsx
import { motion } from 'framer-motion';
import {SetStateAction, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Keyboard, Autoplay, EffectFade} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface Slide {
    id: number;
    image: string;
    caption: string;
    description: string;
}

export const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const handleSlideChange = (swiper: { realIndex: SetStateAction<number> }) => {
        setFade(true);
        setTimeout(() => {
            setActiveIndex(swiper.realIndex);
            setFade(false);
        }, 600); // Slightly longer for luxury feel
    };

    const [slides, setSlides] = useState<Slide[]>([]);

    useEffect(() => {
        // IIFE pattern to avoid returning a promise from useEffect
        (async () => {
            try {
                const res = await fetch('/data/CarouselSlides.json');
                const data = await res.json();
                setSlides(data);
            } catch (err) {
                console.error('Failed to load project data:', err);
            }
        })();
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden group">
            <Swiper
                slidesPerView={1}
                loop
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                autoplay={{
                    delay: 11000, // Extended delay for grace
                    disableOnInteraction: false,
                }}
                effect="fade"
                speed={1200} // Smooth transition speed
                onSlideChange={handleSlideChange}
                modules={[Navigation, Pagination, Keyboard, Autoplay, EffectFade]}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <motion.div
                            className="relative h-screen w-full bg-center bg-cover transition-all duration-[2000ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
                            style={{ backgroundImage: `url(${slide.image})` }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1.4,
                                ease: [0.43, 0.13, 0.23, 0.96],
                                delay: index * 0.3,
                            }}
                        >
                            <div className="absolute inset-0 bg-black/40 z-10" />
                            <div
                                className={`
                                    absolute bottom-24 md:bottom-32 left-0 right-0 px-4 md:px-16 text-center z-20 text-light-beige
                                    transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    ${index === activeIndex && !fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                                `}
                                style={{
                                    transitionDelay: `${index === activeIndex && !fade ? 300 : 0}ms`,
                                }}
                            >
                                <h2 className="text-2xl md:text-2xl mb-4 drop-shadow-md text-gold
                                 uppercase font-adobe-caslon-pro font-[800] text-[16px] tracking-[4px]
                                 transition-opacity duration-1000 ease-in-out">
                                    {slide.caption}
                                </h2>
                                <p
                                    className="text-sm text-light-beige max-w-3xl mx-auto leading-relaxed font-euclid-circular-b font-[100] text-[12px] tracking-[1px] transition-opacity duration-1000 ease-in-out delay-300"
                                    style={{
                                        transitionDelay: `${index === activeIndex && !fade ? 700 : 0}ms`,
                                    }}
                                >
                                    {slide.description}
                                </p>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Arrows */}
            <button className="custom-prev absolute top-1/2 left-6 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer hover:scale-110">
                <svg className="w-6 h-6 text-light-beige" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button className="custom-next absolute top-1/2 right-6 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer hover:scale-110">
                <svg className="w-6 h-6 text-light-beige" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};
