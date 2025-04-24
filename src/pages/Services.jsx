import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header1 from '../components/Header1';
import pageData from './serviceData.json'; // Import the centralized JSON file
import SpecialServices from '../components/SpecialServices';

const Services = () => {
    const servicesData = pageData.pages.services; // Access the services page data

    return (
        <>
            <Navbar />
            <Header1 title={servicesData.title} breadcrumbs={servicesData.breadcrumbs} />
            <SpecialServices />
            <Footer />
        </>
    );
};

export default Services;