import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header1 from '../components/Header1';
import pageData from './serviceData.json';
import axios from 'axios';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Country, State, City } from "country-state-city";
import API_URL from './Config';
import Chatbot from '../components/Chatbot';

const MentorRegister = () => {
    const servicesData = pageData.pages.mentorregister;
    const countries = Country.getAllCountries();

    // Sector expertise options
    const sectorOptions = [
        "Legal Expert", "Finance Expert", "Account Expert", "Marketing Expert",
        "IT Expert", "Digital Marketing", "Business Strategy Expert",
        "Women Entrepreneur Expert", "Startup Expert", "Communication Expert", "HR and PR"
    ];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        phone_no: '',
        country: '',
        state: '',
        city: '',
        linkedin: '',
        yearsMentorship: '',
        sectors: []
    });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Update states list when country changes
    useEffect(() => {
        if (formData.country) {
            const countryStates = State.getStatesOfCountry(formData.country);
            setStates(countryStates);
            setFormData(prev => ({
                ...prev,
                state: '',
                city: ''
            }));
            try {
                const selectedCountry = countries.find(c => c.isoCode === formData.country);
                if (selectedCountry && selectedCountry.phonecode) {
                    setFormData(prev => ({
                        ...prev,
                        phone_no: `+${selectedCountry.phonecode}`
                    }));
                }
            } catch (err) {
                console.error("Error setting phone code:", err);
            }
        } else {
            setStates([]);
        }
    }, [formData.country]);

    // Update cities list when state changes
    useEffect(() => {
        if (formData.state && formData.country) {
            try {
                const stateCities = City.getCitiesOfState(formData.country, formData.state);
                setCities(stateCities || []);
            } catch (err) {
                console.error("Error getting cities:", err);
                setCities([]);
            }
            setFormData(prev => ({ ...prev, city: '' }));
        } else {
            setCities([]);
        }
    }, [formData.state, formData.country]);

    const handlePhoneChange = (value) => {
        setFormData(prev => ({ ...prev, phone_no: value || '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!formData.phone_no || formData.phone_no.length < 8) {
            newErrors.phone_no = 'Valid phone number is required';
        }

        if (!formData.country) {
            newErrors.country = 'Country is required';
        }

        if (!formData.state) {
            newErrors.state = 'State is required';
        }

        if (!formData.city) {
            newErrors.city = 'City is required';
        }

        if (formData.linkedin && !formData.linkedin.includes('linkedin.com')) {
            newErrors.linkedin = 'Please enter a valid LinkedIn URL';
        }

        if (formData.yearsMentorship && isNaN(formData.yearsMentorship) || formData.yearsMentorship < 0) {
            newErrors.yearsMentorship = 'Please enter a valid number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData(prevState => ({
                ...prevState,
                sectors: checked
                    ? [...prevState.sectors, value]
                    : prevState.sectors.filter(sector => sector !== value)
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            const firstErrorField = Object.keys(errors)[0];
            const element = document.getElementsByName(firstErrorField)[0];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setIsSubmitting(true);

        try {
            const submissionData = {
                ...formData,
                mobile: formData.phone_no
            };

            const response = await axios.post(`${API_URL}/api/mentors/mentor-register`, submissionData);
            console.log('Submission response:', response.data);
            setSubmitSuccess(true);

            setFormData({
                fullName: '',
                email: '',
                mobile: '',
                phone_no: '',
                country: '',
                state: '',
                city: '',
                linkedin: '',
                yearsMentorship: '',
                sectors: []
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors(prev => ({
                ...prev,
                submit: error.response?.data?.message || 'Failed to register mentor. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <Header1 title={servicesData.title} breadcrumbs={servicesData.breadcrumbs} />

            <div className="flex justify-center py-12 bg-gray-50">
                <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 mx-4">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Join as a Startup Mentor</h2>

                    {submitSuccess && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8 text-center">
                            <div className="flex flex-col items-center">
                                <div className="bg-green-100 p-3 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-green-700 mb-2">Thank You for Registering!</h3>
                                <p className="text-gray-700 mb-4">Your mentor registration has been successfully submitted. We're excited about having you on board!</p>
                                <p className="text-sm text-gray-600">Our team will review your information and contact you within 2-3 business days.</p>
                                <button
                                    onClick={() => setSubmitSuccess(false)}
                                    className="mt-6 bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                                    style={{ backgroundColor: "#ff9933" }}
                                >
                                    Register Another Mentor
                                </button>
                            </div>
                        </div>
                    )}

                    {errors.submit && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">{errors.submit}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Mentor Name"
                                    className={`w-full p-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400`}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400`}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="country"
                                    className={`w-full p-3 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white`}
                                    value={formData.country}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.isoCode} value={country.isoCode}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <PhoneInput
                                    value={formData.phone_no || ""}
                                    onChange={handlePhoneChange}
                                    className={`w-full p-3 border ${errors.phone_no ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400`}
                                    international
                                    countryCallingCodeEditable={true}
                                />
                                {errors.phone_no && <p className="text-red-500 text-sm mt-1">{errors.phone_no}</p>}
                            </div>



                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="state"
                                    className={`w-full p-3 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white`}
                                    value={formData.state}
                                    onChange={handleChange}
                                    disabled={!formData.country}
                                >
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state.isoCode} value={state.isoCode}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                {!formData.country && (
                                    <p className="text-sm text-gray-500 mt-1">Select a country first</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="city"
                                    className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white`}
                                    value={formData.city}
                                    onChange={handleChange}
                                    disabled={!formData.state}
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.id || city.name} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                    {formData.state && cities.length === 0 && (
                                        <option value="Other">Other</option>
                                    )}
                                </select>
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                {!formData.state && (
                                    <p className="text-sm text-gray-500 mt-1">Select a state first</p>
                                )}
                                {formData.state && cities.length === 0 && (
                                    <p className="text-sm text-gray-500 mt-1">No cities available for this state.</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    LinkedIn URL <span className="text-gray-400">(Optional)</span>
                                </label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    placeholder="LinkedIn Page URL"
                                    className={`w-full p-3 border ${errors.linkedin ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400`}
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                />
                                {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    No of Years in Mentorship <span className="text-gray-400">(Optional)</span>
                                </label>
                                <input
                                    type="number"
                                    name="yearsMentorship"
                                    placeholder="Years"
                                    className={`w-full p-3 border ${errors.yearsMentorship ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400`}
                                    value={formData.yearsMentorship}
                                    onChange={handleChange}
                                    min="0"
                                />
                                {errors.yearsMentorship && <p className="text-red-500 text-sm mt-1">{errors.yearsMentorship}</p>}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">
                                Sector Expertise <span className="text-gray-400">(Optional)</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {sectorOptions.map((sector, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="sectors"
                                            value={sector}
                                            checked={formData.sectors.includes(sector)}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label>{sector}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                className={`bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-md transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                style={{ backgroundColor: "#ff9933" }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Processing...' : 'Register Now'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
            <Chatbot />
        </>
    );
};

export default MentorRegister;