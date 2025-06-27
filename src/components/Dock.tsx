
import { Mail, User, MessageCircle, Home, FolderOpen, Code2 } from 'lucide-react';

interface DockProps {
  onNavigate: (action: string) => void;
}

export const Dock = ({ onNavigate }: DockProps) => {
  const dockItems = [
    {
      id: 'contact',
      icon: Mail,
      label: 'Contact',
      action: 'contact',
      bgColor: 'bg-blue-500',
      iconColor: 'text-white'
    },
    {
      id: 'home',
      icon: Home,
      label: 'Portfolio',
      action: 'home',
      bgColor: 'bg-green-500',
      iconColor: 'text-white'
    },
    {
      id: 'projects',
      icon: FolderOpen,
      label: 'Projects',
      action: 'projects',
      bgColor: 'bg-purple-500',
      iconColor: 'text-white'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Assistant',
      action: 'chat',
      bgColor: 'bg-orange-500',
      iconColor: 'text-white'
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 pb-4">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl px-3 py-2 shadow-2xl">
        <div className="flex items-end space-x-1">
          {dockItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.action)}
                className={`group relative p-3 rounded-xl ${item.bgColor} transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-3 active:scale-110 shadow-lg hover:shadow-xl`}
                title={item.label}
              >
                <IconComponent className={`w-6 h-6 ${item.iconColor} transition-all duration-300`} />
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
                
                {/* Reflection effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
