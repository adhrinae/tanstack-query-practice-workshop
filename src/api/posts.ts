import type { BlogPost } from './types'

export function getPosts(invokeError = false): Promise<BlogPost[]> {
  return fetch(`/api/posts${invokeError ? '?error' : ''}`).then(res => res.json())
}

export function getPost(id: number): Promise<BlogPost> {
  return fetch(`/api/posts/${id}`).then(res => res.json())
}
