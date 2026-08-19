import { GraduationCap, type LucideIcon } from "lucide-react";

export interface EducationSubEntry {
  period: string;
  title: string;
  institution: string;
  description: string;
}

export interface EducationEntry {
  period: string;
  title: string;
  institution: string;
  description: string;
  icon: LucideIcon;
  current?: boolean;
  subItems?: EducationSubEntry[];
}

// Single source of truth for education: rendered by EducationSection and
// indexed by the portfolio search engine.
export const educationTimeline: EducationEntry[] = [
  {
    period: "2019 – 2022",
    title: "IGCSE Graduate",
    institution: "Modern School",
    description:
      "Completed International General Certificate of Secondary Education",
    icon: GraduationCap,
  },
  {
    period: "2022 – 2027",
    title: "Computer Engineering",
    institution: "German University in Cairo",
    description:
      "Studying Computer Architecture, Databases, Computational Theory, System Design",
    icon: GraduationCap,
    current: true,
    subItems: [
      {
        period: "Sep 2025 – Feb 2026",
        title: "Semester Abroad",
        institution: "German International University, Berlin",
        description:
          "Studied Data Structures and C++ in Berlin, alongside my software engineering internship at unyt.org.",
      },
    ],
  },
];
