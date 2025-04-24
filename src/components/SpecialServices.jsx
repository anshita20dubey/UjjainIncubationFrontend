import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SpecialServices = () => {
    const services = [
        {
            title: 'Startup Incubation',
            description: 'We incubate early-stage startups with high growth potential and innovative ideas, guiding them through their entrepreneurial journey.',
            imageSrc: "/images/Special7.png",
            imageAlt: "People climbing green steps with helping hands"
        },
        {
            title: 'Expert Mentorship',
            description: 'Personalized guidance from experienced mentors and domain experts to help startups refine their strategies and scale effectively.',
            imageSrc: "/images/Special1.png",
            imageAlt: "People climbing green steps with helping hands"
        },
        {
            title: 'Prototype Development Lab',
            description: 'Facilities for rapid prototyping and product testing to help startups move from concept to reality faster.',
            imageSrc: "/images/Special2.png",
            imageAlt: "Person standing next to a green rocket"
        },
        {
            title: 'Funding Support',
            description: 'Connections with investors, angel networks, and grant agencies to facilitate early-stage funding.',
            imageSrc: "/images/Special3.png",
            imageAlt: "Light bulb held by green hands representing ideas"
        },
        {
            title: 'Co-working Space',
            description: 'State-of-the-art, fully furnished workspace accommodating up to 30 startups (120 individuals), with high-speed internet and essential facilities.',
            imageSrc: "/images/Special4.png",
            imageAlt: "People sitting around a table discussing ideas"
        },
        {
            title: 'Marketing Assistance',
            description: 'Support with branding, digital marketing, and go-to-market strategies to reach the right audience.',
            imageSrc: "/images/Special5.png",
            imageAlt: "Two women analyzing business growth charts"
        },
        {
            title: 'Technology Support',
            description: 'Assistance in adopting and integrating the right technologies at every stage of product development.',
            imageSrc: "/images/Special6.png",
            imageAlt: "Person working at a desk with prototype tools"
        },
        {
            title: 'Legal & Compliance',
            description: 'Access to legal experts to help with company formation, intellectual property, contracts, and more.',
            imageSrc: "/images/Special8.png",
            imageAlt: "Two women analyzing business growth charts"
        }
    ];

    // Animation for the header section
    const headerControls = useAnimation();
    const [headerRef, headerInView] = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    // Animation for the call info box
    const callBoxControls = useAnimation();
    const [callBoxRef, callBoxInView] = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    // Animation for each service card
    const ServiceCard = ({ service, index }) => {
        const controls = useAnimation();
        const [ref, inView] = useInView({
            threshold: 0.1,
            triggerOnce: false,
        });

        useEffect(() => {
            if (inView) {
                controls.start('visible');
            }
        }, [controls, inView]);

        const variants = {
            hidden: {
                opacity: 0,
                y: 50,
            },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                }
            }
        };

        return (
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={variants}
                className="flex flex-col items-start"
            >
                <div className="h-56 w-full flex items-center justify-center mb-6">
                    <motion.img
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        className="max-h-full object-contain"
                        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
            </motion.div>
        );
    };

    useEffect(() => {
        if (headerInView) {
            headerControls.start({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: "easeOut"
                }
            });
        }
    }, [headerControls, headerInView]);

    useEffect(() => {
        if (callBoxInView) {
            callBoxControls.start({
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: "easeOut"
                }
            });
        }
    }, [callBoxControls, callBoxInView]);

    return (
        <div className="w-full py-16 bg-white">
            <div className="container mx-auto px-4 md:px-16">
                <div className="flex flex-col md:flex-row items-start justify-between mb-12">
                    <motion.div
                        ref={headerRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={headerControls}
                    >
                        <p className="text-sm text-[#ff9933] font-medium mb-2"># Our Services</p>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Special Services For <span className="text-[#ff9933]">UIC</span> Startups
                        </h2>
                    </motion.div>

                    <motion.div
                        ref={callBoxRef}
                        initial={{ opacity: 0, x: 50 }}
                        animate={callBoxControls}
                        className="mt-6 md:mt-0 bg-[#ff9933] p-6 flex items-center text-white rounded-lg"
                        whileHover={{ scale: 1.03, boxShadow: "0px 4px 20px rgba(255, 153, 51, 0.3)" }}
                    >
                        <div className="mr-4">
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                animate={{ rotate: [0, 15, -15, 15, -15, 0] }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 4
                                }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </motion.svg>
                        </div>
                        <div>
                            <p className="text-sm">Call for more info</p>
                            <p className="text-2xl font-bold">9131925108</p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpecialServices;