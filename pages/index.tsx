import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../api'
import { PostType } from './posts/[id]'

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([])
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

  if (loading) return <p> Loading ... </p>
  if (!posts.length) return <p> No posts </p>

  return (
    <div>
      <h1>Posts</h1>
      {
        posts.map(post => (
          <Link key={post.id} passHref href={`/posts/${post.id}`}>
            <div>
              <h2>{post.title}</h2>
              <p>Author: {post.user_email}</p>
            </div>
          </Link>)
        )
      }
    </div>
  )
}


export default Home
