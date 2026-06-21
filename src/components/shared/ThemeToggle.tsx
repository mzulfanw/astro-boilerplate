import { Moon, Sun } from "lucide-react"
import { setTheme } from "@/hooks/use-theme"

export function ThemeToggle() {
  function toggle() {
    const dark = document.documentElement.classList.contains("dark")
    setTheme(dark ? "light" : "dark")
  }

  return (
    <button
      onClick={toggle}
      className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      aria-label="Toggle theme"
    >
      <Sun className="size-4 block dark:hidden" />
      <Moon className="size-4 hidden dark:block" />
    </button>
  )
}
