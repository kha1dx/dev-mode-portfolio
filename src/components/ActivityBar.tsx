import {
  Files,
  Search,
  GitBranch,
  Terminal,
  Bot,
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
    { id: "chat", icon: Bot, label: "Portfolio Assistant" },
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
    <div className="w-8  md:w-12 bg-[#2c2c2c] flex flex-col border-r border-[#3e3e42] min-h-screen">
      {/* Top Activities */}
      <div className="flex-1 pt-2">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="w-full h-8 sm:h-10 md:h-12 flex items-center justify-center relative group"
          >
            <button
              onClick={() => onPanelChange(activity.id)}
              className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded transition-colors ${
                activePanel === activity.id
                  ? "text-white bg-[#007acc]"
                  : "text-[#858585] hover:text-white hover:bg-[#3e3e42]"
              }`}
              title={activity.label}
            >
              <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            {/* Active indicator */}
            {activePanel === activity.id && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-4 sm:h-5 md:h-6 bg-white rounded-r" />
            )}

            {/* Tooltip - hidden on mobile */}
            <div className="hidden md:block absolute left-10 lg:left-12 bg-[#2c2c2c] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
              {activity.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Activities */}
      <div className="border-t border-[#3e3e42] pb-2">
        {bottomActivities.map((activity) => (
          <div
            key={activity.id}
            className="w-full h-full sm:h-10 md:h-12 flex items-center justify-center relative group"
          >
            <button
              onClick={() => onPanelChange(activity.id)}
              className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded transition-colors ${
                activePanel === activity.id
                  ? "text-white bg-[#007acc]"
                  : "text-[#858585] hover:text-white hover:bg-[#3e3e42]"
              }`}
              title={activity.label}
            >
              <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            {/* Active indicator */}
            {activePanel === activity.id && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-4 sm:h-5 md:h-6 bg-white rounded-r" />
            )}

            {/* Tooltip - hidden on mobile */}
            <div className="hidden md:block absolute left-10 lg:left-12 bg-[#2c2c2c] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
              {activity.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
