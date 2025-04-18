// pages/PageNotFound.tsx
import { MotionWrapper } from "../components/MotionWrapper.tsx";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
    return (
        <MotionWrapper>
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
                <h1 className="text-4xl font-light tracking-wide text-deep-black">
                    404 – Page Not Found
                </h1>

                <Link
                    to="/"
                    className="mt-8 inline-block px-6 py-2 border border-black text-black hover:bg-black hover:text-light-beige transition-all duration-300 rounded-2xl text-sm uppercase tracking-wider"
                >
                    Go Home
                </Link>
            </div>
        </MotionWrapper>
    );
};
