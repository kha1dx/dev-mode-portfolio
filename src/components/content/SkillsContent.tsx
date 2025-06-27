
import { Code2, Database, Cloud, Wrench, Smartphone, Globe } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code2,
    color: 'text-[#61dafb]',
    skills: [
      { name: 'React', level: 95, color: 'bg-[#61dafb]' },
      { name: 'TypeScript', level: 90, color: 'bg-[#3178c6]' },
      { name: 'Next.js', level: 85, color: 'bg-[#ffffff]' },
      { name: 'Tailwind CSS', level: 90, color: 'bg-[#38bdf8]' },
      { name: 'JavaScript', level: 95, color: 'bg-[#f7df1e]' }
    ]
  },
  {
    title: 'Backend Development',
    icon: Database,
    color: 'text-[#4ec9b0]',
    skills: [
      { name: 'Node.js', level: 88, color: 'bg-[#339933]' },
      { name: 'Python', level: 85, color: 'bg-[#3776ab]' },
      { name: 'PostgreSQL', level: 80, color: 'bg-[#336791]' },
      { name: 'MongoDB', level: 75, color: 'bg-[#47a248]' },
      { name: 'GraphQL', level: 70, color: 'bg-[#e10098]' }
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'text-[#ff9900]',
    skills: [
      { name: 'AWS', level: 80, color: 'bg-[#ff9900]' },
      { name: 'Docker', level: 85, color: 'bg-[#2496ed]' },
      { name: 'Kubernetes', level: 65, color: 'bg-[#326ce5]' },
      { name: 'CI/CD', level: 75, color: 'bg-[#4caf50]' },
      { name: 'Terraform', level: 60, color: 'bg-[#7b42bc]' }
    ]
  },
  {
    title: 'Tools & Others',
    icon: Wrench,
    color: 'text-[#f39c12]',
    skills: [
      { name: 'Git', level: 95, color: 'bg-[#f05032]' },
      { name: 'VS Code', level: 98, color: 'bg-[#007acc]' },
      { name: 'Figma', level: 70, color: 'bg-[#f24e1e]' },
      { name: 'Jest', level: 80, color: 'bg-[#c21325]' },
      { name: 'Webpack', level: 75, color: 'bg-[#8dd6f9]' }
    ]
  }
];

export const SkillsContent = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#2a2a2a] to-[#1e1e1e] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">
            Technical <span className="text-[#4ec9b0]">Skills</span>
          </h1>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
            across various technologies and tools.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.title}
                className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${categoryIndex * 150}ms` }}
              >
                <div className="flex items-center mb-6">
                  <IconComponent className={`w-6 h-6 ${category.color} mr-3`} />
                  <h2 className="text-xl font-semibold text-white">{category.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="animate-fade-in"
                      style={{ animationDelay: `${(categoryIndex * 150) + (skillIndex * 100)}ms` }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#cccccc] font-medium">{skill.name}</span>
                        <span className="text-[#569cd6] text-sm font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-[#1e1e1e] rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${(categoryIndex * 150) + (skillIndex * 100) + 300}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Continuous Learning</h3>
            <p className="text-[#cccccc] mb-6">
              I'm always exploring new technologies and expanding my skill set. Currently diving deep into:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Rust', 'WebAssembly', 'Machine Learning', 'Blockchain', 'Edge Computing'].map((tech) => (
                <span
                  key={tech}
                  className="bg-[#1e1e1e] border border-[#569cd6] text-[#569cd6] px-3 py-1 rounded-full text-sm hover:bg-[#569cd6] hover:text-white transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
