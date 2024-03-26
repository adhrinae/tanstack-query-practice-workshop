import type { BlogPost } from './types'

export function getPosts({
  invokeError,
  page,
}: {
  invokeError?: boolean
  page?: number
}): Promise<BlogPost[]> {
  const searchParams = new URLSearchParams()

  if (invokeError) {
    searchParams.set('error', '')
  }

  if (page) {
    searchParams.set('page', page.toString())
  }

  return fetch(`/api/posts?${searchParams}`).then(res => res.json())
}

export function getPost(id: number): Promise<BlogPost> {
  return fetch(`/api/posts/${id}`).then(res => res.json())
}

export function createPost(post: Pick<BlogPost, 'title' | 'content' | 'authorId'>): Promise<BlogPost> {
  return fetch(`/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  }).then(res => res.json())
}
