import { Route, Switch } from 'wouter'

import { PostList } from '~/pages/PostList'
import { PostDetail } from '~/pages/PostDetail'

function App() {
  return (
    <main className="min-h-lvh">
      <header className="h-16 flex items-center bg-emerald-300 px-8">
        <h1 className="text-xl">My Blogging Platform</h1>
      </header>
      <Switch>
        <Route path="/" component={PostList} />
        <Route path="/posts/:id" component={PostDetail} />
        <Route>Not found</Route>
      </Switch>
    </main>
  )
}

export default App
