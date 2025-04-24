import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
    // Images for slider
    const sliderImages = [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&q=80",
        "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&q=80",
        "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&q=80"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Auto slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            goToNextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, [currentSlide]);

    const goToPrevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const goToNextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsTransitioning(false), 500);
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
    };

    const slideUp = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
    };

    const slideRight = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }
    };

    const buttonHover = {
        hover: { scale: 1.05, transition: { duration: 0.2 } }
    };

    return (
        <div className="relative h-screen overflow-hidden font-['Poppins',sans-serif]">
            {/* Left Section - Background Image with Overlay */}
            <div className="absolute inset-0 md:w-1/2">
                {/* Background Image with Dark Overlay */}
                <div className="relative h-full">
                    {/* Background Image */}
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&q=80")`,
                        }}
                    ></motion.div>

                    {/* Dark Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-85"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                            Empowering <span className="text-[#FF9933] bg-gradient-to-r from-[#FF9933] to-[#FF8800] bg-clip-text text-transparent">Innovation,</span> Enabling <span className="text-[#FF9933] bg-gradient-to-r from-[#FF9933] to-[#FF8800] bg-clip-text text-transparent">Growth</span>
                        </motion.h1>

                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={slideRight}
                            className="text-white text-lg mb-8 max-w-lg font-light"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                        >
                            Welcome to Ujjain Smart City Incubation Center – where ideas take shape and startups find their wings. Our mission is to support early-stage entrepreneurs with the right infrastructure, mentorship, and resources to build impactful ventures.
                        </motion.p>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={slideUp}
                            className="flex space-x-4"
                        >
                            <motion.a
                                whileHover="hover"
                                variants={buttonHover}
                                href="#"
                                className="bg-gradient-to-r from-[#FF9933] to-[#FF8800] text-white px-8 py-4 rounded-lg shadow-lg transition-all font-medium flex items-center"
                            >
                                <span>Read More</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </motion.a>

                            <motion.a
                                whileHover="hover"
                                variants={buttonHover}
                                href="#"
                                className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-3.5 rounded-lg flex items-center transition-all backdrop-blur-sm bg-white/10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                Watch Video
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Right Section - Image Slider */}
            <div className="hidden md:block absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden">
                <div className="relative h-full">
                    {/* First Slider (Top) */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden shadow-2xl">
                        <div className="relative w-full h-full">
                            {sliderImages.map((img, index) => (
                                <motion.div
                                    key={`top-${index}`}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: index === currentSlide ? 1 : 0,
                                        scale: index === currentSlide ? 1 : 1.1,
                                    }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={img}
                                        alt={`Office Space ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
                                </motion.div>
                            ))}

                            {/* Navigation Buttons */}
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <motion.button
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
                                    onClick={goToPrevSlide}
                                    className="bg-black bg-opacity-50 text-white rounded-full p-3 transition-all focus:outline-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
                                    onClick={goToNextSlide}
                                    className="bg-black bg-opacity-50 text-white rounded-full p-3 transition-all focus:outline-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Second Slider (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden shadow-2xl">
                        <div className="relative w-full h-full">
                            {sliderImages.map((img, index) => (
                                <motion.div
                                    key={`bottom-${index}`}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: (index + 1) % sliderImages.length === currentSlide ? 1 : 0,
                                        scale: (index + 1) % sliderImages.length === currentSlide ? 1 : 1.1,
                                    }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={img}
                                        alt={`Collaboration Space ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {sliderImages.map((_, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0.7 }}
                        animate={{
                            opacity: 1,
                            width: index === currentSlide ? 24 : 12,
                            backgroundColor: index === currentSlide ? '#FF9933' : 'white'
                        }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => {
                            if (!isTransitioning) {
                                setIsTransitioning(true);
                                setCurrentSlide(index);
                                setTimeout(() => setIsTransitioning(false), 500);
                            }
                        }}
                        className="h-3 rounded-full transition-all shadow-md"
                    ></motion.button>
                ))}
            </div>

            {/* Adding a floating element for visual interest */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-24 left-16 hidden md:block"
            >
                <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg border border-white/20 shadow-lg">
                    <p className="text-white font-medium">
                        <span className="text-[#FF9933] font-bold">50+</span> Startups Incubated
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Hero