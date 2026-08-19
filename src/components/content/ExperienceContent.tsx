import {
  Calendar,
  MapPin,
  Briefcase,
  Award,
  ExternalLink,
  Cloud,
} from "lucide-react";
import { careerTimeline, credentials } from "@/data/careerData";
import { profile, emailHref } from "@/data/profile";

// Newest first: the experience page reads top down as a reverse timeline.
const experiences = [...careerTimeline].reverse();

// Google Cloud services get their own callout since they carry the current role.
const cloudStack = [
  {
    name: "Cloud Run",
    detail: "Containerized services for the translation pipeline and API",
  },
  {
    name: "Cloud Storage",
    detail: "Uploaded decks and generated artifacts, scanned on arrival",
  },
  {
    name: "Cloud SQL",
    detail: "Application data behind the platform",
  },
  {
    name: "Firebase Auth",
    detail: "Sign-in and session handling across the product",
  },
];

export const ExperienceContent = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#2a2a2a] to-[#1e1e1e] p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">
            Professional <span className="text-[#4ec9b0]">Experience</span>
          </h1>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            Software engineer and AI developer, currently building AI products
            on Google Cloud. Before that, open-source tooling in Vue, freelance
            AI work, and a design studio I started myself.
          </p>
        </div>

        {/* Google Cloud focus */}
        <div className="mb-12 bg-[#252526] border border-[#3e3e42] rounded-lg p-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <Cloud className="w-6 h-6 text-[#4285f4] mr-3 flex-shrink-0" />
            <h2 className="text-xl font-semibold text-white">
              Working on <span className="text-[#4285f4]">Google Cloud</span>
            </h2>
          </div>
          <p className="text-[#cccccc] mb-6">
            Day to day I build on Google Cloud with the team at Agile Worx,
            alongside Firebase for authentication.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {cloudStack.map((service) => (
              <div
                key={service.name}
                className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-4 hover:border-[#4285f4] transition-colors duration-300"
              >
                <h3 className="text-white font-medium mb-1">{service.name}</h3>
                <p className="text-[#858585] text-sm">{service.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#569cd6] opacity-50 hidden sm:block"></div>

          {experiences.map((exp, index) => (
            <div
              key={`${exp.org}-${exp.period}`}
              className="relative flex items-start mb-12 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-6 w-4 h-4 rounded-full border-4 border-[#1e1e1e] z-10 hidden sm:block ${
                  exp.current ? "bg-[#4ec9b0]" : "bg-[#569cd6]"
                }`}
              ></div>

              {/* Content */}
              <div className="sm:ml-16 bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 w-full">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h3 className="text-xl font-semibold text-white">
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#4ec9b0]/15 text-[#4ec9b0] border border-[#4ec9b0]/40">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-[#4ec9b0]">
                      <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="font-medium">{exp.org}</span>
                      <span className="text-[#858585] text-sm ml-2">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="flex items-center sm:justify-end text-[#cccccc] mb-1">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center sm:justify-end text-[#cccccc]">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">What I did</h4>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-[#cccccc] text-sm flex items-start"
                      >
                        <span className="text-[#4ec9b0] mr-2">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#1e1e1e] text-[#569cd6] px-2 py-1 rounded text-sm border border-[#3e3e42]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Programs & Awards */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Programs & <span className="text-[#4ec9b0]">Awards</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {credentials.map((credential, index) => (
              <div
                key={credential.name}
                className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Award className="w-8 h-8 text-[#ffd700] flex-shrink-0" />
                  <span className="text-[#569cd6] text-sm font-mono">
                    {credential.date}
                  </span>
                </div>
                <h3 className="text-white font-medium mb-1">
                  {credential.name}
                </h3>
                <p className="text-[#4ec9b0] text-sm mb-2">
                  {credential.issuer}
                </p>
                <p className="text-[#858585] text-sm">
                  {credential.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-[#252526] border border-[#3e3e42] rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">
            Let's Work Together
          </h3>
          <p className="text-[#cccccc] mb-6">
            I'm always interested in new opportunities and challenging projects.
          </p>
          <a
            href={emailHref}
            className="bg-[#4ec9b0] hover:bg-[#3a9b87] text-[#1e1e1e] px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 font-medium"
          >
            Get In Touch
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-[#858585] text-sm mt-4 font-mono">
            {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
};
