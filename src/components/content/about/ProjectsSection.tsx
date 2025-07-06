export const ProjectsSection = () => {
  const projects = [
    {
      title: "Vicario",
      image: "💻",
      description: "Video conferencing platform",
      className: "col-span-1 md:col-span-2",
    },
    {
      title: "BeFit",
      image: "📱",
      description: "Fitness mobile app",
      className: "col-span-1",
    },
    {
      title: "BRAVO",
      image: "🏢",
      description: "Corporate website",
      className: "col-span-1 md:col-span-3",
    },
    {
      title: "TASTIFY",
      image: "🍔",
      description: "Food delivery app",
      className: "col-span-1",
    },
    {
      title: "AI Platform",
      image: "🤖",
      description: "AI-powered dashboard",
      className: "col-span-1 md:col-span-2",
    },
  ];

  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${project.className} group relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/80 to-[#2D2A8C]/30 border border-[#585858]/50 hover:border-[#FFB000]/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm`}
            >
              <div className="p-8 h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="text-4xl mb-4">{project.image}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[#9F9F9F]">{project.description}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF589C]/10 to-[#5B6CFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
