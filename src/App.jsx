import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Career from './pages/Career'
import Startups from './pages/Startups'
import WomenCell from './pages/WomenCell'
import StartupRegister from './pages/StartupRegister'
import MentorRegister from './pages/MentorRegister'
import InvestorRegister from './pages/InvestorRegister'
import PartnerRegister from './pages/PartnerRegister'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/startups" element={<Startups />} />
        <Route path="/women-cell" element={<WomenCell />} />
        <Route path="/startup-register" element={<StartupRegister />} />
        <Route path="/mentor-register" element={<MentorRegister />} />
        <Route path="/investor-register" element={<InvestorRegister />} />
        <Route path="/partner-register" element={<PartnerRegister />} />
      </Routes>
    </Router>
  )
}

export default App
