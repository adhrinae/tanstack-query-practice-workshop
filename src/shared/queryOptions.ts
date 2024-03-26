import { queryOptions } from '@tanstack/react-query'
import { getPosts } from '~/api/posts'

export function postsQueryOptions(invokeError = false) {
  return queryOptions({
    queryKey: ['posts'],
    queryFn: () => getPosts(invokeError),
    staleTime: 60_000, // determines how long to use the cache before refetching
    // gcTime: 60000, // determines how long to keep the unused/inactive cache data remains in memory
    // refetchInterval: 3000, // refetches every 3 seconds
  })
}
