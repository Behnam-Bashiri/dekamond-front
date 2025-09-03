import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Toggles between light and dark themes using `next-themes`.
 * Displays a sun icon for light mode and a moon icon for dark mode.
 */
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="p-2 rounded-md border"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
