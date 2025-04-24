import React, { useEffect } from 'react';
import { Twitter, Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Footer = () => {
    // Create refs and animation controls for different sections
    const footerRef = React.useRef(null);
    const addressRef = React.useRef(null);
    const linksRef = React.useRef(null);
    const joinRef = React.useRef(null);
    const copyrightRef = React.useRef(null);
    
    // Create animation controls
    const footerControls = useAnimation();
    const addressControls = useAnimation();
    const linksControls = useAnimation();
    const joinControls = useAnimation();
    const copyrightControls = useAnimation();
    
    // Check if elements are in view
    const isFooterInView = useInView(footerRef, { once: false, amount: 0.1 });
    const isAddressInView = useInView(addressRef, { once: false, amount: 0.3 });
    const isLinksInView = useInView(linksRef, { once: false, amount: 0.3 });
    const isJoinInView = useInView(joinRef, { once: false, amount: 0.3 });
    const isCopyrightInView = useInView(copyrightRef, { once: false, amount: 0.5 });
    
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };
    
    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const itemFade = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    };

    // Control animations based on scroll position
    useEffect(() => {
        if (isFooterInView) {
            footerControls.start("visible");
        } else {
            footerControls.start("hidden");
        }
    }, [isFooterInView, footerControls]);
    
    useEffect(() => {
        if (isAddressInView) {
            addressControls.start("visible");
        } else {
            addressControls.start("hidden");
        }
    }, [isAddressInView, addressControls]);
    
    useEffect(() => {
        if (isLinksInView) {
            linksControls.start("visible");
        } else {
            linksControls.start("hidden");
        }
    }, [isLinksInView, linksControls]);
    
    useEffect(() => {
        if (isJoinInView) {
            joinControls.start("visible");
        } else {
            joinControls.start("hidden");
        }
    }, [isJoinInView, joinControls]);
    
    useEffect(() => {
        if (isCopyrightInView) {
            copyrightControls.start("visible");
        } else {
            copyrightControls.start("hidden");
        }
    }, [isCopyrightInView, copyrightControls]);

    return (
        <motion.footer 
            ref={footerRef}
            initial="hidden"
            animate={footerControls}
            variants={fadeInUp}
            className="relative text-white overflow-hidden"
        >
            {/* Background image with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/growth.jpg')",
                    filter: "brightness(0.3)"
                }}
            />

            {/* Theme color overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black-500/60 to-gray-900/90"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-24 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Address Section */}
                    <motion.div 
                        ref={addressRef}
                        initial="hidden"
                        animate={addressControls}
                        variants={fadeInUp}
                        className="flex flex-col space-y-6"
                    >
                        <motion.h3 
                            variants={itemFade}
                            className="text-2xl font-bold border-b-2 border-orange-500 pb-2 inline-block"
                        >
                            Address
                        </motion.h3>

                        <motion.div 
                            variants={itemFade}
                            className="flex items-start space-x-3"
                        >
                            <MapPin className="text-orange-400 mt-1 flex-shrink-0" size={20} />
                            <p className="text-gray-100">373/1, Collectorate Campus, Dhawari, Satna, Madhya Pradesh 485001.</p>
                        </motion.div>

                        <motion.div 
                            variants={itemFade}
                            className="flex items-center space-x-3"
                        >
                            <Phone className="text-orange-400 flex-shrink-0" size={18} />
                            <p className="text-gray-100">9131925108</p>
                        </motion.div>

                        <motion.div 
                            variants={itemFade}
                            className="flex items-center space-x-3"
                        >
                            <Mail className="text-orange-400 flex-shrink-0" size={18} />
                            <p className="text-gray-100">connect@sicsatna.org</p>
                        </motion.div>

                        {/* Social Media Icons */}
                        <motion.div 
                            variants={staggerChildren}
                            className="flex space-x-3 mt-2"
                        >
                            <motion.a 
                                variants={itemFade}
                                whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
                                href="#" 
                                className="p-2 bg-gray-800/60 hover:bg-orange-500 rounded-full transition duration-300 flex items-center justify-center"
                            >
                                <Twitter size={18} />
                            </motion.a>
                            <motion.a 
                                variants={itemFade}
                                whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
                                href="#" 
                                className="p-2 bg-gray-800/60 hover:bg-orange-500 rounded-full transition duration-300 flex items-center justify-center"
                            >
                                <Facebook size={18} />
                            </motion.a>
                            <motion.a 
                                variants={itemFade}
                                whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
                                href="#" 
                                className="p-2 bg-gray-800/60 hover:bg-orange-500 rounded-full transition duration-300 flex items-center justify-center"
                            >
                                <Instagram size={18} />
                            </motion.a>
                            <motion.a 
                                variants={itemFade}
                                whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
                                href="#" 
                                className="p-2 bg-gray-800/60 hover:bg-orange-500 rounded-full transition duration-300 flex items-center justify-center"
                            >
                                <Linkedin size={18} />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Important Links */}
                    <motion.div
                        ref={linksRef}
                        initial="hidden"
                        animate={linksControls}
                        variants={fadeInUp}
                    >
                        <motion.h3 
                            variants={itemFade}
                            className="text-2xl font-bold border-b-2 border-orange-500 pb-2 inline-block"
                        >
                            Important Links
                        </motion.h3>
                        <motion.ul 
                            variants={staggerChildren}
                            className="mt-6 space-y-4"
                        >
                            <motion.li 
                                variants={itemFade}
                                className="transition-transform hover:translate-x-2 duration-300"
                            >
                                <a href="#" className="flex items-center group">
                                    <span className="text-orange-400 mr-2 group-hover:text-white">-</span>
                                    <span className="group-hover:text-orange-300 transition">MP Startup</span>
                                </a>
                            </motion.li>
                            <motion.li 
                                variants={itemFade}
                                className="transition-transform hover:translate-x-2 duration-300"
                            >
                                <a href="#" className="flex items-center group">
                                    <span className="text-orange-400 mr-2 group-hover:text-white">-</span>
                                    <span className="group-hover:text-orange-300 transition">Startup India</span>
                                </a>
                            </motion.li>
                        </motion.ul>
                    </motion.div>

                    {/* Join SIC */}
                    <motion.div
                        ref={joinRef}
                        initial="hidden"
                        animate={joinControls}
                        variants={fadeInUp}
                    >
                        <motion.h3 
                            variants={itemFade}
                            className="text-2xl font-bold border-b-2 border-orange-500 pb-2 inline-block"
                        >
                            Join SIC
                        </motion.h3>
                        <motion.ul 
                            variants={staggerChildren}
                            className="mt-6 space-y-4"
                        >
                            <motion.li 
                                variants={itemFade}
                                className="transition-transform hover:translate-x-2 duration-300"
                            >
                                <a href="/startup-register" className="flex items-center group">
                                    <span className="text-orange-400 mr-2 group-hover:text-white">-</span>
                                    <span className="group-hover:text-orange-300 transition">Startup Registration</span>
                                </a>
                            </motion.li>
                            <motion.li 
                                variants={itemFade}
                                className="transition-transform hover:translate-x-2 duration-300"
                            >
                                <a href="/mentor-register" className="flex items-center group">
                                    <span className="text-orange-400 mr-2 group-hover:text-white">-</span>
                                    <span className="group-hover:text-orange-300 transition">Mentor Registration</span>
                                </a>
                            </motion.li>
                            <motion.li 
                                variants={itemFade}
                                className="transition-transform hover:translate-x-2 duration-300"
                            >
                                <a href="/investor-register" className="flex items-center group">
                                    <span className="text-orange-400 mr-2 group-hover:text-white">-</span>
                                    <span className="group-hover:text-orange-300 transition">Investor Register</span>
                                </a>
                            </motion.li>
                            <motion.li 
                                variants={itemFade}
                                className="transition-transform hover:translate-x-2 duration-300"
                            >
                                <a href="/partner-register" className="flex items-center group">
                                    <span className="text-orange-400 mr-2 group-hover:text-white">-</span>
                                    <span className="group-hover:text-orange-300 transition">Partner Registration</span>
                                </a>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                </div>

                {/* Copyright Section */}
                <motion.div 
                    ref={copyrightRef}
                    initial="hidden"
                    animate={copyrightControls}
                    variants={fadeInUp}
                    className="mt-16 pt-6 border-t border-gray-500/30"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <motion.p 
                            variants={itemFade}
                            className="text-gray-300 font-light"
                        >
                            © Sicsatna.org. All Right Reserved.
                        </motion.p>
                        <motion.div 
                            variants={itemFade}
                            className="flex items-center space-x-2 mt-4 md:mt-0"
                        >
                            <span className="text-xs text-gray-400">Designed by</span>
                            <img src="/api/placeholder/80/20" alt="Designer logo" className="h-5 opacity-80" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;