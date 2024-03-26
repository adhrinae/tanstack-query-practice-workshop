import { HttpResponse, delay, http, type DefaultBodyType } from 'msw'
import { randFullName, randCatchPhrase, randParagraph, randPastDate, randRecentDate } from '@ngneat/falso'
import type { BlogPost, User } from '~/api/types'

const users = [
  { id: 1, name: randFullName() },
  { id: 2, name: randFullName() },
]

const posts = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: randCatchPhrase(),
  content: randParagraph(),
  authorId: index % 2 === 0 ? 1 : 2,
  createdAt: randPastDate().toISOString(),
  updatedAt: randRecentDate().toISOString(),
}))

let postsRefetchCount = 0

export const handlers = [
  http.get('/api/users', async () => {
    await delay('real')
    return HttpResponse.json<User[]>(users)
  }),
  http.get<{ id: string }>('/api/users/:id', async ({ params }) => {
    const userId = parseInt(params.id, 10)
    const user = users.find(user => user.id === userId)

    await delay('real')

    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(user)
  }),
  http.get('/api/posts', async (res) => {
    const url = new URL(res.request.url)
    const invokeError = url.searchParams.has('error')

    await delay('real')

    if (invokeError && postsRefetchCount < 2) {
      postsRefetchCount += 1
      return HttpResponse.error()
    }

    postsRefetchCount = 0
    return HttpResponse.json<BlogPost[]>(posts)
  }),
  http.get<{ id: string }>('/api/posts/:id', async ({ params }) => {
    const postId = parseInt(params.id, 10)
    const post = posts.find(post => post.id === postId)

    await delay('real')

    if (!post) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(post)
  }),
  http.get<{ postId: string }>('/api/posts/:postId/comments', async ({ params }) => {
    const postId = parseInt(params.postId, 10)
    const comments = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      content: randParagraph(),
      postId,
      authorId: index % 2 === 0 ? 1 : 2,
      createdAt: randPastDate().toISOString(),
    }))

    await delay('real')

    return HttpResponse.json(comments)
  }),
]
