import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../api'

const Home = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchPosts()
  }, [])
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select()
    if (data != null) setPosts(data)
    setLoading(false)
  }

  if (loading) return <p className = "text-2xl"> Loading ... </p>
  if (!posts.length) return <p className = "text-2xl"> No posts </p>

  return (
    <div>
      <h1 className = "text-3xl font-semibold tracking-wide mt-6 mb-2">Posts</h1>
      {
        posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className = "cursor-pointer border-b border-gray-300 mt-8 pb-4">
              <h2 className = "text-xl font-semibold">{post.title}</h2>
              <p className = "text-gray-500 mt-2">Author: {post.user_email}</p>
            </div>
          </Link>)
        )
      }
    </div>
  )
}


export default Home
