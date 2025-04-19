// Contact.tsx
import { MotionWrapper } from "../components/MotionWrapper.tsx";

export const Contact = () => {
    return (
        <MotionWrapper>
            <section className="max-w-[1920px] mx-auto pt-16 min-h-screen h-screen grid md:grid-cols-2">
                {/* Left Image */}
                <div className="relative h-full w-full overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1684941267070-3389a63463e1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="the-eiffel-tower-towering-over-the-city-of-paris"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* Right Contact Info */}
                <div className="bg-pitaung-chuak text-white flex items-center h-full">
                    <div className="max-w-xl w-full mx-auto px-6 md:px-20 text-sm leading-relaxed space-y-8">
                        <div>
                            <h2 className="uppercase opacity-70 mb-1 font-euclid-circular-b tracking-wider">Address</h2>
                            <p className="font-euclid tracking-wider">
                                Cherry Road<br />
                                Pyin Oo Lwin<br />
                            </p>
                            <p className="mt-2 text-md opacity-60 font-euclid">We’re open Monday – Friday, 9:30am – 6pm</p>
                        </div>

                        <div>
                            <h2 className="uppercase opacity-70 mb-1 font-euclid-circular-b tracking-wider">Telephone</h2>
                            <p className="font-euclid tracking-wider">+95 256 358 744</p>
                        </div>

                        <div>
                            <h2 className="uppercase opacity-70 mb-1 font-euclid-circular-b tracking-wider">General Enquiries</h2>
                            <p className="font-euclid tracking-wider">themovearchids@gmail.com</p>
                        </div>

                        <div>
                            <h2 className="uppercase opacity-70 mb-1 font-euclid-circular-b tracking-wider">New Business Enquiries</h2>
                            <p className="font-euclid tracking-wider">workwithus@themove.com</p>
                        </div>

                        <div>
                            <h2 className="uppercase opacity-70 mb-1 font-euclid-circular-b tracking-wider">Careers</h2>
                            <p className="font-euclid tracking-wider">careers@themove.com</p>
                        </div>

                    </div>
                </div>
            </section>
        </MotionWrapper>
    );
};
