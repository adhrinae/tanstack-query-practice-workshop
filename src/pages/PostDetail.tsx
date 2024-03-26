import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useParams } from 'wouter'
import { getComments } from '~/api/comments'
import { getPost } from '~/api/posts'
import type { BlogPost, User } from '~/api/types'
import { getUser } from '~/api/user'
import { Sidebar } from '~/shared/Sidebar'

export function PostDetail() {
  const params = useParams<{ id: string }>()
  const postId = parseInt(params.id, 10)

  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
  })
  // dependency on postQuery.data
  const userQuery = useQuery({
    queryKey: ['user', postQuery.data?.authorId],
    queryFn: () => postQuery.data?.authorId ? getUser(postQuery.data?.authorId) : Promise.resolve(null),
    enabled: !!postQuery.data,
  })
  // not dependent exactly, but we want to wait for postQuery to be done
  const commentQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled: !!postQuery.data,
  })

  let content: ReactNode = null

  if (postQuery.isLoading) {
    content = (
      <div className="mt-8 flex justify-center">
        <p>Loading post...</p>
      </div>
    )
  }

  if (postQuery.isError) {
    content = (
      <div className="mt-8 flex justify-center">
        <p>Failed to load post</p>
      </div>
    )
  }

  if (postQuery.data) {
    content = (
      <PostContent post={postQuery.data} user={userQuery.data} />
    )
  }

  return (
    <div className="grid grid-cols-6">
      <Sidebar className="col-start-1 col-end-3 p-4" />
      <div className="col-start-3 col-end-7 p-4">
        {content}
        {commentQuery.data && (
          <>
            <hr className="my-8" />
            <h3 className="text-xl font-bold">Comments</h3>
            {commentQuery.data.map(comment => (
              <div key={comment.id} className="my-2 rounded p-2 shadow">
                <p>{comment.content}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

function PostContent({ post, user }: { post: BlogPost, user?: User }) {
  return (
    <article>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="my-2">{post.content}</p>
      {user && (
        <p className="my-2 text-gray-500">
          By
          {' '}
          {user.name}
          on
          {' '}
          {new Date(post.createdAt).toLocaleDateString()}
          {' '}
          (Updated on
          {' '}
          {new Date(post.updatedAt).toLocaleDateString()}
          )
        </p>
      )}
    </article>
  )
}
