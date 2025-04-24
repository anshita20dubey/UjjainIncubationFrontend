import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header1 from '../components/Header1';
import pageData from './serviceData.json'; // Centralized JSON data

const Startups = () => {
  const servicesData = pageData.pages.startups; // Access startups page data

  // Animation variants for smooth, elegant transitions
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const subtleFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Header1 title={servicesData.title} breadcrumbs={servicesData.breadcrumbs} />

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            className="max-w-2xl mx-auto text-center p-10 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-4xl font-semibold text-gray-800 mb-5"
              variants={subtleFadeUp}
            >
              Launch Your Startup with Us
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg mx-auto"
              variants={subtleFadeUp}
            >
              Got a brilliant idea? We're here to help it soar! Join Ujjain Incubation Center to turn your vision into reality and be part of our growing startup community.
            </motion.p>
            <motion.a
              href="/startup-register"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-orange-600 transition-colors duration-200"
              variants={subtleFadeUp}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 6px 20px rgba(255, 153, 51, 0.3)',
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Startups;