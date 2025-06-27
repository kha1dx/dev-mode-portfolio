
import { Mail, User, MessageCircle } from 'lucide-react';

interface DockProps {
  onNavigate: (action: string) => void;
}

export const Dock = ({ onNavigate }: DockProps) => {
  const dockItems = [
    {
      id: 'contact',
      icon: Mail,
      label: 'Contact',
      action: 'contact'
    },
    {
      id: 'home',
      icon: User,
      label: 'Portfolio',
      action: 'home'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Chat',
      action: 'chat'
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-[#252526]/90 backdrop-blur-md border border-[#3e3e42] rounded-2xl px-4 py-3 shadow-2xl">
        <div className="flex items-center space-x-2">
          {dockItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.action)}
                className="group relative p-3 rounded-xl bg-[#1e1e1e]/50 hover:bg-[#1e1e1e] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg"
                title={item.label}
              >
                <IconComponent className="w-6 h-6 text-[#cccccc] group-hover:text-[#569cd6] transition-colors duration-300" />
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#1e1e1e] text-[#cccccc] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
