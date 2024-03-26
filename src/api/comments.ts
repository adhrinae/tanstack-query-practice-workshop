import type { BlogComment } from './types'

export function getComments(postId: number): Promise<BlogComment[]> {
  return fetch(`/api/posts/${postId}/comments`).then(res => res.json())
}
