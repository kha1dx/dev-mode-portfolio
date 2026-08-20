import { skillCategories, currentlyWorkingWith } from '@/data/skillsData';

export const SkillsContent = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#2a2a2a] to-[#1e1e1e] p-8 pb-24 sm:pb-28 lg:pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">
            Technical <span className="text-[#4ec9b0]">Skills</span>
          </h1>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            The stack I build with as a software engineer and AI developer,
            centred on Google Cloud, Firebase and LLM-backed products.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.title}
                className={`bg-[#252526] border rounded-lg p-6 transition-all duration-300 hover:scale-105 animate-fade-in ${
                  category.featured
                    ? 'border-[#4285f4]/50 hover:border-[#4285f4]'
                    : 'border-[#3e3e42] hover:border-[#569cd6]'
                }`}
                style={{ animationDelay: `${categoryIndex * 150}ms` }}
              >
                <div className="flex items-center mb-6">
                  <IconComponent className={`w-6 h-6 ${category.color} mr-3`} />
                  <h2 className="text-xl font-semibold text-white">{category.title}</h2>
                  {category.featured && (
                    <span className="ml-auto text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#4285f4]/15 text-[#4285f4] border border-[#4285f4]/40">
                      Daily
                    </span>
                  )}
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
            <h3 className="text-xl font-semibold text-white mb-4">What I use day to day</h3>
            <p className="text-[#cccccc] mb-6">
              The stack behind Agile Translate, the AI localization platform I build with the team at Agile Worx:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {currentlyWorkingWith.map((tech) => (
                <span
                  key={tech}
                  className="bg-[#1e1e1e] border border-[#4285f4] text-[#4285f4] px-3 py-1 rounded-full text-sm hover:bg-[#4285f4] hover:text-white transition-all duration-300"
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
