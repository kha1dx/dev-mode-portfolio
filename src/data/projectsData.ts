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
    title: "Movies App",
    icon: "🎬",
    image: "project1.jpeg",
    description: "A modern movie discovery app with ratings, reviews, and watchlist features",
    className: "col-span-1 md:col-span-2 lg:col-span-2 z-10",
    size: "large",
    technologies: ["React", "TypeScript", "TMDb API", "Tailwind CSS"],
    liveUrl: "https://kha1dx-movies.netlify.app",
    githubUrl: "https://github.com/kha1dx/Movie-app"
  },
  {
    id: "HabitKit",
    title: "HabitKit",
    icon: "📱",
    image: "project2.jpeg",
    description: "Personal habit tracking app with progress analytics and goal setting",
    className: "col-span-1",
    size: "medium",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    liveUrl: "https://habitkit-demo.com",
    githubUrl: "https://github.com/kha1dx/HabitKit"
  },
  {
    id: "KAI",
    title: "KAI Assistant",
    icon: "🤖",
    image: "project4.jpeg",
    description: "AI-powered personal assistant with natural language processing",
    className: "col-span-1",
    size: "medium",
    technologies: ["Python", "OpenAI API", "Flask", "React"],
    liveUrl: "https://kai-assistant.herokuapp.com",
    githubUrl: "https://github.com/kha1dx/KAI-Assistant"
  },
  {
    id: "SCAD",
    title: "SCAD Internships",
    icon: "🎓",
    image: "project3.png",
    description: "University internship portal with application tracking and company matching",
    className: "col-span-1 md:col-span-2 lg:col-span-2 z-10",
    size: "large",
    technologies: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://scad-internships.com",
    githubUrl: "https://github.com/kha1dx/SCAD-Internships"
  }
] as const;

// Special "See More Projects" card data
export const seeMoreProjectsData = {
  id: "see-more",
  title: "See More Projects",
  icon: "🚀",
  image: "",
  description: "Explore all my projects and contributions on GitHub",
  className: "col-span-1 md:col-span-3 lg:col-span-3",
  size: "wide" as const,
  isProject: false,
  githubUrl: "https://github.com/kha1dx"
};
