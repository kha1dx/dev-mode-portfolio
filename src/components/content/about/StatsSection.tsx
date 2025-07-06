export const StatsSection = () => {
  const stats = [
    {
      number: "5+",
      label: "Years of Design Experience",
      color: "from-[#FF589C] to-[#5B6CFF]",
    },
    {
      number: "50+",
      label: "Overall Global Customers",
      color: "from-[#FFB000] to-[#FF589C]",
    },
    {
      number: "90+",
      label: "Projects I Have Worked on",
      color: "from-[#5B6CFF] to-[#FFB000]",
    },
  ];

  return (
    <section className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4`}
              >
                {stat.number}
              </div>
              <p className="text-[#9F9F9F] text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
