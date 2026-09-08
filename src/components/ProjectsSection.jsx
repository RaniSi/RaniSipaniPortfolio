import { ExternalLink, HardDrive } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'Bloom Cafe',
        description: 'Seasonal campaign add-on to your previous cafe project, Fall-themed Insta posts (pumpkin spice, cozy drinks, special discounts), Poster for “Open Mic Night” at the cafe and Loyalty card design',
        image: './projects/Bloom Cafe Logo.png',
        tags: ['Social Media', 'Branding', 'Print Design'],
        demoUrl: 'https://drive.google.com/drive/folders/1A_CzXylQbMWzEHcI-cCy8DgUBR11Hpai?usp=sharing',
        githubUrl: 'https://drive.google.com/drive/folders/1A_CzXylQbMWzEHcI-cCy8DgUBR11Hpai?usp=sharing'
    },
    {
        id: 2,
        title: 'BakeFest 2025 - Jaipur',
        description: 'A city-wide baking festival for home bakers & foodies, Poster or flyer, Instagram carousel (with details of event, guests, and location) and Badge or tag design for attendees',
        image: './projects/Bake Feast.png',
        tags: ['Social Media', 'Branding', 'Print Design'],
        demoUrl: 'https://drive.google.com/drive/folders/198v7DPb6s-WZLqGbVRftD7Hdf0-tUh8Q?usp=sharing',
        githubUrl: 'https://drive.google.com/drive/folders/198v7DPb6s-WZLqGbVRftD7Hdf0-tUh8Q?usp=sharing'
    },
    {
        id: 3,
        title: 'Glow Skin Co.',
        description: 'Natural skincare brand targeting Gen Z, Logo & brand palette, 3 Instagram posts: product highlight, skincare tips, launch offer and 1 story template',
        image: './projects/Glow Skin Logo.png',
        tags: ['Social Media', 'Branding', 'Logo Design'],
        demoUrl: 'https://drive.google.com/drive/folders/1AEd-XpypJg0a3e3ETAz1rUmyQkXNj9ij?usp=sharing',
        githubUrl: 'https://drive.google.com/drive/folders/1AEd-XpypJg0a3e3ETAz1rUmyQkXNj9ij?usp=sharing'
    },
    {
        id: 4,
        title: 'EcoWrap - Reusable Food Wraps',
        description: 'Sustainable kitchen brand, Google Display ads or Facebook ad mockups (3 sizes), Instagram post + Story design and Product insert (thank-you card or usage instructions) ',
        image: './projects/Eco Wrap.png',
        tags: ['Social Media', 'Branding', 'Logo Design'],
        demoUrl: 'https://drive.google.com/drive/folders/175LysYsLXysVQE7OzNxYiCeuTrT3xHZ6?usp=sharing',
        githubUrl: 'https://drive.google.com/drive/folders/175LysYsLXysVQE7OzNxYiCeuTrT3xHZ6?usp=sharing'
    },
    {
        id: 5,
        title: 'Sia Rain – Spoken Word & Poetry Artist Branding',
        description: 'A fictional poet who shares deeply emotional short poems through visuals, performances, and minimalist social media storytelling, Monogram or Wordmark Logo (Sia Rain)Instagram Quote Series, Story Template for New Poem Drops, Bookmark Merch Mockup',
        image: './projects/Poetry.png',
        tags: ['Social Media', 'Branding', 'Logo Design'],
        demoUrl: 'https://drive.google.com/drive/folders/18YukbkDLUC2oa0-o9haCh_lIYo7uHzGu?usp=sharing',
        githubUrl: 'https://drive.google.com/drive/folders/18YukbkDLUC2oa0-o9haCh_lIYo7uHzGu?usp=sharing'
    },
    {   
        id: 6,
        title: 'Aura Gelaton',
        description: 'An ice cream company inauguration create a welcome post with opening details and logo mentioned in the post.',
        image: './projects/Ice Cream.png',
        tags: ['Social Media', 'Branding', 'Logo Design'],
        demoUrl: 'https://drive.google.com/drive/folders/17ilppjBqEuYWkKy9OYJdFQj_N69ySOuq?usp=sharing',
        githubUrl: 'https://drive.google.com/drive/folders/17ilppjBqEuYWkKy9OYJdFQj_N69ySOuq?usp=sharing'
    }

]

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    {' '}
                    Featured <span className="text-primary"> Projects </span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    A showcase of my recent design projects, highlighting my skills in branding, social media, and print design.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        projects.map((project, key) => (
                            <div
                                key={key}
                                className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                                <div className="h-48 overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform "/>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">{tag}</span>
                                        ))}
                                    </div>
                                
                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{project.description}
                                </p>
                                <div className='flex space-x-3'>
                                    <a href={project.demoUrl}
                                        target='_blank'
                                        className="text-foreground/80 hover:text-primary transition-colors duration-300">
                                        <ExternalLink size={20} />
                                    </a>
                                    <a href={project.githubUrl}
                                        target=""
                                        className="text-foreground/80 hover:text-primary transition-colors duration-300">
                                        <HardDrive size={20}/>
                                    </a>
                                </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='text-center mt-12'>
                    <a
                        className='cosmic-button w-fit flex items-center mx-auto gap-2'
                        target='_blank'
                        href="https://github.com/RaniSi">
                        Check My Github <ArrowRight size={16} />
                    </a>
                    
                </div>
            </div>
        </section>
    )
}
