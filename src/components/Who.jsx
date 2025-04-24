import React, { useState, useEffect } from 'react'
import { Lightbulb, Users, Rocket, Target } from 'lucide-react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef } from 'react'

const Who = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const targetNumbers = [120, 100, 300, 50];

  // Create refs for scroll detection
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  // Animation controls
  const contentControls = useAnimation();
  const statsControls = useAnimation();

  // Modified settings to trigger animations much earlier
  const contentInView = useInView(contentRef, {
    once: false,
    amount: 0.02, // Trigger when just 5% is visible (reduced from 10%)
    margin: "0px 0px -300px 0px" // Increased negative margin to trigger much earlier
  });

  const statsInView = useInView(statsRef, {
    once: false,
    amount: 0.02, // Reduced to 5%
    margin: "0px 0px -300px 0px" // Increased negative margin
  });

  // Handle content animations based on viewport
  useEffect(() => {
    if (contentInView) {
      contentControls.start("visible");
    } else {
      contentControls.start("hidden");
    }
  }, [contentInView, contentControls]);

  // Handle stats animations based on viewport
  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
      // Start counters when coming into view
      resetCounters();
    } else {
      statsControls.start("hidden");
      // Reset counters when section leaves viewport
      setCounters([0, 0, 0, 0]);
    }
  }, [statsInView, statsControls]);

  // Counter animation - faster counting
  useEffect(() => {
    if (statsInView) {
      const interval = setInterval(() => {
        setCounters(prev => {
          const newCounters = [...prev];
          let completed = true;

          for (let i = 0; i < targetNumbers.length; i++) {
            if (newCounters[i] < targetNumbers[i]) {
              // Increased increment speed for faster counting
              const increment = Math.max(1, Math.ceil(targetNumbers[i] / 20)); // Even faster increment
              newCounters[i] = Math.min(newCounters[i] + increment, targetNumbers[i]);
              if (newCounters[i] < targetNumbers[i]) completed = false;
            }
          }

          if (completed) clearInterval(interval);
          return newCounters;
        });
      }, 15); // Even faster interval (from 20ms to 15ms)

      return () => clearInterval(interval);
    }
  }, [statsInView]);

  // Reset counters function
  const resetCounters = () => {
    setCounters([0, 0, 0, 0]);
  };

  // Animation variants - faster durations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08, // Faster staggering (from 0.1)
        duration: 0.4 // Faster fade in (from 0.5)
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 }, // Reduced y distance
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" } // Even faster animation
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1, // Reduced delay
        when: "beforeChildren"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.03, opacity: 0 }, // Further reduced scale
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" } // Faster animation
    }
  };

  const borderVariants = {
    hidden: { x: 0, y: 0, opacity: 0 },
    visible: {
      x: 16,
      y: 16,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.2 } // Reduced delay more
    }
  };

  const statsContainerVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced movement distance
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Faster animation
        when: "beforeChildren",
        staggerChildren: 0.06 // Faster staggering
      }
    }
  };

  const statsItemVariants = {
    hidden: { scale: 0.97, opacity: 0 }, // Less scale change for faster appearance
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" } // Even faster animation
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-16">
        {/* Header and Content */}
        <motion.div
          ref={contentRef}
          className="flex flex-col lg:flex-row gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={contentControls}
        >
          {/* Left side: Text Content */}
          <motion.div className="lg:w-1/2" variants={itemVariants}>
            <motion.h2
              className="text-sm text-[#ff9933] font-medium mb-2"
              variants={itemVariants}
            >
              # Nurturing the Next Generation of Innovators
            </motion.h2>

            <div className="flex items-end gap-3 mb-6">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-800"
                variants={itemVariants}
              >
                WHO
              </motion.h1>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-[#ff9933]"
                variants={itemVariants}
              >
                WE ARE
              </motion.h1>
            </div>

            <motion.p
              className="text-gray-700 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              Ujjain Smart City Incubation Center (USIC) is an initiative under the Ujjain Smart City project, designed to foster innovation and entrepreneurship in Madhya Pradesh. We aim to provide a vibrant ecosystem for startups to grow, network, and succeed. With modern infrastructure and strong support from industry mentors, USIC is the ideal launchpad for startups looking to make a difference.
            </motion.p>

            <motion.button
              className="bg-[#ff9933] text-white py-3 px-8 rounded shadow-md"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#e88a2a",
                boxShadow: "0 10px 15px -3px rgba(255, 153, 51, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
            </motion.button>
          </motion.div>

          {/* Right side: Image with animation */}
          <motion.div
            className="lg:w-1/2"
            variants={imageContainerVariants}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 border-4 border-[#ff9933] rounded-lg"
                variants={borderVariants}
              ></motion.div>
              <div className="relative z-10 w-full h-full overflow-hidden rounded-lg">
                <motion.img
                  src="/images/who.jpg"
                  alt="Entrepreneurs with digital devices showing startup concepts"
                  className="w-full object-cover rounded-lg"
                  variants={imageVariants}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="bg-gray-900 rounded-lg text-white p-8 md:p-12 mt-16"
          variants={statsContainerVariants}
          initial="hidden"
          animate={statsControls}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <motion.div
              className="flex flex-col items-center text-center"
              variants={statsItemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="bg-gray-800 p-4 rounded-full mb-4"
                whileHover={{
                  boxShadow: "0 0 20px 5px rgba(255, 153, 51, 0.2)",
                  transition: { duration: 0.2 }
                }}
                animate={statsInView ? {
                  scale: [1, 1.05, 1],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2 // Faster pulse
                  }
                } : { scale: 1 }}
              >
                <Rocket className="text-[#ff9933]" size={40} />
              </motion.div>
              <motion.h2 className="text-4xl font-bold mb-2">
                {counters[0]}
              </motion.h2>
              <p className="text-gray-300">Startup Seating</p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              className="flex flex-col items-center text-center"
              variants={statsItemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="bg-gray-800 p-4 rounded-full mb-4"
                whileHover={{
                  boxShadow: "0 0 20px 5px rgba(255, 153, 51, 0.2)",
                  transition: { duration: 0.2 }
                }}
                animate={statsInView ? {
                  scale: [1, 1.05, 1],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2,
                    delay: 0.1
                  }
                } : { scale: 1 }}
              >
                <Users className="text-[#ff9933]" size={40} />
              </motion.div>
              <motion.h2 className="text-4xl font-bold mb-2">
                {counters[1]}
              </motion.h2>
              <p className="text-gray-300">Mentors Connected</p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              className="flex flex-col items-center text-center"
              variants={statsItemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="bg-gray-800 p-4 rounded-full mb-4"
                whileHover={{
                  boxShadow: "0 0 20px 5px rgba(255, 153, 51, 0.2)",
                  transition: { duration: 0.2 }
                }}
                animate={statsInView ? {
                  scale: [1, 1.05, 1],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2,
                    delay: 0.2
                  }
                } : { scale: 1 }}
              >
                <Lightbulb className="text-[#ff9933]" size={40} />
              </motion.div>
              <motion.h2 className="text-4xl font-bold mb-2">
                {counters[2]}
              </motion.h2>
              <p className="text-gray-300">Startup Applications Received</p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              className="flex flex-col items-center text-center"
              variants={statsItemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="bg-gray-800 p-4 rounded-full mb-4"
                whileHover={{
                  boxShadow: "0 0 20px 5px rgba(255, 153, 51, 0.2)",
                  transition: { duration: 0.2 }
                }}
                animate={statsInView ? {
                  scale: [1, 1.05, 1],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2,
                    delay: 0.3
                  }
                } : { scale: 1 }}
              >
                <Target className="text-[#ff9933]" size={40} />
              </motion.div>
              <motion.h2 className="text-4xl font-bold mb-2">
                {counters[3]}
              </motion.h2>
              <p className="text-gray-300">MoU with Institutions</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Who