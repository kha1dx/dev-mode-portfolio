
export const AboutContent = () => {
  return (
    <div className="p-6 font-mono text-sm leading-relaxed">
      <div className="text-[#6a9955]"># About Me</div>
      <div className="mt-4 text-[#cccccc]">
        <div className="mb-4">
          <span className="text-[#569cd6]">const</span>{' '}
          <span className="text-[#9cdcfe]">developer</span> = {'{'}
        </div>
        <div className="ml-4 space-y-2">
          <div>
            <span className="text-[#92c5f7]">name</span>: <span className="text-[#ce9178]">"John Doe"</span>,
          </div>
          <div>
            <span className="text-[#92c5f7]">title</span>: <span className="text-[#ce9178]">"Full Stack Developer"</span>,
          </div>
          <div>
            <span className="text-[#92c5f7]">location</span>: <span className="text-[#ce9178]">"San Francisco, CA"</span>,
          </div>
          <div>
            <span className="text-[#92c5f7]">email</span>: <span className="text-[#ce9178]">"john.doe@example.com"</span>,
          </div>
          <div>
            <span className="text-[#92c5f7]">bio</span>: <span className="text-[#ce9178]">"Passionate developer with 5+ years of experience building scalable web applications. I enjoy solving complex problems and learning new technologies."</span>,
          </div>
          <div>
            <span className="text-[#92c5f7]">interests</span>: [
            <div className="ml-4">
              <span className="text-[#ce9178]">"Web Development"</span>,<br />
              <span className="text-[#ce9178]">"Machine Learning"</span>,<br />
              <span className="text-[#ce9178]">"Open Source"</span>,<br />
              <span className="text-[#ce9178]">"Photography"</span>
            </div>
            ],
          </div>
          <div>
            <span className="text-[#92c5f7]">currentlyLearning</span>: [
            <div className="ml-4">
              <span className="text-[#ce9178]">"Kubernetes"</span>,<br />
              <span className="text-[#ce9178]">"GraphQL"</span>,<br />
              <span className="text-[#ce9178]">"Rust"</span>
            </div>
            ]
          </div>
        </div>
        <div className="mt-2">{'}'}</div>
        
        <div className="mt-6 text-[#6a9955]">
          <div>// Fun fact: I've contributed to 50+ open source projects!</div>
          <div>// Always excited to collaborate on interesting projects.</div>
        </div>
      </div>
    </div>
  );
};
