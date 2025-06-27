
import { Calendar, MapPin, Briefcase, Award, ExternalLink } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    type: 'Full-time',
    description: 'Lead developer for high-traffic web applications serving 1M+ users. Architected scalable solutions using React, Node.js, and AWS.',
    achievements: [
      'Improved application performance by 40% through optimization',
      'Led a team of 5 developers on major product releases',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Mentored junior developers and conducted code reviews'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Docker']
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'StartupHub Inc.',
    location: 'Remote',
    period: '2020 - 2022',
    type: 'Full-time',
    description: 'Developed and maintained multiple client projects, from e-commerce platforms to SaaS applications.',
    achievements: [
      'Built 15+ production applications from scratch',
      'Collaborated with design teams to implement pixel-perfect UIs',
      'Integrated payment systems and third-party APIs',
      'Maintained 99.9% uptime across all deployed applications'
    ],
    technologies: ['React', 'Python', 'Django', 'MongoDB', 'Redis', 'Stripe API']
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'WebDesign Pro',
    location: 'New York, NY',
    period: '2019 - 2020',
    type: 'Full-time',
    description: 'Specialized in creating responsive, interactive web interfaces for various industries.',
    achievements: [
      'Converted 50+ design mockups to functional websites',
      'Improved website loading speeds by 35% on average',
      'Implemented responsive designs supporting all device sizes',
      'Collaborated with UX designers to enhance user experience'
    ],
    technologies: ['JavaScript', 'Vue.js', 'Sass', 'Webpack', 'Figma']
  },
  {
    id: 4,
    title: 'Junior Web Developer',
    company: 'Digital Agency',
    location: 'Boston, MA',
    period: '2018 - 2019',
    type: 'Full-time',
    description: 'Started my professional journey building websites and learning modern web development practices.',
    achievements: [
      'Completed 25+ client projects successfully',
      'Learned modern JavaScript frameworks and best practices',
      'Contributed to team knowledge sharing sessions',
      'Received "Most Improved Developer" award'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP', 'MySQL']
  }
];

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    credential: 'AWS-CSA-2023-001'
  },
  {
    name: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    date: '2022',
    credential: 'GCP-PD-2022-045'
  },
  {
    name: 'Meta React Developer Certificate',
    issuer: 'Meta',
    date: '2021',
    credential: 'META-RD-2021-789'
  }
];

export const ExperienceContent = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-[#1e1e1e] via-[#2a2a2a] to-[#1e1e1e] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">
            Professional <span className="text-[#4ec9b0]">Experience</span>
          </h1>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            5+ years of experience building scalable web applications and leading development teams.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#569cd6] opacity-50"></div>
          
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative flex items-start mb-12 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-[#4ec9b0] rounded-full border-4 border-[#1e1e1e] z-10"></div>
              
              {/* Content */}
              <div className="ml-16 bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 hover:scale-105 w-full">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                    <div className="flex items-center text-[#4ec9b0] mb-2">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-[#cccccc] mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center text-[#cccccc]">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-[#cccccc] mb-4">{exp.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-[#cccccc] text-sm flex items-start">
                        <span className="text-[#4ec9b0] mr-2">•</span>
                        {achievement}
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

        {/* Certifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Certifications & <span className="text-[#4ec9b0]">Awards</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#569cd6] transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Award className="w-8 h-8 text-[#ffd700] flex-shrink-0" />
                  <span className="text-[#569cd6] text-sm font-mono">{cert.date}</span>
                </div>
                <h3 className="text-white font-medium mb-2">{cert.name}</h3>
                <p className="text-[#cccccc] text-sm mb-2">{cert.issuer}</p>
                <div className="flex items-center text-[#6a9955] text-xs">
                  <span className="mr-1">ID:</span>
                  <span className="font-mono">{cert.credential}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-[#252526] border border-[#3e3e42] rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Let's Work Together</h3>
          <p className="text-[#cccccc] mb-6">
            I'm always interested in new opportunities and challenging projects.
          </p>
          <a
            href="mailto:john.doe@example.com"
            className="bg-[#4ec9b0] hover:bg-[#3a9b87] text-[#1e1e1e] px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 font-medium"
          >
            Get In Touch
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
