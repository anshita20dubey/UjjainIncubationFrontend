import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Ecosystem = () => {
    const scrollRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Animation controls
    const headingControls = useAnimation();
    const carouselControls = useAnimation();

    // InView hooks
    const [headingRef, headingInView] = useInView({
        threshold: 0.3,
        triggerOnce: false,
    });

    const [carouselRef, carouselInView] = useInView({
        threshold: 0.3,
        triggerOnce: false,
    });

    // Trigger animations when elements come into view
    useEffect(() => {
        if (headingInView) {
            headingControls.start('visible');
        }
    }, [headingControls, headingInView]);

    useEffect(() => {
        if (carouselInView) {
            carouselControls.start('visible');
        }
    }, [carouselControls, carouselInView]);

    // Content for the carousel
    const carouselItems = [
        {
            content: "We provide the access to various network including peer-to-peer network, customer network and investor network to startups",
            title: "Networking Opportunities"
        },
        {
            content: "Access mentorship and guidance from experienced entrepreneurs and industry experts to navigate challenges and scale effectively",
            title: "Expert Mentorship"
        },
        {
            content: "Connect with potential investors and funding opportunities tailored for mission-driven ventures seeking capital",
            title: "Funding Access"
        },
        {
            content: "Utilize shared resources, tools, and technologies that can help accelerate your growth journey",
            title: "Resource Sharing"
        }
    ];

    const totalItems = carouselItems.length;

    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % totalItems;
        setCurrentIndex(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        setCurrentIndex(prevIndex);
    };

    // Animation variants
    const headingVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const carouselVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };

    const slideVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: {
                ease: "easeIn",
                duration: 0.3
            }
        }
    };

    return (
        <div className="py-16 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    ref={headingRef}
                    variants={headingVariants}
                    initial="hidden"
                    animate={headingControls}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                    ease: "easeOut"
                                }
                            }
                        }}
                    >
                        An eco-system of resources, connections, knowledge
                    </motion.h2>
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-8 text-gray-800"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                    delay: 0.2,
                                    ease: "easeOut"
                                }
                            }
                        }}
                    >
                        & talent to support mission driven entrepreneurs to scale in their venture.
                    </motion.h2>
                </motion.div>

                <motion.div
                    className="relative"
                    ref={carouselRef}
                    variants={carouselVariants}
                    initial="hidden"
                    animate={carouselControls}
                >
                    <div className="flex items-center justify-center mb-4">
                        <motion.button
                            onClick={prevSlide}
                            className={`p-2 rounded-full bg-gray-100 hover:bg-gray-200 mr-4 ${currentIndex === 0 ? 'opacity-50' : ''}`}
                            aria-label="Previous slide"
                            whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronLeft className="text-gray-700" size={24} />
                        </motion.button>

                        <div className="relative overflow-hidden w-full max-w-2xl">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 12
                                    }
                                }}
                                exit={{ opacity: 0, x: -50 }}
                                className="bg-[#ff9933] text-white py-8 px-6 rounded-lg text-center"
                            >
                                <motion.p
                                    className="mb-4 text-lg"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.1,
                                            duration: 0.4
                                        }
                                    }}
                                >
                                    {carouselItems[currentIndex].content}
                                </motion.p>
                                <motion.h3
                                    className="text-xl font-semibold"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.2,
                                            duration: 0.4
                                        }
                                    }}
                                >
                                    {carouselItems[currentIndex].title}
                                </motion.h3>
                            </motion.div>
                        </div>

                        <motion.button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 ml-4"
                            aria-label="Next slide"
                            whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronRight className="text-gray-700" size={24} />
                        </motion.button>
                    </div>

                    {/* Indicator dots */}
                    <div className="flex justify-center mt-4">
                        {carouselItems.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index ? 'bg-green-500' : 'bg-gray-300'}`}
                                aria-label={`Go to slide ${index + 1}`}
                                whileHover={{ scale: 1.5 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        delay: 0.4 + (index * 0.1),
                                        duration: 0.3
                                    }
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Ecosystem;