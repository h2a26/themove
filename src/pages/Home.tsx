import { motion } from 'framer-motion';
import {Carousel} from '../components/Carousel';
import {Section} from '../components/Section';

export const Home = () => {
    return (
        <>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1, ease: 'easeInOut'}}
            >
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

            </motion.div>
            </>
            );
            };
