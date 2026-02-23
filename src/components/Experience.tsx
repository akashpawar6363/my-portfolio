const Experience = () => {
  const experiences = [
    {
      title: "Java Developer",
      company: "TwoInfinity Developers LLP",
      duration: "08/2025 – Present",
      type: "Full-time",
      location: "Remote",
      description: [
        "Developed a Purchase Order Status Tool using Java, Spring Boot, Hibernate, MySQL, and React.js",
        "Implemented a Pipeline Module to manage projects, sub-projects, and purchase order workflows",
        "Designed and built RESTful APIs for CRUD operations following layered architecture",
        "Implemented role-based authentication and authorization using Spring Security",
        "Optimized SQL queries using indexing and pagination to improve performance",
        "Integrated Swagger UI (OpenAPI) for REST API documentation and testing"
      ],
      technologies: ["Java", "Spring Boot", "Hibernate", "MySQL", "React.js", "Spring Security", "Swagger", "OpenAPI"],
      achievements: [
        "Built comprehensive purchase order management system",
        "Implemented role-based security architecture",
        "Optimized database performance with indexing"
      ]
    },
    {
      title: "Junior Software Developer",
      company: "R. K. Dewan & Co.",
      duration: "04/2024 – 08/2025",
      type: "Full-time",
      location: "Pune",
      description: [
        "Developed backend functionalities using Java, Spring Boot, and Hibernate for enterprise internal applications",
        "Implemented RESTful APIs and handled database operations using MySQL to support CRUD operations and business workflows",
        "Developed and enhanced multiple enterprise modules including a Patent Management System and a Financial Reconciliation System",
        "Enhanced Patent Management System modules with task automation, deadline tracking, and workflow monitoring features",
        "Built Financial Reconciliation module to process, validate, and compare transactional data, reducing manual verification efforts",
        "Implemented automated Email Timesheet System with database integration and daily report generation",
        "Created tabular reports sent daily to employees and reporting managers via automated email system",
        "Developed monthly timesheet reports to track employee productivity and working hours for performance monitoring",
        "Built frontend components using React.js to consume backend APIs and improve application usability",
        "Containerized applications using Docker to ensure consistent runtime environments across development and deployment",
        "Used Git for version control and Jenkins for CI workflows during development and deployment"
      ],
      technologies: ["Java", "Spring Boot", "Hibernate", "MySQL", "React.js", "Docker", "Git", "Jenkins", "REST APIs"],
      achievements: [
        "Developed Patent Management System enhancements",
        "Built automated Financial Reconciliation module",
        "Implemented automated Email Timesheet System",
        "Reduced manual verification efforts significantly",
        "Improved application performance monitoring"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My professional journey as a Java Developer, showcasing growth in enterprise application development, backend expertise, achievements, and comprehensive technical skills
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-indigo-600"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-0' : 'md:ml-auto'} md:text-left ml-12 md:w-1/2 animate-fade-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute w-4 h-4 bg-blue-600 border-4 border-white dark:border-slate-900 rounded-full -left-14 md:-left-2 top-6 shadow-lg"></div>

              {/* Card */}
              <div className={`bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group ${index % 2 === 1 ? 'md:mr-8' : 'md:ml-8'}`}>
                {/* Header */}
                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 mb-1">
                        {exp.type}
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{exp.duration}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{exp.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                        <span className="text-blue-600 dark:text-blue-400 mr-2 mt-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-slate-600 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">2+</div>
                <div className="text-blue-100">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10+</div>
                <div className="text-blue-100">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">8+</div>
                <div className="text-blue-100">Technologies Mastered</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">300+</div>
                <div className="text-blue-100">Commits</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;