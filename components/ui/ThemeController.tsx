import { useEffect, useState } from "react";

const ThemeController = () => {

    const [theme, setTheme] = useState<string>('dark');

    // Initialize theme from localStorage or default to 'dark'
    useEffect(() => {
        // Ensure we're in a browser environment
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.documentElement.style.colorScheme = 
                ['dark', 'cyberpunk', 'night', 'dracula', 'black', 'luxury', 'forest', 'coffee', 'sunset', 'dim', 'halloween', 'aqua', 'abyss'].includes(savedTheme) 
                ? 'dark' 
                : 'light';
        }
    }, []);

    // Handle theme change
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTheme = e.target.value;
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Set proper color scheme for system UI
        document.documentElement.style.colorScheme = 
            ['dark', 'cyberpunk', 'night', 'dracula', 'black', 'luxury', 'forest', 'coffee', 'sunset', 'dim', 'halloween', 'aqua', 'abyss'].includes(newTheme) 
            ? 'dark' 
            : 'light';
            
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-10 w-52 p-2 shadow-2xl mt-4">
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Default"
                        value="default"
                        checked={theme === 'default'}
                        onChange={handleThemeChange} />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Retro"
                        value="retro"
                        checked={theme === 'retro'}
                        onChange={handleThemeChange} />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Cyberpunk"
                        value="cyberpunk"
                        checked={theme === 'cyberpunk'}
                        onChange={handleThemeChange} />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Valentine"
                        value="valentine"
                        checked={theme === 'valentine'}
                        onChange={handleThemeChange} />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Aqua"
                        value="aqua"
                        checked={theme === 'aqua'}
                        onChange={handleThemeChange} />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Dark"
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={handleThemeChange} />
                </li>
            </ul>
        </div>
    )
}

export default ThemeController