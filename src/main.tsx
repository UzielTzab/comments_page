import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { FeedbackZone } from "./assets/pages/FeedbackZone";
import { LoginForm } from "./assets/pages/LoginForm";
import { SingForm } from "./assets/pages/SignForm";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <RoutesComponent />
    </Router>
  </StrictMode>
);


function RoutesComponent() {


  const location = useLocation();


  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, x: 300 }} // Comienza desde la derecha
            animate={{ opacity: 1, x: 0 }} // Termina en su posición original
            exit={{ opacity: 0, x: 300 }} // Sale por la izquierda
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <LoginForm />
          </motion.div>
        } />
        <Route path="/FeedbackPage" element={
          <motion.div
            initial={{ opacity: 0, y: 300, rotateX: 90 }} // Comienza desde la parte inferior y "acostada"
            animate={{ opacity: 1, y: 0, rotateX: 0 }} // Termina en su posición original y "de pie"
            exit={{ opacity: 0, y: -300, rotateX: -90 }} // Sale por la parte superior y "acostada"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <FeedbackZone />
          </motion.div>
        } />
        <Route path="/SingForm" element={
          <motion.div
            initial={{ opacity: 0, y: 300, rotateX: 90 }} // Comienza desde la parte inferior y "acostada"
            animate={{ opacity: 1, y: 0, rotateX: 0 }} // Termina en su posición original y "de pie"
            exit={{ opacity: 0, y: -300, rotateX: -90 }} // Sale por la parte superior y "acostada"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <SingForm />
          </motion.div>
        } />
        <Route path="/LoginForm" element={
          <motion.div
            initial={{ opacity: 0, y: 300, rotateX: 90 }} // Comienza desde la parte inferior y "acostada"
            animate={{ opacity: 1, y: 0, rotateX: 0 }} // Termina en su posición original y "de pie"
            exit={{ opacity: 0, y: -300, rotateX: -90 }} // Sale por la parte superior y "acostada"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <LoginForm />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}
