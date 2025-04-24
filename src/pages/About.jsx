import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Who from '../components/Who';
import Header1 from '../components/Header1';
import pageData from './serviceData.json'; // Import the centralized JSON file

const Services = () => {
  const servicesData = pageData.pages.about; // Access the about page data

  return (
    <>
      <Navbar />
      <Header1 title={servicesData.title} breadcrumbs={servicesData.breadcrumbs} />
      <Who />
      <Footer />
    </>
  );
};

export default Services;