import { apiFetch } from "./client"

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: { likes: number; dislikes: number }
  views: number
  userId: number
}

interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export async function getPosts(skip = 0, limit = 10) {
  return apiFetch<PostsResponse>(`/posts?skip=${skip}&limit=${limit}`)
}

export async function getAllPosts() {
  const first = await getPosts(0, 1)
  const total = first.total
  return getPosts(0, total)
}

export async function getPost(id: number) {
  return apiFetch<Post>(`/posts/${id}`)
}
