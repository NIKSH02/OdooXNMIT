import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ExploreCategories from '../components/landing/ExploreCategories';
import ExploreItems from '../components/landing/ExploreItems';
import HowItWorks from '../components/landing/HowItWorks';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ExploreCategories />
        <ExploreItems />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
