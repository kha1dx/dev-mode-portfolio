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

const formatRelativeTime = (isoDate: string) => {
  const then = new Date(isoDate).getTime();
  if (Number.isNaN(then)) return "unknown";

  const seconds = Math.round((Date.now() - then) / 1000);
  if (seconds < 60) return "just now";

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  for (const [unit, secondsInUnit] of units) {
    if (seconds >= secondsInUnit) {
      return rtf.format(-Math.floor(seconds / secondsInUnit), unit);
    }
  }
  return "just now";
};

export const GitPanel = () => {
  const [gitStats, setGitStats] = useState<GitStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitStats = async () => {
      setLoading(true);
      
      try {
        // Fetch user data from GitHub API
        const username = 'kha1dx';
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const reposData = await reposResponse.json();
        
        if (!Array.isArray(reposData)) {
          throw new Error('Failed to fetch repositories');
        }
        
        // Calculate stats
        const totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
        const totalForks = reposData.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);
        
        // Get language statistics across owned (non-fork) repos.
        // The denominator is the number of repos that report a primary language,
        // so the percentages are a share of those repos and can never exceed 100%.
        const ownedRepos = reposData.filter(repo => !repo.fork);
        const languages: Record<string, number> = {};
        let reposWithLanguage = 0;
        for (const repo of ownedRepos) {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
            reposWithLanguage += 1;
          }
        }
        const languageColors = {
          'TypeScript': '#3178c6',
          'JavaScript': '#f7df1e',
          'Python': '#3776ab',
          'HTML': '#e34f26',
          'CSS': '#1572b6',
          'Java': '#ed8b00',
          'C++': '#00599c',
          'Go': '#00add8',
          'Rust': '#dea584',
          'Vue': '#4fc08d'
        };
        
        const languageArray = Object.entries(languages)
          .map(([name, count]) => ({
            name,
            percentage: reposWithLanguage
              ? Math.round(((count as number) / reposWithLanguage) * 100)
              : 0,
            color: languageColors[name] || '#cccccc'
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);
        
        // Get recent repositories
        const recentRepos = ownedRepos
          .slice(0, 3)
          .map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            stars: repo.stargazers_count || 0,
            language: repo.language || 'Unknown',
            updated: formatRelativeTime(repo.updated_at)
          }));
        
        setGitStats({
          totalRepos: userData.public_repos || 0,
          totalStars,
          totalForks,
          totalCommits: 1247, // GitHub API doesn't provide total commits easily
          streak: 15, // Would need GitHub commits API for accurate streak
          languages: languageArray,
          recentRepos
        });
        
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Fallback to mock data
        setGitStats({
          totalRepos: 25,
          totalStars: 85,
          totalForks: 20,
          totalCommits: 850,
          streak: 12,
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
      } finally {
        setLoading(false);
      }
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
                <a 
                  href={`https://github.com/kha1dx/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4fc1ff] text-sm font-medium hover:underline"
                >
                  {repo.name}
                </a>
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

        <a 
          href="https://github.com/kha1dx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full mt-3 py-2 text-[#4fc1ff] text-sm hover:bg-[#2d2d30] rounded transition-colors block text-center"
        >
          View all repositories →
        </a>
      </div>
    </div>
  );
};