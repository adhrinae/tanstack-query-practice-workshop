import { HttpResponse, http } from 'msw'
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
  http.get('/api/users', () => {
    return HttpResponse.json<User[]>(users)
  }),
  http.get('/api/posts', (res) => {
    const url = new URL(res.request.url)
    const invokeError = url.searchParams.has('error')

    if (invokeError && postsRefetchCount < 2) {
      postsRefetchCount += 1
      return HttpResponse.error()
    }

    postsRefetchCount = 0
    return HttpResponse.json<BlogPost[]>(posts)
  }),
]
