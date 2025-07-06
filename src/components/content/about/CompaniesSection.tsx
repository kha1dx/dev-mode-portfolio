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
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">
          Companies I've Worked With
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {companies.map((company, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-full border border-[#585858]/50 hover:border-[#FFB000]/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-[#1C1C1C]/50"
            >
              <div className="px-6 py-3 text-center">
                <span className="text-[#9F9F9F] group-hover:text-white transition-colors duration-300 text-sm">
                  {company}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF589C]/10 to-[#5B6CFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
