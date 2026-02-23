'use client';

import { useState } from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Library Management System",
      description: "A comprehensive full-stack web application built with Next.js 14, TypeScript, and Supabase that streamlines library operations for a study center in Pune.",
      longDescription: "A comprehensive full-stack web application built with Next.js 14, TypeScript, and Supabase that streamlines library operations for a study center in Pune. Features real-time dashboard analytics, automated admission management, role-based access control, and intelligent email notifications for renewal reminders. Includes modern UI/UX with dark mode support, Chart.js visualizations, and automated cron jobs for seamless business operations.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js 14", "TypeScript", "Supabase", "Chart.js", "Tailwind CSS", "PostgreSQL", "Cron Jobs"],
      features: [
        "Real-time dashboard analytics",
        "Automated admission management",
        "Role-based access control",
        "Intelligent email notifications for renewal reminders",
        "Modern UI/UX with dark mode support",
        "Chart.js visualizations",
        "Automated cron jobs for business operations",
        "Study center operations streamlining"
      ],
      github: "https://github.com/akashpawar6363/sanjay-study-center.git",
      live: "#",
      status: "Completed",
      category: "Full Stack"
    },
    {
      title: "Patent Draft Generator",
      description: "AI-Powered Patent Drafting Assistant - A full-stack web application that automates patent application creation using multiple AI models (Gemini, GPT, Claude, Ollama).",
      longDescription: "AI-Powered Patent Drafting Assistant - A full-stack web application that automates patent application creation using multiple AI models (Gemini, GPT, Claude, Ollama). Users can upload technical documents and generate comprehensive patent sections including claims, background, and detailed descriptions with real-time editing capabilities. Built with Next.js/TypeScript frontend, FastAPI Python backend, and secure user authentication system.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "AI Integration", "Gemini API", "OpenAI GPT", "Claude API", "Ollama"],
      features: [
        "Multi-model AI support with intelligent fallback systems",
        "PDF/DOCX document parsing and processing",
        "Automated patent section generation",
        "Real-time editing capabilities",
        "Secure user authentication system",
        "Comprehensive patent claims generation",
        "Background and detailed description automation",
        "Intuitive patent drafting workflow"
      ],
      github: "https://github.com/akashpawar6363/Patent_Draft_Generator.git",
      live: "#",
      status: "Completed",
      category: "Full Stack"
    },
    {
      title: "LinkedIn Job Search Automation Tool",
      description: "A Python-based automation script that streamlines job hunting by intelligently scraping LinkedIn for relevant job postings using Selenium WebDriver.",
      longDescription: "A Python-based automation script that streamlines job hunting by intelligently scraping LinkedIn for relevant job postings using Selenium WebDriver, extracting contact emails from posts, and automatically sending personalized outreach emails with resume attachments via Gmail SMTP. Features headless browser operation, rate limiting to avoid detection, and configurable search parameters for multiple developer roles including Full Stack, MERN, Backend, and Node.js/React.js positions.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "Selenium WebDriver", "Gmail SMTP", "Web Scraping", "Email Automation", "Headless Browser", "Rate Limiting"],
      features: [
        "Intelligent LinkedIn job scraping with Selenium WebDriver",
        "Contact email extraction from job posts",
        "Automated personalized outreach emails",
        "Resume attachment handling via Gmail SMTP",
        "Headless browser operation for stealth mode",
        "Rate limiting to avoid detection algorithms",
        "Configurable search parameters for multiple roles",
        "Support for Full Stack, MERN, Backend, Node.js/React.js positions"
      ],
      github: "https://github.com/akashpawar6363/LinkedIn_Automation_ColdEmail_Send.git",
      live: "#",
      status: "Completed",
      category: "Backend"
    },
    {
      title: "Professional Profile Auto-Updater",
      description: "A Python automation tool that maintains an active professional presence by automatically updating LinkedIn and Naukri.com profiles daily.",
      longDescription: "A Python automation tool that maintains an active professional presence by automatically updating LinkedIn and Naukri.com profiles daily. Built with Selenium WebDriver, it securely handles profile updates, resume uploads, and content management while providing comprehensive logging and error handling for reliable scheduled execution. This project demonstrates expertise in web automation, security best practices, and production-ready code development.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "Selenium WebDriver", "Environment Variables", "Logging", "Scheduling", "Error Handling", "Web Automation"],
      features: [
        "Automated daily LinkedIn profile updates",
        "Naukri.com profile maintenance and synchronization",
        "Secure credential management with environment variables",
        "Resume upload automation across platforms",
        "Comprehensive logging and monitoring system",
        "Advanced error handling and recovery mechanisms",
        "Scheduled execution for reliable automation",
        "Content management and profile optimization"
      ],
      github: "https://github.com/akashpawar6363/NaukriProfile_Update_Automation.git",
      live: "#",
      status: "Completed",
      category: "Backend"
    },
    {
      title: "Expense Tracker",
      description: "Full-stack expense tracking web application built with Spring Boot and React, featuring JWT authentication, MySQL database integration, and Docker containerization.",
      longDescription: "Full-stack expense tracking web application built with Spring Boot and React, featuring JWT authentication, MySQL database integration, and Docker containerization. Includes comprehensive transaction management, real-time financial analytics with Chart.js visualizations, and data export capabilities. Demonstrates modern web development practices with RESTful APIs, responsive Bootstrap UI, and secure user authentication.",
      image: "/api/placeholder/400/250",
      technologies: ["Spring Boot", "React.js", "MySQL", "JWT", "Docker", "Chart.js", "Bootstrap", "REST APIs"],
      features: [
        "JWT authentication and secure user management",
        "Comprehensive transaction management",
        "Real-time financial analytics with Chart.js visualizations",
        "Data export capabilities",
        "RESTful APIs for backend services",
        "Responsive Bootstrap UI design",
        "Docker containerization for deployment",
        "MySQL database integration"
      ],
      github: "https://github.com/akashpawar6363/expense-tracker.git",
      live: "#",
      status: "Completed",
      category: "Full Stack"
    },
    {
      title: "Convico - Chat Application",
      description: "Real-time chat application built with Spring Boot backend and React frontend, featuring secure user authentication, instant messaging, and modern responsive UI design.",
      longDescription: "Real-time chat application built with Spring Boot backend and React frontend, featuring secure user authentication, instant messaging, and modern responsive UI design. Includes comprehensive user management, real-time message delivery with WebSocket integration, and intuitive chat interface. Demonstrates modern web development practices with RESTful APIs, secure authentication, and responsive design principles.",
      image: "/api/placeholder/400/250",
      technologies: ["Spring Boot", "React.js", "WebSocket", "MySQL", "JWT", "REST APIs", "Bootstrap", "Real-time"],
      features: [
        "Real-time messaging with WebSocket integration",
        "Secure user authentication and authorization",
        "Instant message delivery and notifications",
        "Comprehensive user management system",
        "Modern responsive UI design",
        "RESTful APIs for backend services",
        "Cross-platform compatibility",
        "Scalable chat architecture"
      ],
      github: "https://github.com/akashpawar6363/Convico-ChatApplication.git",
      live: "#",
      status: "Completed",
      category: "Full Stack"
    }
  ];

  const categories = ["All", "Full Stack", "Backend"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [expandedTechs, setExpandedTechs] = useState<{ [key: string]: boolean }>({});

  const filterProjects = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  const toggleTechExpansion = (projectTitle: string) => {
    setExpandedTechs(prev => ({
      ...prev,
      [projectTitle]: !prev[projectTitle]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Planning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A showcase of my full-stack projects demonstrating expertise in React.js, Next.js frontend development 
            combined with Java Spring Boot backend architecture and modern web technologies
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterProjects(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-600 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 overflow-hidden group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-indigo-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl opacity-20">
                    {project.category === "Full Stack" && "🚀"}
                    {project.category === "Backend" && "⚙️"}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Project Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {(expandedTechs[project.title] ? project.technologies : project.technologies.slice(0, 3)).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && !expandedTechs[project.title] && (
                      <button
                        onClick={() => toggleTechExpansion(project.title)}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      >
                        +{project.technologies.length - 3} more
                      </button>
                    )}
                    {expandedTechs[project.title] && project.technologies.length > 3 && (
                      <button
                        onClick={() => toggleTechExpansion(project.title)}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      >
                        Show less
                      </button>
                    )}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Interested in My Work?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              I'm always working on new projects and learning new technologies. 
              Check out my GitHub for more projects and contributions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/akashpawar6363"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                View GitHub Profile
              </a>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;