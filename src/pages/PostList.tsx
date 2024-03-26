import { useQuery } from '@tanstack/react-query'
import type { BlogPost } from '~/api/types'
import { Spinner } from '~/shared/Spinner'
import { Link } from 'wouter'
import { postsQueryOptions } from '~/shared/queryOptions'
import { useState } from 'react'

export function PostList() {
  const [page, setPage] = useState<1 | 2>(1)
  const query = useQuery(postsQueryOptions({ page }))

  // Try to change `isLoading` to `isFetching` and see the difference
  if (query.isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <Spinner width="4rem" height="4rem" />
      </div>
    )
  }

  if (query.isError) {
    return (
      <div className="mt-8 flex justify-center">
        <p className="text-red-500">Failed to load posts</p>
      </div>
    )
  }

  return (
    <div className="mx-a my-8 w-2/3 flex flex-col space-y-4">
      {(query?.data ?? []).map(post => (
        <PostItem key={post.id} post={post} />
      ))}
      <div className="flex justify-between">
        <button
          onClick={() => setPage(1)}
          className={`rounded px-4 py-2 ${page === 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          Page 1
        </button>
        {query.isPlaceholderData && (
          <div className="flex space-x-4">
            Keeping placeholder data
          </div>
        )}
        <button
          onClick={() => setPage(2)}
          className={`rounded px-4 py-2 ${page === 2 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          Page 2
        </button>
      </div>
    </div>
  )
}

function PostItem({ post }: { post: BlogPost }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="my-2">{post.content.slice(0, 100)}</p>
      <Link href={`/posts/${post.id}`} className="text-blue-500">
        Read more
      </Link>
    </div>
  )
}
