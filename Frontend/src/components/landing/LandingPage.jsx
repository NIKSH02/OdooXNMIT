import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ExploreCategories from './ExploreCategories';
import ExploreItems from './ExploreItems';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

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
