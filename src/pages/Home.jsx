import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Who from '../components/Who'
import SpecialServices from '../components/SpecialServices'
import Ecosystem from '../components/Ecosystem'
import Footer from '../components/Footer'
import '../index.css'

const Home = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Who />
            <SpecialServices />
            <Ecosystem />
            <Footer />
        </div>
    )
}

export default Home