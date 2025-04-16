import {Carousel} from '../components/Carousel';
import {Section} from '../components/Section';
import {Motion} from "../components/Motion.tsx";

export const Home = () => {
    return (
        <Motion>
            <Carousel/>
            <Section
                title="Project One"
                description="Description for project one."
                image="/images/project1.jpg"
            />
            <Section
                title="Project Two"
                description="Description for project two."
                image="/images/project2.jpg"
                reverse
            />
        </Motion>
    );
};
