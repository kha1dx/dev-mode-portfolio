import React from "react";

export const CompaniesSection = () => {
  const companies = [
    "Zeus Learning",
    "LinkedIn", 
    "Zepto",
    "Swiggy",
    "YO!",
    "Union Living",
    "My Captain",
    "Accenture",
    "Brurada",
    "Others",
  ];

  return (
    <section className="relative py-24 px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/10 via-transparent to-cyan-900/10"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-sm font-medium">Trusted by Industry Leaders</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent mb-4">
            Companies I've
          </h2>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Worked With
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mt-8"></div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/50 hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 backdrop-blur-xl bg-slate-900/40 hover:bg-slate-900/60"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-transparent to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10 px-6 py-4 text-center">
                <span className="text-slate-400 group-hover:text-cyan-300 transition-all duration-300 text-sm font-medium">
                  {company}
                </span>
              </div>

              {/* Glow Effects */}
              <div className="absolute -right-8 -top-8 z-0 h-16 w-16 rounded-2xl blur-2xl transition-all duration-700 group-hover:h-20 group-hover:w-20 group-hover:blur-xl bg-cyan-500/15" />
              <div className="absolute -left-6 -bottom-6 z-0 h-12 w-12 rounded-2xl blur-2xl transition-all duration-700 group-hover:h-16 group-hover:w-16 bg-blue-500/10" />
              
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
              
              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg shadow-cyan-500/20" />
            </div>
          ))}
        </div>

        {/* Bottom Floating Elements */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl">
            <div className="flex -space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            <span className="text-slate-400 text-sm">
              Building products that scale globally
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
};