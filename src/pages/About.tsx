// pages/About.tsx
import { useEffect, useState } from "react";

type About = {
    id: number;
    title: string;
    position?: string;
    image: string;
    description: string[];
    bg: string;
};

export const About = () => {
    const [about, setAbout] = useState<About[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/data/about.json");
                const data = await res.json();
                setAbout(data);
            } catch (err) {
                console.error("Failed to load about data:", err);
            }
        })();
    }, []);

    return (
        <section className="w-full max-w-[1920px] mx-auto pt-16">
            {about.map((item, index) => {
                const isReversed = index % 2 !== 0;

                return (
                    <div
                        key={item.id}
                        className={`flex flex-col md:flex-row ${
                            isReversed  ? "md:flex-row-reverse" : ""
                        } h-auto md:min-h-screen`}
                    >

                        <div
                            className={`w-full md:w-1/2 flex items-start pt-20 justify-start md:pl-[5vw] text-white ${
                                item.bg || "bg-light-beige"
                            }`}
                        >
                            <div
                                className="max-w-md space-y-6 font-all-rounder-antiqua-test-book text-[12px] tracking-[1px] opacity-100">
                                <h2 className="font-euclid-circular-b tracking-[2px] opacity-100">
                                    <span className="uppercase">{item.title}</span>

                                    {item.position && (
                                        <span className="font-euclid">, {item.position}</span>
                                    )}
                                </h2>
                                {item.description.map((para, i) => (
                                    <p key={i} className="opacity-90">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {
                            item.title === "Pyae Thiri"
                                ? (
                                    <div className="w-full md:w-1/2 bg-light-beige flex items-center justify-center p-10">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="max-w-[70%] h-auto object-contain shadow-sm"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                )
                                : (
                                    <div className="w-full md:w-1/2 h-[400px] md:h-auto">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover object-center"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                )
                        }
                    </div>
                );
            })}
        </section>
    );
};
