import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';

// Animation variants for sections and form elements
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: i * 0.1, // Stagger effect for each field
    },
  }),
};

// Reusable AnimatedSection component
const AnimatedSection = ({ children, className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.2, // Trigger when 20% of the section is visible
    once: false, // Animation triggers every time the section comes into view
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

// Animated Field component
const AnimatedField = ({ children, index, className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.2, // Trigger when 20% of the field is visible
    once: false, // Animation triggers every time the field comes into view
  });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fieldVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
    startupIdea: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/join/women-cell', formData);
      setSuccess('Form submitted successfully!');
      setError('');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        location: '',
        startupIdea: '',
      });
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      setSuccess('');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <AnimatedSection className="text-3xl font-bold text-center mb-8">
        JOIN NOW
      </AnimatedSection>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      <div>
        <AnimatedField index={0} className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Your Name <span className="text-[#ff9933]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff9933]"
          />
        </AnimatedField>

        <AnimatedField index={1} className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email ID <span className="text-[#ff9933]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff9933]"
          />
        </AnimatedField>

        <AnimatedField index={2} className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700 mb-2">
            Mobile No. (XXXXXXXXXX) <span className="text-[#ff9933]">*</span>
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff9933]"
          />
        </AnimatedField>

        <AnimatedField index={3} className="mb-4">
          <label htmlFor="location" className="block text-gray-700 mb-2">
            Location <span className="text-[#ff9933]">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff9933]"
          />
        </AnimatedField>

        <AnimatedField index={4} className="mb-6">
          <label htmlFor="startupIdea" className="block text-gray-700 mb-2">
            Describe your startup idea <span className="text-[#ff9933]">*</span>
          </label>
          <textarea
            id="startupIdea"
            name="startupIdea"
            value={formData.startupIdea}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff9933] border-[#e8fcf5]"
          />
        </AnimatedField>

        <AnimatedField index={5} className="text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#ff9933] text-white font-medium rounded hover:bg-[#e68a2e] transition-colors duration-300"
          >
            Join Now
          </button>
        </AnimatedField>
      </div>
    </div>
  );
};

export default JoinForm;