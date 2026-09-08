import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <img 
              src="/DP.png" 
              alt="Rani Sipani" 
              className="w-80 h-80 rounded-full mx-auto md:mx-0 shadow-md object-cover" 
            />
            <h3 className="text-2xl font-size semibold">Passionate Designer </h3>

            <p>
              A dedicated and detail-oriented designer with a strong foundation in visual communication and a passion for creating thoughtful, impactful design solutions. <br/>With experience across digital and print platforms, I specialize in developing cohesive brand identities, user-centric interfaces, and visually compelling content that aligns with strategic objectives.
            </p>
              <p>Currently building hands-on experience through personal and freelance projects.</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {' '}
                Get In Touch
              </a>
              <a href="/My Resume.pdf" download className="px-6 py-2 rounded-full vorder border-primary text-primary hover:bg-primary/10 transition-colors duration-300">
                Download CV
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className='h-6 w-6 text-primary'/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Social Media Posts</h4>
                  <p className="text-muted-foreground">
                    I craft scroll-stopping social media designs that blend creativity with strategy. From eye-catching visuals to cohesive branding, my goal is to turn every post into a powerful storytelling tool that connects with your audience and elevates your online presence.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className='h-6 w-6 text-primary'/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Logo Design</h4>
                  <p className="text-muted-foreground">
                    I design logos that are not just visually appealing but also meaningful and memorable. Each mark I create is tailored to reflect the brand’s identity, ensuring a lasting impression and a strong visual foundation.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className='h-6 w-6 text-primary'/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Project Management</h4>
                  <p className="text-muted-foreground">
                    I combine design thinking with strategic project management to bring social impact initiatives to life. From planning to execution, I ensure every visual and message aligns with the project's mission and engages the right audience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
