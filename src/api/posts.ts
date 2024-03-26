import type { BlogPost } from './types'

export function getPosts(invokeError = false): Promise<BlogPost[]> {
  return fetch(`/api/posts${invokeError ? '?error' : ''}`).then(res => res.json())
}
