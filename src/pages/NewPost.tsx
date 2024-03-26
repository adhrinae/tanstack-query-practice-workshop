import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'wouter'
import { createPost } from '~/api/posts'
import type { BlogPost } from '~/api/types'
import { Sidebar } from '~/shared/Sidebar'

export function NewPost() {
  const queryClient = useQueryClient()
  const [, navigate] = useLocation()
  const newPostMutation = useMutation({
    mutationFn: createPost,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const title = formData.get('title')
    const content = formData.get('content')

    if (!title || !content) {
      return
    }

    newPostMutation.mutate({
      title: title.toString(),
      content: content.toString(),
      authorId: 1, // Hardcoded authorId
    }, {
      onSuccess: (data) => {
        alert('Post created: ' + data.title)

        // invalidate the posts query to refetch the data
        queryClient.invalidateQueries({
          queryKey: ['posts'],
        })
        // or we can just set the data in the cache
        // queryClient.setQueryData(['posts'], (oldPosts: BlogPost[] | undefined) => {
        //   return oldPosts ? [...oldPosts, data] : [data]
        // })

        // navigate('/')
      },
      onError: () => {
        alert('Failed to create post')
      },
    })
  }

  return (
    <div className="grid grid-cols-6">
      <div className="p-4">
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" className="border-2 border-blueGray rounded border-solid" />
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" className="border-2 border-blueGray rounded border-solid"></textarea>
          <button type="submit" className="rounded bg-indigo-400 px-4 py-2 color-white">Submit</button>
        </form>
      </div>
      <Sidebar className="col-start-5 col-end-7 p-4" />
    </div>
  )
}
