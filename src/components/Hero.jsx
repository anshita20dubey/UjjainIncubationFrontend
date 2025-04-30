import React, { useState, useEffect } from 'react';

// Simple animation utility
const useAnimationClass = (initialState = false, delay = 0) => {
  const [isActive, setIsActive] = useState(initialState);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isActive;
};

const Hero = () => {
    // Images for slider
    const sliderImages = [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&q=80',
        'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&q=80',
        'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&q=80',
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

    // Animation states
    const titleVisible = useAnimationClass(false, 300);
    const subtitleVisible = useAnimationClass(false, 600);
    const buttonsVisible = useAnimationClass(false, 900);
    const bgVisible = useAnimationClass(false, 100);
    
    return (
        <div className="relative font-sans overflow-hidden">
            {/* Main Content Container */}
            <div className="flex flex-col lg:flex-row h-screen">
                {/* Left Section - Text Content with Background */}
                <div className="relative w-full lg:w-1/2 h-full min-h-[60vh] lg:min-h-full flex items-center">
                    {/* Background Image with Animation */}
                    <div 
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
                            bgVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
                        }`}
                        style={{
                            backgroundImage: `url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1700&q=80")`,
                        }}
                    ></div>

                    {/* Dark Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50"></div>

                    {/* Text Content */}
                    <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-2xl mx-auto lg:mx-0">
                        <h1 className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight transition-all duration-700 ${
                            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            Empowering <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Innovation,</span>
                            <br />
                            Enabling <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Growth</span>
                        </h1>

                        <p className={`text-white/90 text-base md:text-lg mb-8 max-w-md font-light transition-all duration-700 delay-300 ${
                            subtitleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}>
                            Welcome to Ujjain Smart City Incubation Center – where ideas take shape and startups find their wings. Our mission is to support early-stage entrepreneurs with the right infrastructure, mentorship, and resources.
                        </p>

                        <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-500 ${
                            buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <a
                                href="#"
                                className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-lg shadow-lg font-medium flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
                            >
                                <span>Read More</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>

                            <a
                                href="#"
                                className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Watch Video
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Section - Image Slider */}
                <div className="relative w-full lg:w-1/2 h-[40vh] sm:h-[50vh] lg:h-full">
                    <div className="grid grid-rows-2 h-full">
                        {/* Top Image */}
                        <div className="relative overflow-hidden">
                            {sliderImages.map((img, index) => (
                                <div
                                    key={`top-${index}`}
                                    className={`absolute inset-0 transition-all duration-700 ${
                                        index === currentSlide 
                                            ? 'opacity-100 scale-100' 
                                            : 'opacity-0 scale-110'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Space ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-7000 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Image */}
                        <div className="relative overflow-hidden">
                            {sliderImages.map((img, index) => (
                                <div
                                    key={`bottom-${index}`}
                                    className={`absolute inset-0 transition-all duration-700 ${
                                        (index + 1) % sliderImages.length === currentSlide 
                                            ? 'opacity-100 scale-100' 
                                            : 'opacity-0 scale-110'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Space ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-7000 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                </div>
                            ))}
                        </div>

                        {/* Slider Controls */}
                        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                            <button
                                onClick={goToPrevSlide}
                                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 focus:outline-none pointer-events-auto hover:scale-110 hover:shadow-lg"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={goToNextSlide}
                                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 focus:outline-none pointer-events-auto hover:scale-110 hover:shadow-lg"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {sliderImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (!isTransitioning) {
                                setIsTransitioning(true);
                                setCurrentSlide(index);
                                setTimeout(() => setIsTransitioning(false), 500);
                            }
                        }}
                        className={`h-2 rounded-full transition-all duration-300 shadow-md ${
                            index === currentSlide 
                                ? 'w-6 bg-orange-400 scale-110' 
                                : 'w-2 bg-white hover:scale-110'
                        }`}
                    ></button>
                ))}
            </div>
            
            {/* Animated Overlay Element - Bottom Gradient */}
            <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent z-10 transition-opacity duration-1000 ${
                bgVisible ? 'opacity-100' : 'opacity-0'
            }`}></div>
        </div>
    );
};

export default Hero;