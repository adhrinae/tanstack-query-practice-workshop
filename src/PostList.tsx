import type { BlogPost } from '~/api/types'

export function PostList() {
  const posts: BlogPost[] = []

  return (
    <div className="mx-a my-8 w-2/3 flex flex-col space-y-4">
      {posts.map(post => (
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
