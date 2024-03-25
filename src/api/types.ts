// User type schema
export type User = {
  id: number
  name: string
}

// Blog Post type schema
export type BlogPost = {
  id: number
  title: string
  content: string
  authorId: User['id']
  createdAt: string // ISO string
  updatedAt: string // ISO string
}

// Blog Comment type schema
export type BlogComment = {
  id: number
  content: string
  postId: number
  authorId: User['id']
  createdAt: string // ISO string
}

// Payload type for creating a blog post
export type CreateBlogPostPayload = {
  title: string
  content: string
  authorId: User['id']
}

// Payload type for updating a blog post
export type UpdateBlogPostPayload = {
  id: BlogPost['id']
  title?: string
  content?: string
}

// Payload type for deleting a blog post
export type DeleteBlogPostPayload = {
  id: BlogPost['id']
}

// Payload type for creating a blog comment
export type CreateBlogCommentPayload = {
  content: string
  postId: BlogPost['id']
  authorId: User['id']
}

// Payload type for updating a blog comment
export type UpdateBlogCommentPayload = {
  id: BlogComment['id']
  content: string
}

// Payload type for deleting a blog comment
export type DeleteBlogCommentPayload = {
  id: BlogComment['id']
}

// Pagination type for blog posts
export type BlogPostPagination = {
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
  data: BlogPost[]
}

// Pagination type for blog comments
export type BlogCommentPagination = {
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
  data: BlogComment[]
}
