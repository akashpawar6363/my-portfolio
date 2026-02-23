const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🎨",
      skills: [
        { name: "React.js", level: "Advanced", color: "bg-blue-500" },
        { name: "Next.js", level: "Advanced", color: "bg-black" },
        { name: "JavaScript (ES6+)", level: "Advanced", color: "bg-yellow-500" },
        { name: "TypeScript", level: "Intermediate", color: "bg-blue-600" },
        { name: "HTML5 & CSS3", level: "Advanced", color: "bg-orange-500" },
        { name: "Tailwind CSS", level: "Advanced", color: "bg-cyan-500" },
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Java", level: "Advanced", color: "bg-red-500" },
        { name: "Spring Boot", level: "Advanced", color: "bg-green-600" },
        { name: "Spring Security", level: "Intermediate", color: "bg-green-500" },
        { name: "Hibernate/JPA", level: "Advanced", color: "bg-orange-500" },
        { name: "Python", level: "Intermediate", color: "bg-blue-400" },
        { name: "REST API", level: "Advanced", color: "bg-blue-600" },
        { name: "Microservices", level: "Intermediate", color: "bg-indigo-500" },
      ]
    },
    {
      title: "Databases",
      icon: "🗄️",
      skills: [
        { name: "MySQL", level: "Advanced", color: "bg-blue-500" },
        { name: "PostgreSQL", level: "Intermediate", color: "bg-blue-600" },
        { name: "MongoDB", level: "Intermediate", color: "bg-green-500" },
        { name: "Redis", level: "Basic", color: "bg-red-500" },
      ]
    },
    {
      title: "Tools & Technologies",
      icon: "🔧",
      skills: [
        { name: "Git & GitHub", level: "Advanced", color: "bg-gray-700" },
        { name: "Docker", level: "Intermediate", color: "bg-blue-500" },
        { name: "Maven", level: "Advanced", color: "bg-orange-600" },
        { name: "IntelliJ IDEA", level: "Advanced", color: "bg-purple-500" },
        { name: "VS Code", level: "Advanced", color: "bg-blue-600" },
        { name: "Postman", level: "Advanced", color: "bg-orange-500" },
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      skills: [
        { name: "AWS", level: "Basic", color: "bg-orange-500" },
        { name: "Linux", level: "Intermediate", color: "bg-yellow-600" },
        { name: "CI/CD", level: "Intermediate", color: "bg-green-500" },
        { name: "Vercel", level: "Intermediate", color: "bg-black" },
      ]
    },
    {
      title: "Soft Skills",
      icon: "🤝",
      skills: [
        { name: "Problem Solving", level: "Advanced", color: "bg-purple-500" },
        { name: "Team Collaboration", level: "Advanced", color: "bg-pink-500" },
        { name: "Communication", level: "Advanced", color: "bg-teal-500" },
        { name: "Quick Learning", level: "Advanced", color: "bg-indigo-500" },
      ]
    }
  ];

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "Advanced": return "90%";
      case "Intermediate": return "70%";
      case "Basic": return "50%";
      default: return "50%";
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills spanning both frontend and backend development, 
            gained through 2+ years of Java development experience
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 animate-fade-up"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">{category.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {skill.level}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`${skill.color} h-2 rounded-full transition-all duration-500 ease-out group-hover:animate-pulse`}
                          style={{ 
                            width: getLevelWidth(skill.level),
                            animationDelay: `${(categoryIndex * 4 + skillIndex) * 0.1}s`
                          }}
                        ></div>
                      </div>
                      
                      {/* Skill Level Badge */}
                      <div
                        className={`absolute -top-8 ${skill.color} text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        style={{ left: getLevelWidth(skill.level) }}
                      >
                        {skill.level}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications or Additional Info */}
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Continuous Learning Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              I believe in continuous improvement and staying updated with the latest technologies. 
              Currently exploring advanced React patterns, cloud-native solutions, and modern full-stack architectures.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <p className="font-semibold text-gray-900 dark:text-white">Learning</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">React Native, GraphQL</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-semibold text-gray-900 dark:text-white">Practicing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">System Design, AWS</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <p className="font-semibold text-gray-900 dark:text-white">Exploring</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cloud Architecture, AI/ML</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;