'use client';

import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <div className="mb-6">
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
                👋 Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Akash <span className="gradient-text">Pawar</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-6">
                Java Developer | Spring Boot | React.js
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Passionate Java Developer with 2+ years of experience building scalable 
                enterprise applications using Spring Boot, Hibernate, MySQL, and modern 
                Java frameworks for robust backend systems.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Get In Touch
              </button>
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                View Projects
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center lg:justify-start gap-8 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">10+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">8+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Technologies</p>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  {/* Your Profile Photo */}
                  <Image
                    src="/MyPhoto.png"
                    alt="Akash Pawar - Java Developer"
                    width={384}
                    height={384}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-lg rotate-12 flex items-center justify-center shadow-lg">
                <span className="text-2xl">☕</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">💻</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;