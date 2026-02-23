'use client';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-up">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-6"></div>
            </div>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                I'm a passionate <strong className="text-gray-900 dark:text-white">Java Developer</strong> with 
                over 2+ years of comprehensive experience building enterprise applications. 
                I specialize in creating robust backend systems with modern Java frameworks 
                and occasionally work on frontend integration.
              </p>
              
              <p>
                My expertise spans <strong className="text-gray-900 dark:text-white">backend development</strong> using 
                Spring Boot, Hibernate, MySQL, and microservices architecture, as well as 
                <strong className="text-gray-900 dark:text-white"> frontend integration</strong> with React.js when needed. 
                I'm passionate about creating scalable, maintainable enterprise applications 
                with robust business logic and data management.
              </p>
              
              <p>
                When I'm not coding, I enjoy exploring new enterprise technologies, contributing to 
                backend development best practices, and sharing knowledge about Java development 
                and enterprise application architecture.
              </p>
            </div>

            {/* Personal Info */}
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold w-24">Name:</span>
                  <span className="text-gray-700 dark:text-gray-300">Akash Pawar</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold w-24">Role:</span>
                  <span className="text-gray-700 dark:text-gray-300">Java Developer</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold w-24">Experience:</span>
                  <span className="text-gray-700 dark:text-gray-300">2+ Years</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold w-24">Location:</span>
                  <span className="text-gray-700 dark:text-gray-300">India</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold w-24">Languages:</span>
                  <span className="text-gray-700 dark:text-gray-300">English, Hindi</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold w-24">Interests:</span>
                  <span className="text-gray-700 dark:text-gray-300">Tech, Problem Solving</span>
                </div>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="mt-8">
              <a 
                href="/Resume-Akash_Pawar_Java_Developer.pdf" 
                download="Resume-Akash_Pawar_Java_Developer.pdf"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* Skills Overview */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Core Strengths</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Full-Stack Development</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">React.js & Next.js</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Java & Spring Boot</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Problem Solving</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Fun Facts */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">100+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Commits</p>
                  </div>
                  <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;