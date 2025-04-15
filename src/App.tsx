// App.tsx
import './App.css';
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { BrowserRouter as Router } from 'react-router-dom';

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
                <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
                <Route path="/gallery" element={<DefaultLayout><Gallery /></DefaultLayout>} />
                <Route path="/contact" element={<DefaultLayout><Contact /></DefaultLayout>} />
            </Routes>
        </AnimatePresence>
    );
};

export default App;
