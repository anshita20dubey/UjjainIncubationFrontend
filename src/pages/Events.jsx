import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header1 from '../components/Header1';
import pageData from './serviceData.json'; // Import the centralized JSON file
import Chatbot from '../components/Chatbot';

const EventCard = ({ title, description, image, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.2 });
    const controls = useAnimation();

    React.useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={cardRef}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                    }
                }
            }}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        >
            <div className="h-48 overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <motion.div
                className="p-6 border-t-4 border-[#F59E0B]"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { delay: 0.2 } }
                }}
            >
                <h3 className="text-xl font-bold text-[#F59E0B] mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </motion.div>
        </motion.div>
    );
};

const AnimatedSection = ({ children, className }) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
    const controls = useAnimation();

    React.useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    return (
        <motion.section
            ref={sectionRef}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.2 } }
            }}
            className={className}
        >
            {children}
        </motion.section>
    );
};

const AnimatedHeading = ({ children, className }) => {
    return (
        <motion.h2
            variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className={className}
        >
            {children}
        </motion.h2>
    );
};

const AnimatedText = ({ children, className }) => {
    return (
        <motion.p
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className={className}
        >
            {children}
        </motion.p>
    );
};

const AnimatedButton = ({ children, href, className }) => {
    return (
        <motion.a
            href={href}
            variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className={className}
        >
            {children}
        </motion.a>
    );
};

const FloatingParticle = ({ delay, size, position, duration }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, x: position.x, y: position.y }}
            animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
                x: position.x + (Math.random() > 0.5 ? 20 : -20),
                y: position.y - 40
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "loop",
                delay: delay,
                ease: "easeInOut"
            }}
            className={`absolute rounded-full bg-gradient-to-br from-[#F3F4F6]/50 to-[#D4AF37]/30 w-${size} h-${size}`}
        />
    );
};

const Events = () => {
    const servicesData = pageData.pages.events; // Access the events page data

    // Event data with images
    const eventsData = [
        {
            id: 1,
            title: "Webinars",
            description: "Online sessions with industry leaders on business growth, funding, marketing, and technology trends.",
            image: "/images/webinar.jpg"
        },
        {
            id: 2,
            title: "Campus Outreach Programs",
            description: "Workshops and interactive sessions in schools and colleges to ignite young minds and promote entrepreneurship.",
            image: "/images/seminar.jpg"
        },
        {
            id: 3,
            title: "Ideathons",
            description: "Creative brainstorming events where aspiring entrepreneurs pitch ideas, receive expert feedback, and shape viable solutions.",
            image: "/images/ideathon.png"
        },
        {
            id: 4,
            title: "Hackathons",
            description: "High-energy problem-solving competitions where teams build functional prototypes under tight deadlines.",
            image: "/images/hackathon.jpg"
        }
    ];

    return (
        <>
            <Navbar />
            <Header1 title={servicesData.title} breadcrumbs={servicesData.breadcrumbs} />

            <div className='px-4 md:px-16'>

                {/* Event Cards Section */}

                {/* Events Cards Section */}
                <AnimatedSection className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4">
                        <AnimatedHeading className="text-4xl font-bold text-center text-[#F59E0B] mb-12">
                            Our Event Categories
                        </AnimatedHeading>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {eventsData.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    title={event.title}
                                    description={event.description}
                                    image={event.image}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </AnimatedSection>


                {/* Call to Action */}
                <AnimatedSection className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <AnimatedHeading className="text-2xl font-bold text-[#F59E0B] mb-4">
                                Want to Participate in Our Events?
                            </AnimatedHeading>
                            <AnimatedText className="text-lg text-gray-600 mb-8">
                                Join our community of innovators and entrepreneurs! Register now to get notified about
                                upcoming events and secure your spot.
                            </AnimatedText>
                            <div className="flex flex-wrap justify-center gap-4">
                                <AnimatedButton
                                    href="/startup-register"
                                    className="inline-block bg-white text-[#F59E0B] border-2 border-[#F59E0B] px-8 py-3 rounded-md font-medium hover:bg-gray-50 hover:text-[#D97706] transition-all duration-300"
                                >
                                    Register Now
                                </AnimatedButton>
                            </div>
                        </motion.div>
                    </div>
                </AnimatedSection>
            </div>

            <Footer />
            <Chatbot />
        </>
    );
};

export default Events;