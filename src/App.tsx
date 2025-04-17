// App.tsx

import { Routes, Route, useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import {Commercial} from "./pages/project_category/Commercial.tsx";
import {Hospitality} from "./pages/project_category/Hospitality.tsx";
import {Residential} from "./pages/project_category/Residential.tsx";
import {ScrollAwareNavbar} from "./components/ScrollAwareNavbar.tsx";
import {Projects} from "./pages/projects/Projects.tsx";
import {Project_StGermainGrandApartment} from "./pages/project/Project_StGermainGrandApartment.tsx";
import {Project_SanFranciscoApartment} from "./pages/project/Project_SanFranciscoApartment.tsx";
import {SmoothScrollProvider} from "./components/SmoothScrollProvider.tsx";
import {Project_MayfairPiedATerre} from "./pages/project/Project_MayfairPiedATerre.tsx";
import {PageNotFound} from "./pages/PageNotFound.tsx";

function App() {
    return (
        <Router>
            <SmoothScrollProvider>
                <AnimatedRoutes />
            </SmoothScrollProvider>
        </Router>
    );
}

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<DefaultLayout navbar={<ScrollAwareNavbar />}><Home /></DefaultLayout>} />

                <Route path="/project_category/commercial" element={<DefaultLayout><Commercial /></DefaultLayout>} />
                <Route path="/project_category/hospitality" element={<DefaultLayout><Hospitality /></DefaultLayout>} />
                <Route path="/project_category/residential" element={<DefaultLayout><Residential /></DefaultLayout>} />

                <Route path="/projects" element={<DefaultLayout><Projects /></DefaultLayout>} />
                <Route path="/gallery" element={<DefaultLayout><Gallery /></DefaultLayout>} />
                <Route path="/contact" element={<DefaultLayout><Contact /></DefaultLayout>} />

                <Route path="/projects/st-germain-grand-apartment" element={<DefaultLayout><Project_StGermainGrandApartment /></DefaultLayout>} />
                <Route path="/projects/san-francisco-apartment" element={<DefaultLayout><Project_SanFranciscoApartment /></DefaultLayout>} />
                <Route path="/projects/mayfair-pied-a-terre" element={<DefaultLayout><Project_MayfairPiedATerre /></DefaultLayout>} />

                {/* Fallback route */}
                <Route path="*" element={<DefaultLayout><PageNotFound /></DefaultLayout>} />

            </Routes>
        </AnimatePresence>
    );
};

export default App;
