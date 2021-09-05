import { useState, useEffect } from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
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
      <Typography variant="h3" gutterBottom component="div">Posts</Typography>
      {
        posts.map(post => (
            <Link key={post.id} passHref href={`/posts/${post.id}`}>
              <Paper elevation={2} sx={{ p:4, m:2 }}>
                <Typography variant="h4" gutterBottom component="div">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">Author: {post.user_email}</Typography>
              </Paper>
            </Link>
          )
        )
      }
    </div>
  )
}


export default Home
