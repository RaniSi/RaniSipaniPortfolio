import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme == 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        }
    }, [])

    const toogleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    }
    return (
        <button
            onClick={toogleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors duration-300"
        >
        {isDarkMode ? (
        <Sun className='h-6 w-6 text-yellow-300' />
    ) : (
        <Moon className='h-6 w-6 text-blue-900' />
    )}
    </button>
    )
}