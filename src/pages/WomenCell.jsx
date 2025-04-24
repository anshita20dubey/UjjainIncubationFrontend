import React from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header1 from '../components/Header1';
import Enterpreneur from '../components/Enterpreneur';
import ServicesGrid from '../components/ServicesGrid';
import JoinForm from '../components/JoinForm';
import pageData from './serviceData.json'; // Import the centralized JSON file

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    }
  }
};

// Reusable Section component to handle animations
const AnimatedSection = ({ children, className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.2, // Trigger when 20% of the section is visible
    once: false // Animation triggers every time the section comes into view
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={sectionVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const WomenCell = () => {
  const servicesData = pageData.pages.womencell; // Access the women cell page data

  return (
    <>
      <Navbar />
      <AnimatedSection>
        <Header1 title={servicesData.title} breadcrumbs={servicesData.breadcrumbs} />
      </AnimatedSection>
      <AnimatedSection>
        <Enterpreneur />
      </AnimatedSection>
      <AnimatedSection>
        <ServicesGrid />
      </AnimatedSection>
      <AnimatedSection>
        <JoinForm />
      </AnimatedSection>
      <Footer />
    </>
  );
};

export default WomenCell;