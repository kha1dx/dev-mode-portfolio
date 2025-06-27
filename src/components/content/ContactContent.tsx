
export const ContactContent = () => {
  return (
    <div className="p-6 font-mono text-sm leading-relaxed">
      <div className="text-[#6a9955]">&lt;!-- Contact Information --&gt;</div>
      <div className="mt-4 text-[#cccccc]">
        <div>&lt;!<span className="text-[#569cd6]">DOCTYPE</span> <span className="text-[#92c5f7]">html</span>&gt;</div>
        <div>&lt;<span className="text-[#569cd6]">html</span> <span className="text-[#92c5f7]">lang</span>=<span className="text-[#ce9178]">"en"</span>&gt;</div>
        <div>&lt;<span className="text-[#569cd6]">head</span>&gt;</div>
        <div className="ml-4">
          <div>&lt;<span className="text-[#569cd6]">meta</span> <span className="text-[#92c5f7]">charset</span>=<span className="text-[#ce9178]">"UTF-8"</span>&gt;</div>
          <div>&lt;<span className="text-[#569cd6]">title</span>&gt;Contact John Doe&lt;/<span className="text-[#569cd6]">title</span>&gt;</div>
        </div>
        <div>&lt;/<span className="text-[#569cd6]">head</span>&gt;</div>
        
        <div>&lt;<span className="text-[#569cd6]">body</span>&gt;</div>
        <div className="ml-4 space-y-4">
          <div>&lt;<span className="text-[#569cd6]">div</span> <span className="text-[#92c5f7]">class</span>=<span className="text-[#ce9178]">"contact-container"</span>&gt;</div>
          
          <div className="ml-4 space-y-3">
            <div>&lt;<span className="text-[#569cd6]">h1</span>&gt;Let's Get In Touch!&lt;/<span className="text-[#569cd6]">h1</span>&gt;</div>
            
            <div>&lt;<span className="text-[#569cd6]">div</span> <span className="text-[#92c5f7]">class</span>=<span className="text-[#ce9178]">"contact-info"</span>&gt;</div>
            <div className="ml-4 space-y-2">
              <div>&lt;<span className="text-[#569cd6]">p</span>&gt;📧 <span className="text-[#92c5f7]">Email</span>: &lt;<span className="text-[#569cd6]">a</span> <span className="text-[#92c5f7]">href</span>=<span className="text-[#ce9178]">"mailto:john.doe@example.com"</span>&gt;john.doe@example.com&lt;/<span className="text-[#569cd6]">a</span>&gt;&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
              <div>&lt;<span className="text-[#569cd6]">p</span>&gt;💼 <span className="text-[#92c5f7]">LinkedIn</span>: &lt;<span className="text-[#569cd6]">a</span> <span className="text-[#92c5f7]">href</span>=<span className="text-[#ce9178]">"https://linkedin.com/in/johndoe"</span>&gt;linkedin.com/in/johndoe&lt;/<span className="text-[#569cd6]">a</span>&gt;&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
              <div>&lt;<span className="text-[#569cd6]">p</span>&gt;🐙 <span className="text-[#92c5f7]">GitHub</span>: &lt;<span className="text-[#569cd6]">a</span> <span className="text-[#92c5f7]">href</span>=<span className="text-[#ce9178]">"https://github.com/johndoe"</span>&gt;github.com/johndoe&lt;/<span className="text-[#569cd6]">a</span>&gt;&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
              <div>&lt;<span className="text-[#569cd6]">p</span>&gt;🐦 <span className="text-[#92c5f7]">Twitter</span>: &lt;<span className="text-[#569cd6]">a</span> <span className="text-[#92c5f7]">href</span>=<span className="text-[#ce9178]">"https://twitter.com/johndoe"</span>&gt;@johndoe&lt;/<span className="text-[#569cd6]">a</span>&gt;&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
              <div>&lt;<span className="text-[#569cd6]">p</span>&gt;📱 <span className="text-[#92c5f7]">Phone</span>: &lt;<span className="text-[#569cd6]">a</span> <span className="text-[#92c5f7]">href</span>=<span className="text-[#ce9178]">"tel:+1234567890"</span>&gt;+1 (234) 567-8900&lt;/<span className="text-[#569cd6]">a</span>&gt;&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
              <div>&lt;<span className="text-[#569cd6]">p</span>&gt;📍 <span className="text-[#92c5f7]">Location</span>: San Francisco, CA&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
            </div>
            <div>&lt;/<span className="text-[#569cd6]">div</span>&gt;</div>
            
            <div>&lt;<span className="text-[#569cd6]">div</span> <span className="text-[#92c5f7]">class</span>=<span className="text-[#ce9178]">"contact-form"</span>&gt;</div>
            <div className="ml-4 space-y-2">
              <div>&lt;<span className="text-[#569cd6]">h2</span>&gt;Send me a message&lt;/<span className="text-[#569cd6]">h2</span>&gt;</div>
              <div>&lt;<span className="text-[#569cd6]">form</span> <span className="text-[#92c5f7]">action</span>=<span className="text-[#ce9178]">"#"</span> <span className="text-[#92c5f7]">method</span>=<span className="text-[#ce9178]">"POST"</span>&gt;</div>
              <div className="ml-4 space-y-2">
                <div>&lt;<span className="text-[#569cd6]">input</span> <span className="text-[#92c5f7]">type</span>=<span className="text-[#ce9178]">"text"</span> <span className="text-[#92c5f7]">name</span>=<span className="text-[#ce9178]">"name"</span> <span className="text-[#92c5f7]">placeholder</span>=<span className="text-[#ce9178]">"Your Name"</span> <span className="text-[#92c5f7]">required</span>&gt;</div>
                <div>&lt;<span className="text-[#569cd6]">input</span> <span className="text-[#92c5f7]">type</span>=<span className="text-[#ce9178]">"email"</span> <span className="text-[#92c5f7]">name</span>=<span className="text-[#ce9178]">"email"</span> <span className="text-[#92c5f7]">placeholder</span>=<span className="text-[#ce9178]">"your.email@example.com"</span> <span className="text-[#92c5f7]">required</span>&gt;</div>
                <div>&lt;<span className="text-[#569cd6]">input</span> <span className="text-[#92c5f7]">type</span>=<span className="text-[#ce9178]">"text"</span> <span className="text-[#92c5f7]">name</span>=<span className="text-[#ce9178]">"subject"</span> <span className="text-[#92c5f7]">placeholder</span>=<span className="text-[#ce9178]">"Subject"</span> <span className="text-[#92c5f7]">required</span>&gt;</div>
                <div>&lt;<span className="text-[#569cd6]">textarea</span> <span className="text-[#92c5f7]">name</span>=<span className="text-[#ce9178]">"message"</span> <span className="text-[#92c5f7]">rows</span>=<span className="text-[#ce9178]">"5"</span> <span className="text-[#92c5f7]">placeholder</span>=<span className="text-[#ce9178]">"Your message here..."</span> <span className="text-[#92c5f7]">required</span>&gt;&lt;/<span className="text-[#569cd6]">textarea</span>&gt;</div>
                <div>&lt;<span className="text-[#569cd6]">button</span> <span className="text-[#92c5f7]">type</span>=<span className="text-[#ce9178]">"submit"</span>&gt;Send Message&lt;/<span className="text-[#569cd6]">button</span>&gt;</div>
              </div>
              <div>&lt;/<span className="text-[#569cd6]">form</span>&gt;</div>
            </div>
            <div>&lt;/<span className="text-[#569cd6]">div</span>&gt;</div>
            
            <div>&lt;<span className="text-[#569cd6]">div</span> <span className="text-[#92c5f7]">class</span>=<span className="text-[#ce9178]">"availability"</span>&gt;</div>
            <div className="ml-4">
              <div>&lt;<span className="text-[#569cd6]">p</span>&gt;🟢 <span className="text-[#92c5f7]">Status</span>: Available for new opportunities&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
              <div>&lt;<span className="text-[#569cd6]">p</span>&gt;⏰ <span className="text-[#92c5f7]">Response Time</span>: Usually within 24 hours&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
              <div>&lt;<span className="text-[#569cd6]">p</span>&gt;🤝 <span className="text-[#92c5f7]">Open to</span>: Full-time, Contract, and Consulting work&lt;/<span className="text-[#569cd6]">p</span>&gt;</div>
            </div>
            <div>&lt;/<span className="text-[#569cd6]">div</span>&gt;</div>
          </div>
          
          <div>&lt;/<span className="text-[#569cd6]">div</span>&gt;</div>
        </div>
        <div>&lt;/<span className="text-[#569cd6]">body</span>&gt;</div>
        <div>&lt;/<span className="text-[#569cd6]">html</span>&gt;</div>
        
        <div className="mt-6 text-[#6a9955]">
          <div>&lt;!-- Feel free to reach out! I'm always interested in --&gt;</div>
          <div>&lt;!-- discussing new opportunities and collaborations --&gt;</div>
        </div>
      </div>
    </div>
  );
};
