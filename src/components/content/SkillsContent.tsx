
const skills = {
  frontend: {
    name: 'Frontend Development',
    icon: '🎨',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 }
    ]
  },
  backend: {
    name: 'Backend Development',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 }
    ]
  },
  devops: {
    name: 'DevOps & Cloud',
    icon: '☁️',
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 70 },
      { name: 'CI/CD', level: 80 }
    ]
  }
};

export const SkillsContent = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#252526] to-[#1e1e1e] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">
            My <span className="text-[#569cd6]">Skills</span>
          </h1>
          <p className="text-[#cccccc] text-lg">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-8">
          {Object.entries(skills).map(([key, category], index) => (
            <div
              key={key}
              className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-xl font-semibold text-white">{category.name}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="animate-fade-in"
                    style={{ animationDelay: `${(index * 200) + (skillIndex * 100)}ms` }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#cccccc] font-medium">{skill.name}</span>
                      <span className="text-[#569cd6] text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#1e1e1e] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#569cd6] to-[#4ec9b0] h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${(index * 200) + (skillIndex * 100) + 500}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 bg-[#252526] border border-[#3e3e42] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>🛠️</span> Additional Tools & Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              'Git', 'GitHub', 'VS Code', 'Figma', 'Jest', 'Cypress',
              'Redis', 'GraphQL', 'REST APIs', 'Microservices', 'Linux', 'Nginx'
            ].map((tool, index) => (
              <div
                key={tool}
                className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-3 text-center text-[#cccccc] hover:border-[#569cd6] hover:text-[#569cd6] transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 bg-[#252526] border border-[#3e3e42] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>🏆</span> Certifications
          </h3>
          <div className="space-y-3">
            {[
              'AWS Certified Solutions Architect',
              'Google Cloud Professional Developer',
              'Certified Kubernetes Administrator (CKA)'
            ].map((cert, index) => (
              <div
                key={cert}
                className="flex items-center gap-3 text-[#cccccc] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-[#4ec9b0] rounded-full"></div>
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
