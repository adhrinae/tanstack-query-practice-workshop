import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { getPosts } from '~/api/posts'

export function postsQueryOptions({
  invokeError = false,
  page,
}: {
  invokeError?: boolean
  page?: number
} = {}) {
  return queryOptions({
    queryKey: ['posts', { invokeError, page }],
    queryFn: () => getPosts({ invokeError, page }),
    // keep the previous data when navigating between pages
    // you can leverage with the `isPlaceholderData` property in the query result
    placeholderData: page ? keepPreviousData : undefined,
    // staleTime: 60_000, // determines how long to use the cache before refetching
    // gcTime: 60000, // determines how long to keep the unused/inactive cache data remains in memory
    // refetchInterval: 3000, // refetches every 3 seconds
  })
}
