import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { Spinner } from './Spinner'
import { Link } from 'wouter'
import { getPosts } from '~/api/posts'

export function Sidebar({ className }: { className?: string }) {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  let content: ReactNode = null

  if (isLoading) {
    content = (
      <div className="mt-8 flex justify-center">
        <Spinner width="2rem" height="2rem" />
      </div>
    )
  }

  if (isError) {
    content = (
      <div className="mt-8 flex justify-center">
        <p className="text-red-500">Failed to load posts</p>
      </div>
    )
  }

  if (posts) {
    content = (
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} className="text-blue-600">{post.title}</Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <aside className={className}>
      <h2 className="mb-4 text-emerald-500">Recent posts</h2>
      {content}
    </aside>
  )
}
