import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleExploreClick = () => {
    // Smooth scroll to the explore categories section
    const exploreSection = document.getElementById('explore-categories');
    if (exploreSection) {
      exploreSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const slides = [
    {
      id: 1,
      title: "Discover Sustainable Products",
      subtitle: "Find eco-friendly items for your everyday needs",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-[#782355] to-purple-600"
    },
    {
      id: 2,
      title: "Electronics & Gadgets",
      subtitle: "Latest technology at affordable prices",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80",
      gradient: "from-blue-600 to-[#782355]"
    },
    {
      id: 3,
      title: "Furniture & Home",
      subtitle: "Transform your space with quality furniture",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
      gradient: "from-green-600 to-[#782355]"
    },
    {
      id: 4,
      title: "Fashion & Style",
      subtitle: "Express yourself with sustainable fashion",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-pink-600 to-[#782355]"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === currentSlide
                ? 'translate-x-0 opacity-100'
                : index < currentSlide
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`} />
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl mx-auto text-white">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-8 animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                <button 
                  onClick={handleExploreClick}
                  className="bg-white text-[#782355] px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400"
                >
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform duration-200" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
