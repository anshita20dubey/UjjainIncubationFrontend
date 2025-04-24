import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation, useInView } from 'framer-motion';

const Header1 = ({ title, breadcrumbs }) => {
    // Create ref and animation controls for the header
    const headerRef = React.useRef(null);
    const titleRef = React.useRef(null);
    const breadcrumbsRef = React.useRef(null);
    
    // Create animation controls
    const headerControls = useAnimation();
    const titleControls = useAnimation();
    const breadcrumbsControls = useAnimation();
    
    // Check if elements are in view
    const isHeaderInView = useInView(headerRef, { once: false, amount: 0.1 });
    const isTitleInView = useInView(titleRef, { once: false, amount: 0.3 });
    const isBreadcrumbsInView = useInView(breadcrumbsRef, { once: false, amount: 0.3 });
    
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { duration: 0.8, ease: "easeOut" } 
        }
    };
    
    const slideDown = {
        hidden: { opacity: 0, y: -30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        }
    };
    
    const slideRight = {
        hidden: { opacity: 0, x: -30 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        }
    };
    
    const staggerBreadcrumbs = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const breadcrumbItem = {
        hidden: { opacity: 0, x: -10 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.3 } 
        }
    };

    // Control animations based on scroll position
    useEffect(() => {
        if (isHeaderInView) {
            headerControls.start("visible");
        } else {
            headerControls.start("hidden");
        }
    }, [isHeaderInView, headerControls]);
    
    useEffect(() => {
        if (isTitleInView) {
            titleControls.start("visible");
        } else {
            titleControls.start("hidden");
        }
    }, [isTitleInView, titleControls]);
    
    useEffect(() => {
        if (isBreadcrumbsInView) {
            breadcrumbsControls.start("visible");
        } else {
            breadcrumbsControls.start("hidden");
        }
    }, [isBreadcrumbsInView, breadcrumbsControls]);

    return (
        <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={fadeIn}
            className="relative w-full h-64 flex items-center justify-start px-4 md:px-16 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/office-building.jpg')` }}
        >
            <div className="text-white z-10">
                <motion.h1 
                    ref={titleRef}
                    initial="hidden"
                    animate={titleControls}
                    variants={slideDown}
                    className="text-3xl md:text-5xl font-bold mb-4"
                >
                    {title}
                </motion.h1>
                
                <motion.nav 
                    ref={breadcrumbsRef}
                    initial="hidden"
                    animate={breadcrumbsControls}
                    variants={staggerBreadcrumbs}
                    className="breadcrumbs flex flex-wrap"
                >
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={item.path}>
                            <motion.a 
                                variants={breadcrumbItem}
                                whileHover={{ scale: 1.05 }}
                                href={item.path} 
                                className="hover:underline"
                            >
                                {item.label}
                            </motion.a>
                            {index < breadcrumbs.length - 1 && (
                                <motion.span variants={breadcrumbItem} className="mx-2">
                                    ›
                                </motion.span>
                            )}
                        </React.Fragment>
                    ))}
                </motion.nav>
            </div>
            
            {/* Semi-transparent overlay with subtle animation */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-black" 
            />
        </motion.div>
    );
};

Header1.propTypes = {
    title: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        })
    ).isRequired,
};

export default Header1;