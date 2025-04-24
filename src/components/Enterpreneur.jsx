import React from 'react';
import { motion, useInView } from 'framer-motion';

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

// Reusable AnimatedSection component to handle animations
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

const Entrepreneur = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-8 lg:px-4 max-w-7xl mx-auto">
      {/* Hashtag title */}
      <AnimatedSection className="text-gray-600 text-sm mb-2 font-medium">
        # Women Entrepreneur Cell
      </AnimatedSection>
      
      {/* Main content area */}
      <AnimatedSection className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Left Section - Text Content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gray-800">Women Entrepreneur</span> <span className="text-[#ff9933]">Cell</span>
          </h1>
          
          <p className="text-gray-700 leading-relaxed">
            In order to provide inspiration, enthusiasm, and support to women for starting 
            their own businesses, incubation centers play a crucial role in cities and towns. 
            Satna Incubation Center, with the objective of fulfilling these goals, is establishing 
            a Women Entrepreneurship Cell, which will help women in Satna become capable 
            in the field of entrepreneurship. It will also provide women with 
            entrepreneurship-related information, resources, and training. Here, women will 
            be given guidance, knowledge, and training for their business, including essentials 
            for startups. Additionally, the center will provide women with information about 
            financial requirements and government schemes to fulfill their financial needs.
          </p>
        </div>

        {/* Right Section - Logo */}
        <div className="flex-1 flex justify-center items-start">
          <div className="relative">
            <img 
              src="/images/women-cell.jpg" 
              alt="Women Entrepreneur Cell Logo"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Mission box */}
      <AnimatedSection className="bg-[#ff9933] text-white p-6 md:p-8 rounded mt-6">
        <h2 className="text-3xl font-bold mb-4">MISSION</h2>
        <p className="text-white leading-relaxed">
          In the global economy, the position of women is not rapidly increasing. In this changing scenario, many women do not want to work for others but instead have the 
          desire to start their own businesses. That is why several government schemes are being implemented in the country to promote entrepreneurship among women. 
          Entrepreneurship not only provides women with the opportunity to stand on their own feet but also helps in the development of the country's economy. In addition to 
          other fields, entrepreneurship is also a good option for women. It enables women to establish their identity in society.
        </p>
      </AnimatedSection>
    </div>
  );
};

export default Entrepreneur;