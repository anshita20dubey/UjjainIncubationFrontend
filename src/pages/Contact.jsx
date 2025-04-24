import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header1 from '../components/Header1';
import pageData from './serviceData.json'; // Centralized JSON data

const Contact = () => {
  const servicesData = pageData.pages.contact; // Access contact page data

  // Animation variants for smooth, professional transitions
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

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Header1 title={servicesData.title} breadcrumbs={servicesData.breadcrumbs} />

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h2
            className="text-4xl font-semibold text-center text-gray-800 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={fadeIn}
          >
            Connect With Us
          </motion.h2>

          <motion.p
            className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={subtleFadeUp}
          >
            Have an idea or want to collaborate? Reach out to learn more about our programs and opportunities.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerCards}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* Address Card */}
            <motion.div
              className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={cardAnimation}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-orange-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Our Address</h3>
              <p className="text-gray-600 leading-relaxed">
                Ujjain Incubation Center
                <br />
                Samrat Vikramaditya Complex
                <br />
                Kothi Palace Road, Ujjain, MP 456010
              </p>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={cardAnimation}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-orange-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Call Us</h3>
              <a
                href="tel:+919876543210"
                className="text-gray-600 hover:text-orange-500 transition-colors duration-200"
              >
                +91-9876543210
              </a>
            </motion.div>

            {/* Email Card */}
            <motion.div
              className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={cardAnimation}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-orange-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Email Us</h3>
              <a
                href="mailto:connect@ujjainincubation.org"
                className="text-gray-600 hover:text-orange-500 transition-colors duration-200"
              >
                connect@ujjainincubation.org
              </a>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={subtleFadeUp}
          >
            <motion.a
              href="/startup-register"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-orange-600 transition-colors duration-200"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 6px 20px rgba(255, 153, 51, 0.3)',
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              Join Our Incubation Program
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;