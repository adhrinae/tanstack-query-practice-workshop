import { useParams } from 'wouter'
import { Sidebar } from '~/shared/Sidebar'

export function PostDetail() {
  const params = useParams<{ id: string }>()

  return (
    <div className="grid grid-cols-6">
      <Sidebar className="col-start-1 col-end-3 p-4" />
      <div className="col-start-3 col-end-7 p-4">
        Post Detail of
        {' '}
        {params.id}
      </div>
    </div>
  )
}
