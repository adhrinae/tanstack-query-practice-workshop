import { Link, Route, Switch } from 'wouter'

import { PostList } from '~/pages/PostList'
import { PostDetail } from '~/pages/PostDetail'
import { NewPost } from '~/pages/NewPost'

function App() {
  return (
    <main className="min-h-lvh">
      <header className="h-16 flex items-center justify-between bg-emerald-300 px-8">
        <h1 className="text-xl">
          <Link href="/">
            My Blogging Platform
          </Link>
        </h1>
        <button className="rounded bg-indigo-400 px-4 py-2 color-white">
          <Link href="/new">New Post</Link>
        </button>
      </header>
      <Switch>
        <Route path="/" component={PostList} />
        <Route path="/posts/:id" component={PostDetail} />
        <Route path="/new" component={NewPost} />
        <Route>Not found</Route>
      </Switch>
    </main>
  )
}

export default App
