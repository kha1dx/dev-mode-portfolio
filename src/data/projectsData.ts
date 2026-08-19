export interface ProjectData {


  //wide:col-span-1 md:col-span-3 lg:col-span-3
  //large:col-span-1 md:col-span-2 lg:col-span-2 z-10
  //medium:col-span-1

    
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
  featured?: boolean;
  status?: "live" | "in-development";
}

export const projectsData: readonly ProjectData[] = [
  {
    id: "AgileTranslate",
    title: "Agile Translate",
    icon: "🌐",
    image: "agile-translate.jpg",
    description: "AI-powered translation platform that converts PowerPoint decks between English and Arabic, preserving every layout while transforming designs between RTL and LTR. Built at Agile Worx.",
    className: "col-span-1 md:col-span-3 lg:col-span-3",
    size: "wide",
    featured: true,
    status: "in-development",
    technologies: ["AI Translation", "Firebase Auth", "Cloud SQL", "RTL/LTR Engine", "PowerPoint Automation"],
    liveUrl: "https://www.theagileworx.com/products/slideworx"
  },
  {
    id: "Deema",
    title: "Deema",
    icon: "🌙",
    image: "deema.jpg",
    description: "A bilingual habit tracker built around Islamic worship. Logs on sliders instead of checkboxes, so a hard day still counts for what it was, and surfaces cross-habit patterns like which nights cost you Fajr. Named from the hadith «كان عمله ديمة».",
    className: "col-span-1 md:col-span-3 lg:col-span-3",
    size: "wide",
    featured: true,
    status: "live",
    technologies: ["Next.js", "Supabase", "Google OAuth", "PWA", "Arabic / English i18n"],
    liveUrl: "https://deema.khal1dx.com"
  },
  {
    id: "innovisionary",
    title: "Innovisionary Creative",
    icon: "🎬",
    image: "innovisionary-site.jpg",
    featured: true,
    description: "The creative studio I founded, covering brand identity, video, motion graphics, and campaign work for restaurants, fintech, and creators. I designed and built its site from the ground up.",
    className: "col-span-1",
    size: "medium",
    status: "live",
    technologies: ["Brand Design", "Video Editing", "Motion Graphics", "Art Direction"],
    liveUrl: "https://innovisionary.khal1dx.com"
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
    githubUrl: "https://github.com/kha1dx/HabitKit"
  },
  {
    id: "unyt",
    title: "unyt.org Platform",
    icon: "🛰️",
    image: "unyt.jpg",
    description: "Contributed to unyt.org's open-source ecosystem for decentralized full-stack development during my time as a software engineer there.",
    className: "col-span-1",
    size: "medium",
    status: "live",
    technologies: ["TypeScript", "Deno", "Open Source"],
    liveUrl: "https://unyt.org"
  },
  {
    id: "SCAD",
    title: "SCAD Internships",
    icon: "🎓",
    image: "scad.jpg",
    description: "University internship portal with application tracking and company matching",
    className: "col-span-1 md:col-span-3 lg:col-span-3",
    size: "wide",
    technologies: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    status: "live",
    liveUrl: "https://scad.khal1dx.com"
  },
  {
    id: "KAI",
    title: "KAI Assistant",
    icon: "🤖",
    image: "project4.jpeg",
    description: "AI-powered personal assistant with natural language processing",
    className: "col-span-1",
    size: "medium",
    technologies: ["Python", "OpenAI API", "Flask", "React"]
  },
  {
    id: "Movies",
    title: "Movies App",
    icon: "🎬",
    image: "project1.jpeg",
    description: "A modern movie discovery app with ratings, reviews, and watchlist features",
    className: "col-span-1 md:col-span-2 lg:col-span-1 z-10",
    size: "medium",
    technologies: ["React", "TypeScript", "TMDb API", "Tailwind CSS"]
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
