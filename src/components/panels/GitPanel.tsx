import { useState, useEffect } from "react";
import {
  GitBranch,
  Star,
  GitFork,
  Eye,
  Calendar,
  ExternalLink,
  User,
  Award,
} from "lucide-react";

interface GitStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  streak: number;
  languages: { name: string; percentage: number; color: string }[];
  recentRepos: {
    name: string;
    description: string;
    stars: number;
    language: string;
    updated: string;
  }[];
}

export const GitPanel = () => {
  const [gitStats, setGitStats] = useState<GitStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching GitHub stats
    const fetchGitStats = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with real GitHub API calls
      setGitStats({
        totalRepos: 42,
        totalStars: 128,
        totalForks: 35,
        totalCommits: 1247,
        streak: 15,
        languages: [
          { name: "TypeScript", percentage: 45, color: "#3178c6" },
          { name: "JavaScript", percentage: 30, color: "#f7df1e" },
          { name: "Python", percentage: 15, color: "#3776ab" },
          { name: "HTML", percentage: 10, color: "#e34f26" },
        ],
        recentRepos: [
          {
            name: "portfolio-website",
            description: "Personal portfolio built with React and TypeScript",
            stars: 24,
            language: "TypeScript",
            updated: "2 days ago",
          },
          {
            name: "task-manager-app",
            description: "Full-stack task management application",
            stars: 18,
            language: "Python",
            updated: "1 week ago",
          },
          {
            name: "weather-api",
            description: "RESTful weather API with caching",
            stars: 12,
            language: "JavaScript",
            updated: "2 weeks ago",
          },
        ],
      });
      setLoading(false);
    };

    fetchGitStats();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-[#858585]">Loading GitHub stats...</div>
      </div>
    );
  }

  if (!gitStats) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-[#858585]">Failed to load GitHub stats</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* User Stats */}
      <div className="p-4 border-b border-[#3e3e42]">
        <div className="flex items-center mb-3">
          <User className="w-5 h-5 mr-2 text-[#858585]" />
          <span className="text-[#cccccc] font-medium">GitHub Profile</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#2d2d30] rounded p-3 text-center">
            <div className="text-[#cccccc] text-lg font-bold">
              {gitStats.totalRepos}
            </div>
            <div className="text-[#858585] text-xs">Repositories</div>
          </div>
          <div className="bg-[#2d2d30] rounded p-3 text-center">
            <div className="text-[#cccccc] text-lg font-bold">
              {gitStats.totalStars}
            </div>
            <div className="text-[#858585] text-xs">Stars</div>
          </div>
          <div className="bg-[#2d2d30] rounded p-3 text-center">
            <div className="text-[#cccccc] text-lg font-bold">
              {gitStats.totalForks}
            </div>
            <div className="text-[#858585] text-xs">Forks</div>
          </div>
          <div className="bg-[#2d2d30] rounded p-3 text-center">
            <div className="text-[#cccccc] text-lg font-bold">
              {gitStats.streak}
            </div>
            <div className="text-[#858585] text-xs">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="p-4 border-b border-[#3e3e42]">
        <div className="flex items-center mb-3">
          <Award className="w-5 h-5 mr-2 text-[#858585]" />
          <span className="text-[#cccccc] font-medium">Top Languages</span>
        </div>

        <div className="space-y-2">
          {gitStats.languages.map((lang) => (
            <div key={lang.name} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-[#cccccc] text-sm flex-1">{lang.name}</span>
              <span className="text-[#858585] text-sm">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Repositories */}
      <div className="p-4">
        <div className="flex items-center mb-3">
          <GitBranch className="w-5 h-5 mr-2 text-[#858585]" />
          <span className="text-[#cccccc] font-medium">
            Recent Repositories
          </span>
        </div>

        <div className="space-y-3">
          {gitStats.recentRepos.map((repo) => (
            <div
              key={repo.name}
              className="bg-[#2d2d30] rounded p-3 hover:bg-[#3e3e42] transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-[#4fc1ff] text-sm font-medium cursor-pointer hover:underline">
                  {repo.name}
                </h4>
                <ExternalLink className="w-3 h-3 text-[#858585]" />
              </div>

              <p className="text-[#cccccc] text-xs mb-2 line-clamp-2">
                {repo.description}
              </p>

              <div className="flex items-center justify-between text-xs text-[#858585]">
                <div className="flex items-center space-x-3">
                  <span>{repo.language}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {repo.stars}
                  </div>
                </div>
                <span>{repo.updated}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-3 py-2 text-[#4fc1ff] text-sm hover:bg-[#2d2d30] rounded transition-colors">
          View all repositories →
        </button>
      </div>
    </div>
  );
};
