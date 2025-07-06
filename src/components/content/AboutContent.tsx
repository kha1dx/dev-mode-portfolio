
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AboutContent = () => {
  const skills = [
    "Visual Design", "Rapid prototyping", "User Testing", "Agile Testing", 
    "Design Systems", "Graphic Design"
  ];

  const stats = [
    { number: "5+", label: "Years of Experience", color: "text-blue-400" },
    { number: "50+", label: "Current Global Customers", color: "text-purple-400" },
    { number: "90+", label: "Projects Have Worked on", color: "text-pink-400" }
  ];

  const projects = [
    {
      title: "Vicario",
      description: "Video conferencing platform",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      tags: ["React", "WebRTC"]
    },
    {
      title: "BeFit",
      description: "Fitness tracking application",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      tags: ["Mobile", "Health"]
    },
    {
      title: "URAVO",
      description: "E-commerce platform",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      tags: ["E-commerce", "React"]
    },
    {
      title: "Tastify",
      description: "Food delivery mobile app",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=250&fit=crop",
      tags: ["Mobile", "Food"]
    },
    {
      title: "StreamTech",
      description: "Streaming platform dashboard",
      image: "https://images.unsplash.com/photo-1611068813711-2cdd5d0769f7?w=400&h=200&fit=crop",
      tags: ["Dashboard", "Streaming"]
    }
  ];

  const companies = [
    "Zeus Learning", "LinkedIn", "Zepto", "Swiggy", "YouTube",
    "Union Living", "My Captain", "Accenture", "Brunoda"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-y-auto">
      {/* Hero Section */}
      <div className="relative px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-6xl font-bold mb-4 animate-fade-in">
                  John<br />
                  Doe
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-lg animate-fade-in">
                  An aspiring UX/UI Designer Who breathes life into pixels, crafting interfaces that not only look good but feel even better
                </p>
                <div className="flex gap-4 animate-fade-in">
                  <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3">
                    Hire Me
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-6 py-3">
                    My Story
                  </Button>
                </div>
              </div>
              
              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-gray-800 text-white hover:bg-gray-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Avatar with clouds */}
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center relative overflow-hidden">
                <div className="text-8xl">👨‍💻</div>
                {/* Decorative clouds */}
                <div className="absolute -top-4 -right-4 text-4xl opacity-80">☁️</div>
                <div className="absolute -top-8 right-12 text-3xl opacity-60">☁️</div>
                <div className="absolute top-4 -right-8 text-2xl opacity-70">☁️</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="px-8 py-16 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-8">About Me</h2>
              <div className="flex items-start gap-8">
                <div className="text-6xl">👋</div>
                <div>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Hey there! I'm John, a passionate UX/UX designer armed with creativity and a love for problem-solving. With a blend of design thinking and user-centric approach I'm on a mission to create digital experiences that leave a lasting impression, innovation, and collaboration and bring your vision to life!
                  </p>
                </div>
              </div>
            </div>
            
            {/* Statistics */}
            <div className="flex gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-6xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <p className="text-sm text-gray-400 max-w-20">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="px-8 py-16 bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Companies I've Worked With</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {companies.map((company) => (
              <Badge key={company} variant="outline" className="border-gray-600 text-gray-300 px-4 py-2 text-sm">
                {company}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-8 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">👨‍💻</div>
            <p className="text-gray-400 mb-8">Follow me</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">Professional Links</h3>
              <div className="space-y-2 text-gray-400">
                <div>LinkedIn</div>
                <div>Dribbble</div>
                <div>GitHub</div>
                <div>Figma</div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Menu</h3>
              <div className="space-y-2 text-gray-400">
                <div>Home</div>
                <div>About</div>
                <div>Work</div>
                <div>Contact</div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            © 2024 John Doe. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
