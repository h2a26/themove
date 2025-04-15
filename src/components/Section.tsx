// Interface for the component props
import {JSX} from "react";

interface SectionProps {
    title: string;
    description: string;
    image: string;
    reverse?: boolean;
}

// Functional component with explicit prop types and destructuring
export const Section = ({ title, description, image, reverse = false }: SectionProps): JSX.Element => {
    return (
        <section
            className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center my-12`}
        >
            <div className="md:w-1/2 p-6">
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-700">{description}</p>
            </div>
            <div className="md:w-1/2">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-auto object-cover"
                />
            </div>
        </section>
    );
};
