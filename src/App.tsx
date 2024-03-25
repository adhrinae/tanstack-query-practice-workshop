import { PostList } from './PostList'

function App() {
  return (
    <main className="min-h-lvh">
      <header className="h-16 flex items-center bg-emerald-300 px-8">
        <h1 className="text-xl">My Blogging Platform</h1>
      </header>
      <PostList />
    </main>
  )
}

export default App
