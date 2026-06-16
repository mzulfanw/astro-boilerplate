import { useState } from "react"
import { actions } from "astro:actions"

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  async function login(username: string, password: string) {
    const { data, error } = await actions.login({ username, password })
    if (data) setUser(data)
    return { data, error }
  }

  async function logout() {
    await actions.logout()
    setUser(null)
    window.location.href = "/login"
  }

  return { user, login, logout }
}
