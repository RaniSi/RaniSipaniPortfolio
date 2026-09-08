import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
    {name: "Canva", level: "Advanced", category: 'Social Media Designs', percent: "100"},
    {name: "Adobe Studio", level: "Intermediate", category: 'Social Media Designs', percent: "80"},
    {name: "Adobe Photoshop", level: "Intermediate", category: 'Social Media Designs', percent: "70"},
    {name: "Logos", level: "Advanced", category: 'Logos',percent: "80"},
    {name: "Social Media Designs", category: 'Social Media Designs', level: "Advanced", percent: "80"},
    {name: "Innovative Thinking", category: 'Social Media Designs', level: "Advanced", percent: "90"},
    {name: "Creative Thinking", category:'Logos', level: "Advanced", percent: "80"},
    {name: "Design Thinking", category:'Social Media Designs', level: "Advanced", percent: "100"},
    {name: "Marketing Influencer", category: 'Others', level: "Beginner", percent: "40"},
    {name: "Digital Marketing", category: 'Others', level: "Beginner", percent: "20"},
];

const categories = ['all', 'Social Media Designs', 'Logos', 'Others']



export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const filteredSkills = skills.filter((skill) => activeCategory === 'all' || skill.category?.toLowerCase() === activeCategory.toLowerCase());

    return <section id="skills" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                My <span className="text-primary"> Skills</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category, key) => (
                    <button
                        key={key}
                        onClick={() => setActiveCategory(category)}
                        className={cn("px-5 py-2 rounded-full transition-colors duration-300 capitalize", activeCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-foreground hover:bd-primary/80")}>
                        {category}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    filteredSkills.map((skill, key) => (
                        <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                            <div className="text-left mb-4">
                                <h3 className="font-semibold text-lg">{skill.name}</h3>
                            </div>
                            <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-2 rounded-full origin-left animate-(grow_1.5s_ease-out" style={{ width: skill.percent + '%' }}
                                />
                            </div>
                            <div className="text-right mt-1">
                                <span className="">{skill.level}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
}
