export type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "theme"

function isBrowser() {
  return typeof window !== "undefined"
}

export function getStoredTheme(): Theme {
  if (!isBrowser()) return "system"
  return (localStorage.getItem(STORAGE_KEY) as Theme) || "system"
}

export function getEffectiveTheme(): "light" | "dark" {
  const stored = getStoredTheme()
  if (stored !== "system") return stored
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function setTheme(theme: Theme) {
  if (isBrowser()) localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
}

export function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      isBrowser() &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  document.documentElement.classList.toggle("dark", isDark)
}
