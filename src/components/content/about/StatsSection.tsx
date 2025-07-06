export const StatsSection = () => {
  const stats = [
    {
      number: "5+",
      label: "Years of Design Experience",
      color: "from-pink-500 to-purple-600",
    },
    {
      number: "50+",
      label: "Overall Global Customers",
      color: "from-purple-500 to-pink-600",
    },
    {
      number: "90+",
      label: "Projects I Have Worked on",
      color: "from-pink-600 to-purple-500",
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
              <p className="text-gray-300 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
