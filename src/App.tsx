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

function App() {
    return (
        <Router>
            <AnimatedRoutes />
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

                <Route path="/gallery" element={<DefaultLayout><Gallery /></DefaultLayout>} />
                <Route path="/contact" element={<DefaultLayout><Contact /></DefaultLayout>} />
            </Routes>
        </AnimatePresence>
    );
};

export default App;
