import React from 'react';
import { 
  UserPlusIcon, 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  ShoppingCartIcon 
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HowItWorks = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const steps = [
    {
      id: 1,
      icon: UserPlusIcon,
      title: "Create Account",
      description: "Sign up and create your profile to start buying and selling sustainable products",
      color: "from-blue-400 to-blue-600",
      delay: "animate-fade-in-up"
    },
    {
      id: 2,
      icon: MagnifyingGlassIcon,
      title: "Browse & Search",
      description: "Explore our wide range of eco-friendly products or search for specific items",
      color: "from-green-400 to-green-600",
      delay: "animate-fade-in-up animation-delay-200"
    },
    {
      id: 3,
      icon: ShoppingCartIcon,
      title: "Add to Cart & Buy",
      description: "Add items to your cart and complete secure purchases with ease",
      color: "from-yellow-400 to-yellow-600",
      delay: "animate-fade-in-up animation-delay-400"
    },
    {
      id: 4,
      icon: ShoppingBagIcon,
      title: "Complete Purchase",
      description: "Finalize your purchase and enjoy your sustainable products with confidence",
      color: "from-[#782355] to-purple-600",
      delay: "animate-fade-in-up animation-delay-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with EcoFinds in just a few simple steps and join our community of sustainable living enthusiasts
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#782355] via-blue-400 to-green-400 opacity-30"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative group flex flex-col h-full ${step.delay}`}
                style={{ minHeight: '370px' }}
              >
                {/* Step Card */}
                <div className="flex flex-col h-full bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 w-full min-w-[250px] max-w-[320px] mx-auto" style={{ minHeight: '370px' }}>
                  {/* Step Number */}
                  <div className="absolute -top-4 left-6">
                    <div className="w-8 h-8 bg-[#782355] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {step.id}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#782355] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-1">
                    {step.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#782355]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
                </div>

                {/* Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-3 z-10">
                    <div className="w-6 h-6 bg-white border-2 border-[#782355] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-3 h-3 text-[#782355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action - Only show if user is not authenticated */}
        {!isAuthenticated && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#782355] to-purple-600 rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Join thousands of users who are already making a difference
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/authpage')}
                  className="bg-white text-[#782355] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
                >
                  Sign Up Now
                </button>
                <button 
                  onClick={() => navigate('/products')}
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#782355] transition-all duration-200 transform hover:scale-105"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
