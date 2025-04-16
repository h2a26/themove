import { motion } from 'framer-motion';
import {SetStateAction, useState} from 'react';
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

const slides: Slide[] = [
    {
        id: 1,
        image: '/slides/slide1.jpg',
        caption: 'Elevated Minimalism',
        description:
            'Nestled along the Brooklyn Waterfront, overlooking the East River and Manhattan Skyline, this penthouse is one of its kind. New York’s industrial vibe meets soft minimalism in this urban retreat above the vibrating city.',
    },
    {
        id: 2,
        image: '/slides/slide2.jpg',
        caption: 'Crafted Spaces',
        description:
            'A carefully composed getaway that embraces calmness and connection to nature through tactile textures and earthy tones.',
    },
    {
        id: 3,
        image: '/slides/slide3.jpg',
        caption: 'Architecture in Motion',
        description:
            'A seamless interplay of light, geometry, and fluid transitions designed to evoke serenity and modern elegance.',
    },
    {
        id: 4,
        image: '/slides/slide4.jpg',
        caption: 'Elevated Minimalism',
        description:
            'Nestled along the Brooklyn Waterfront, overlooking the East River and Manhattan Skyline, this penthouse is one of its kind. New York’s industrial vibe meets soft minimalism in this urban retreat above the vibrating city.',
    },
    {
        id: 5,
        image: '/slides/slide5.jpg',
        caption: 'Crafted Spaces',
        description:
            'A carefully composed getaway that embraces calmness and connection to nature through tactile textures and earthy tones.',
    },
    {
        id: 6,
        image: '/slides/slide6.jpg',
        caption: 'Architecture in Motion',
        description:
            'A seamless interplay of light, geometry, and fluid transitions designed to evoke serenity and modern elegance.',
    },
    {
        id: 7,
        image: '/slides/slide7.jpg',
        caption: 'Crafted Spaces',
        description:
            'A carefully composed getaway that embraces calmness and connection to nature through tactile textures and earthy tones.',
    },
    {
        id: 8,
        image: '/slides/slide8.jpg',
        caption: 'Architecture in Motion',
        description:
            'A seamless interplay of light, geometry, and fluid transitions designed to evoke serenity and modern elegance.',
    },
];

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

    return (
        <div className="relative w-full h-screen overflow-hidden group font-sans">
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
                                duration: 1.2,
                                ease: 'easeOut',
                                delay: index * 0.3,
                            }}
                        >
                            <div className="absolute inset-0 bg-black/40 z-10" />
                            <div
                                className={`
                                    absolute bottom-24 md:bottom-32 left-0 right-0 px-4 md:px-16 text-center z-20 text-white
                                    transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    ${index === activeIndex && !fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                                `}
                                style={{
                                    transitionDelay: `${index === activeIndex && !fade ? 300 : 0}ms`,
                                }}
                            >
                                <h2 className="text-2xl md:text-4xl font-light mb-4 drop-shadow-md tracking-wide text-[#f6f0de] font-caption transition-opacity duration-1000 ease-in-out">
                                    {slide.caption}
                                </h2>
                                <p
                                    className="text-sm md:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed font-description transition-opacity duration-1000 ease-in-out delay-300"
                                    style={{
                                        transitionDelay: `${index === activeIndex && !fade ? 500 : 0}ms`,
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
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button className="custom-next absolute top-1/2 right-6 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};
