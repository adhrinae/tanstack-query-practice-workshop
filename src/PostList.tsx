import { useQuery } from '@tanstack/react-query'
import type { BlogPost } from '~/api/types'
import { getPosts } from './api/posts'
import { Spinner } from './Spinner'

export function PostList() {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    staleTime: 5000, // determines how long to use the cache before refetching
    // gcTime: 60000, // determines how long to keep the unused/inactive cache data remains in memory
    // refetchInterval: 3000, // refetches every 3 seconds
  })

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
    </div>
  )
}

function PostItem({ post }: { post: BlogPost }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="mt-2">{post.content.slice(0, 100)}</p>
    </div>
  )
}
