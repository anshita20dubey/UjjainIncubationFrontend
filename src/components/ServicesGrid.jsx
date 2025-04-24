import React from 'react';
import { motion, useInView } from 'framer-motion';

// Animation variants for sections and cards
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: i * 0.1 // Stagger effect for each card
    }
  })
};

// Reusable AnimatedSection component
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

// Animated ServiceCard component
const ServiceCard = ({ title, description, imageIndex, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.2, // Trigger when 20% of the card is visible
    once: false // Animation triggers every time the card comes into view
  });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
    >
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <div className="p-6 flex flex-col items-center">
        <div className="h-40 flex items-center justify-center">
          <img 
            src={`/images/Service${imageIndex}.png`} 
            alt={title} 
            className="max-h-40 object-contain" 
          />
        </div>
        <p className="mt-4 text-gray-600 text-center">{description}</p>
      </div>
    </motion.div>
  );
};

const ServicesGrid = () => {
  const services = [
    {
      title: "Incubation Center",
      description: "Collaborative workspace and resources for startups to grow and develop their business ideas."
    },
    {
      title: "Mentorship and Investor Connect",
      description: "Connect with experienced mentors and potential investors to help scale your business."
    },
    {
      title: "Digital Marketing Training",
      description: "Learn essential digital marketing skills to promote your products and services online."
    },
    {
      title: "Online Product Selling Platform",
      description: "Sell your products online with our easy-to-use e-commerce platform."
    },
    {
      title: "Self Help Group Support",
      description: "Community-based support groups to help entrepreneurs overcome challenges."
    },
    {
      title: "Policy Awareness",
      description: "Stay informed about relevant policies and regulations affecting your business."
    }
  ];

  return (
    <div className="py-12 px-2 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-3xl font-bold text-center mb-12 text-gray-800">
          <span className="inline-block pb-2 border-b-4 border-[#FF9933]">SERVICES</span>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              imageIndex={index + 1}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;