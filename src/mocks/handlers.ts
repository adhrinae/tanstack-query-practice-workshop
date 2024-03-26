import { HttpResponse, delay, http, type DefaultBodyType, type PathParams } from 'msw'
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

    const page = url.searchParams.get('page')
    let postsResponse = [...posts]
    if (page) {
      const postsPerPage = 5
      const pageInt = page ? parseInt(page, 10) : 1
      const start = (pageInt - 1) * postsPerPage
      const end = start + postsPerPage

      postsResponse = posts.slice(start, end)
    }

    postsRefetchCount = 0
    return HttpResponse.json<BlogPost[]>(postsResponse)
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
  http.post<
    PathParams,
    { title: string, content: string, authorId: number }
  >('/api/posts', async ({ request }) => {
    const body = await request.json()

    const newPostId = posts.length + 1
    const newPostDate = new Date().toISOString()

    const createdPost: BlogPost = {
      id: newPostId,
      createdAt: newPostDate,
      updatedAt: newPostDate,
      ...body,
    }

    posts.unshift(createdPost)

    await delay('real')

    return HttpResponse.json(createdPost)
  }),
]
