// components/Footer.tsx
import { InstagramLogo, YoutubeLogo, PinterestLogo } from 'phosphor-react';

export const Footer = () => {
    return (
        <footer className="bg-light-beige/80 text-deep-black text-sm px-6 md:px-16 py-12 font-footer">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Top Info Line */}
                <p className="text-center tracking-wider">
                    Sustainability and regenerative design are at the heart of everything we create at The Move.
                </p>

                <hr className="border-light-gray"/>

                {/* Contact & Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left justify-items-center">
                    <div>
                        <p className="tracking-wider">+95 256 358 744</p>
                    </div>
                    <div>
                        <p className="tracking-wider">careers@themove.co.uk</p>
                    </div>
                    <div>
                        <p className="tracking-wider">subscribe</p>
                    </div>
                </div>


                {/* Icon */}
                <div className="flex justify-center gap-4">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-7 h-7 flex items-center justify-center border border-deep-gray rounded-full transition-all duration-300 hover:border-black hover:bg-black"
                    >
                        <InstagramLogo
                            className="w-5 h-5 text-deep-gray transition-colors duration-300 group-hover:text-white"/>
                    </a>

                    <a
                        href="https://www.youtube.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-7 h-7 flex items-center justify-center border border-deep-gray rounded-full transition-all duration-300 hover:border-black hover:bg-black"
                    >
                        <YoutubeLogo
                            className="w-5 h-5 text-deep-gray transition-colors duration-300 group-hover:text-white"/>
                    </a>

                    <a
                        href="https://www.pinterest.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-7 h-7 flex items-center justify-center border border-deep-gray rounded-full transition-all duration-300 hover:border-black hover:bg-black"
                    >
                        <PinterestLogo
                            className="w-5 h-5 text-deep-gray transition-colors duration-300 group-hover:text-white"/>
                    </a>
                </div>


                {/* Bottom Line */}
                <div
                    className="text-xs text-center sm:text-left flex flex-col sm:flex-row justify-center sm:justify-between gap-2 sm:gap-4">
                    <p>© 2025 The Move Ltd. All Rights Reserved.</p>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-2">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">Terms & Conditions</a>
                        <span>|</span>
                        <span className="italic">Present For Pyae.</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

