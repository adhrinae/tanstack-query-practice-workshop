import type { User } from './types'

export function getUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json())
}
