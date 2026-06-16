import { apiFetch } from "./client"

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
}

interface LoginResponse extends User {
  accessToken: string
  refreshToken: string
}

export async function loginUser(username: string, password: string) {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  })
}

export async function getCurrentUser(accessToken: string) {
  return apiFetch<User>("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
