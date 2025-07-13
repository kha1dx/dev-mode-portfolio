export interface ProjectData {
    
  id: string;
  title: string;
  icon: string;
  image: string; // Path to project showcase image
  description: string;
  className: string;
  size: "small" | "medium" | "large" | "wide";
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: readonly ProjectData[] = [
  {
    id: "Movies",
    title: "Movies",
    icon: "💻",
    image: "project1.png", // Placeholder for project image
    description: "Advanced video conferencing platform with real-time collaboration features",
    className: "col-span-1 md:col-span-2 lg:col-span-2",
    size: "large",
    technologies: ["React", "WebRTC", "Node.js", "Socket.io"],
    liveUrl: "https://vicario-demo.com",
    githubUrl: "https://github.com/kha1dx/Movie-app"
  },
  {
    id: "befit",
    title: "BeFit",
    icon: "📱",
    image: "project2.png", // Placeholder for project image
    description: "Personalized fitness tracking mobile application",
    className: "col-span-1",
    size: "medium",
    technologies: ["React Native", "Firebase", "Redux"],
    liveUrl: "https://befit-app.com",
    githubUrl: "https://github.com/username/befit"
  },
  {
    id: "bravo",
    title: "BRAVO",
    icon: "🏢",
    image: "project3.png", // Placeholder for project image
    description: "Modern corporate website with dynamic content management",
    className: "col-span-1 md:col-span-3 lg:col-span-3",
    size: "wide",
    technologies: ["Next.js", "Sanity CMS", "Tailwind CSS"],
    liveUrl: "https://bravo-corp.com",
    githubUrl: "https://github.com/username/bravo"
  },
  {
    id: "tastify",
    title: "TASTIFY",
    icon: "🍔",
    image: "project4.png", // Placeholder for project image
    description: "Smart food delivery app with AI recommendations",
    className: "col-span-1",
    size: "medium",
    technologies: ["Vue.js", "Python", "TensorFlow", "PostgreSQL"],
    liveUrl: "https://tastify-app.com",
    githubUrl: "https://github.com/username/tastify"
  },
  {
    id: "ai-platform",
    title: "AI Platform",
    icon: "🤖",
    image: "see-more.png", // Placeholder for project image
    description: "Intelligent dashboard with machine learning analytics",
    className: "col-span-1 md:col-span-2 lg:col-span-2",
    size: "large",
    technologies: ["React", "Python", "FastAPI", "MongoDB"],
    liveUrl: "https://ai-platform-demo.com",
    githubUrl: "https://github.com/username/ai-platform"
  }
  ,
] as const;
