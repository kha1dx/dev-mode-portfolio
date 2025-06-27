
interface ProjectContentProps {
  projectId: string;
}

export const ProjectContent = ({ projectId }: ProjectContentProps) => {
  const getProjectContent = () => {
    switch (projectId) {
      case 'project1':
        return {
          title: 'E-Commerce Application',
          description: 'A full-stack e-commerce platform built with React and Node.js',
          tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe API'],
          features: [
            'User authentication and authorization',
            'Product catalog with search and filtering',
            'Shopping cart and checkout process',
            'Payment integration with Stripe',
            'Admin dashboard for inventory management',
            'Responsive design for mobile and desktop'
          ],
          github: 'https://github.com/johndoe/ecommerce-app',
          demo: 'https://ecommerce-demo.example.com',
          language: 'tsx'
        };
      case 'project2':
        return {
          title: 'Task Management System',
          description: 'A collaborative task management application with real-time updates',
          tech: ['Python', 'FastAPI', 'React', 'WebSockets', 'MongoDB'],
          features: [
            'Real-time collaboration between team members',
            'Drag-and-drop task organization',
            'File attachments and comments',
            'Deadline notifications and reminders',
            'Team performance analytics',
            'Integration with calendar applications'
          ],
          github: 'https://github.com/johndoe/task-manager',
          demo: 'https://taskmanager-demo.example.com',
          language: 'python'
        };
      case 'project3':
        return {
          title: 'Weather Forecast API',
          description: 'RESTful API providing detailed weather forecasts and historical data',
          tech: ['Node.js', 'Express', 'Redis', 'Docker', 'AWS'],
          features: [
            'Current weather conditions for any location',
            '7-day weather forecast with hourly details',
            'Historical weather data analysis',
            'Weather alerts and notifications',
            'Caching for improved performance',
            'Rate limiting and API key authentication'
          ],
          github: 'https://github.com/johndoe/weather-api',
          demo: 'https://api.weather-example.com/docs',
          language: 'javascript'
        };
      default:
        return null;
    }
  };

  const project = getProjectContent();
  if (!project) return null;

  const renderAsCode = () => {
    if (project.language === 'tsx') {
      return (
        <div className="p-6 font-mono text-sm leading-relaxed">
          <div className="text-[#6a9955]">// {project.title}</div>
          <div className="text-[#6a9955]">// {project.description}</div>
          <div className="mt-4 text-[#cccccc]">
            <div className="mb-4">
              <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">React</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'react'</span>;
            </div>
            
            <div className="mb-4">
              <span className="text-[#569cd6]">const</span> <span className="text-[#dcdcaa]">ProjectInfo</span> = <span className="text-[#cccccc]">() =&gt; {"{"}</span>
            </div>
            
            <div className="ml-4 space-y-2">
              <div><span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">technologies</span> = [</div>
              <div className="ml-4">
                {project.tech.map((tech, index) => (
                  <div key={tech}>
                    <span className="text-[#ce9178]">"{tech}"</span>{index < project.tech.length - 1 ? ',' : ''}
                  </div>
                ))}
              </div>
              <div>];</div>
              
              <div className="mt-4"><span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">features</span> = [</div>
              <div className="ml-4">
                {project.features.map((feature, index) => (
                  <div key={feature}>
                    <span className="text-[#ce9178]">"{feature}"</span>{index < project.features.length - 1 ? ',' : ''}
                  </div>
                ))}
              </div>
              <div>];</div>
              
              <div className="mt-4">
                <span className="text-[#c586c0]">return</span> (
              </div>
              <div className="ml-4">
                <div>&lt;<span className="text-[#569cd6]">div</span> <span className="text-[#92c5f7]">className</span>=<span className="text-[#ce9178]">"project-container"</span>&gt;</div>
                <div className="ml-4">
                  <div>&lt;<span className="text-[#569cd6]">h2</span>&gt;{project.title}&lt;/<span className="text-[#569cd6]">h2</span>&gt;</div>
                  <div>&lt;<span className="text-[#569cd6]">p</span>&gt;{project.description}&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
                  <div>&lt;<span className="text-[#569cd6]">a</span> <span className="text-[#92c5f7]">href</span>=<span className="text-[#ce9178]">"{project.github}"</span>&gt;GitHub&lt;/<span className="text-[#569cd6]">a</span>&gt;</div>
                  <div>&lt;<span className="text-[#569cd6]">a</span> <span className="text-[#92c5f7]">href</span>=<span className="text-[#ce9178]">"{project.demo}"</span>&gt;Live Demo&lt;/<span className="text-[#569cd6]">a</span>&gt;</div>
                </div>
                <div>&lt;/<span className="text-[#569cd6]">div</span>&gt;</div>
              </div>
              <div>);</div>
            </div>
            
            <div className="mt-2">{"}"}</div>
          </div>
        </div>
      );
    }

    // Similar patterns for Python and JavaScript
    return (
      <div className="p-6 font-mono text-sm leading-relaxed">
        <div className="text-[#6a9955]"># {project.title}</div>
        <div className="text-[#6a9955]"># {project.description}</div>
        <div className="mt-4 text-[#cccccc]">
          <div className="mb-4">
            <span className="text-[#9cdcfe]">project_info</span> = {'{'}
          </div>
          <div className="ml-4 space-y-2">
            <div>
              <span className="text-[#92c5f7]">"title"</span>: <span className="text-[#ce9178]">"{project.title}"</span>,
            </div>
            <div>
              <span className="text-[#92c5f7]">"description"</span>: <span className="text-[#ce9178]">"{project.description}"</span>,
            </div>
            <div>
              <span className="text-[#92c5f7]">"technologies"</span>: [
              <div className="ml-4">
                {project.tech.map((tech, index) => (
                  <div key={tech}>
                    <span className="text-[#ce9178]">"{tech}"</span>{index < project.tech.length - 1 ? ',' : ''}
                  </div>
                ))}
              </div>
              ],
            </div>
            <div>
              <span className="text-[#92c5f7]">"github"</span>: <span className="text-[#ce9178]">"{project.github}"</span>,
            </div>
            <div>
              <span className="text-[#92c5f7]">"demo"</span>: <span className="text-[#ce9178]">"{project.demo}"</span>
            </div>
          </div>
          <div className="mt-2">{'}'}</div>
        </div>
      </div>
    );
  };

  return renderAsCode();
};
