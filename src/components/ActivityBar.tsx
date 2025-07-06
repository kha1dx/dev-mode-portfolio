import {
  Files,
  Search,
  GitBranch,
  Terminal,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";

interface ActivityBarProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
}

export const ActivityBar = ({
  activePanel,
  onPanelChange,
}: ActivityBarProps) => {
  const activities = [
    { id: "explorer", icon: Files, label: "Explorer" },
    { id: "search", icon: Search, label: "Search" },
    { id: "git", icon: GitBranch, label: "Source Control" },
    { id: "terminal", icon: Terminal, label: "Terminal" },
    { id: "chat", icon: MessageSquare, label: "Portfolio Assistant" },
  ];

  const bottomActivities = [
    { id: "profile", icon: User, label: "Account" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const ActivityButton = ({
    activity,
  }: {
    activity: (typeof activities)[0];
  }) => (
    <div className="w-12 h-12 flex items-center justify-center relative group">
      <button
        onClick={() => onPanelChange(activity.id)}
        className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
          activePanel === activity.id
            ? "text-white bg-[#007acc]"
            : "text-[#858585] hover:text-white hover:bg-[#3e3e42]"
        }`}
        title={activity.label}
      >
        <activity.icon className="w-6 h-6" />
      </button>

      {/* Active indicator */}
      {activePanel === activity.id && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-6 bg-white rounded-r" />
      )}

      {/* Tooltip */}
      <div className="absolute left-12 bg-[#2c2c2c] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
        {activity.label}
      </div>
    </div>
  );

  return (
    <div className="w-12 bg-[#2c2c2c] flex flex-col border-r border-[#3e3e42]">
      {/* Top Activities */}
      <div className="flex-1">
        {activities.map((activity) => (
          <ActivityButton key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Bottom Activities */}
      <div className="border-t border-[#3e3e42]">
        {bottomActivities.map((activity) => (
          <ActivityButton key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};
