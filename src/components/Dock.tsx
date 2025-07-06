interface DockProps {
  onNavigate: (action: string) => void;
}

export const Dock = ({ onNavigate }: DockProps) => {
  const dockItems = [
    {
      id: 'contact',
      image: '/mail.png',
      label: 'Contact',
      action: 'contact'
      
    },
    {
      id: 'home',
      image: '/home.png',
      label: 'Home',
      action: 'home'
      
    },
    {
      id: 'projects',
      image: '/projects.png',
      label: 'Projects',
      action: 'projects'
    },
    {
      id: 'chat',
      image: '/chatbot.png',
      label: 'Assistant',
      action: 'chat'
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 pb-4">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl px-3 py-1 shadow-2xl">
        <div className="flex items-end space-x-2">
          {dockItems.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.action)}
                className={`group relative p-0 rounded-xl transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-3 active:scale-110 shadow-lg hover:shadow-xl`}
                title={item.label}
              >
                <img 
                  src={item.image} 
                  alt={item.label}
                  className="w-12 h-12 transition-all object-cover duration-300 "
                />
                
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
      

