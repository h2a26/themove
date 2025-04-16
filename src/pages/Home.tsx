// pages/Home.tsx
import {Carousel} from '../components/Carousel';
import {Section} from '../components/Section';
import {MotionWrapper} from "../components/MotionWrapper.tsx";

export const Home = () => {
    return (
        <MotionWrapper>
            <Carousel/>
            <Section
                title="Project 1"
                description="Description for project one."
                image="/slides/slide1.jpg"
            />
            <Section
                title="Project 2"
                description="Description for project two."
                image="/slides/slide2.jpg"
                reverse
            />
            <Section
                title="Project 3"
                description="Description for project one."
                image="/slides/slide3.jpg"
            />
        </MotionWrapper>
    );
};
