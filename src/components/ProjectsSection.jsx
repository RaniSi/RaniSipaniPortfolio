import { useState } from 'react';
import { ArrowRight, HardDrive, Images } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectGallery } from './ProjectGallery';

export const ProjectsSection = () => {
    const [activeProject, setActiveProject] = useState(null);

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
                                onClick={() => setActiveProject(project)}
                                className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover cursor-pointer">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={project.cover} alt={project.title} className="w-full h-full object-cover transition-transform "/>
                                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                                            <Images size={16} />
                                            View Gallery ({project.images.length})
                                        </span>
                                    </div>
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
                                    <a href={project.driveUrl}
                                        target='_blank'
                                        rel='noreferrer'
                                        onClick={(e) => e.stopPropagation()}
                                        title='View on Google Drive'
                                        className="text-foreground/80 hover:text-primary transition-colors duration-300">
                                        <HardDrive size={20} />
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
            {activeProject && (
                <ProjectGallery
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                />
            )}
        </section>
    )
}
