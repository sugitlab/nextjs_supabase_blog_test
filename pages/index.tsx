import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Typography } from '@supabase/ui'
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
      {
        posts.map(post => (
          <Link key={post.id} passHref href={`/posts/${post.id}`}>
            <Paper elevation={2} sx={{ pt: 1, pb: 2, pl: 4, pr: 2, m: 2 }}>
              <div>
                <Typography.Title level={3}>
                  {post.title}
                </Typography.Title>
              </div>
              <Typography.Text type="secondary">
                Author: {post.user_email}
              </Typography.Text>
            </Paper>
          </Link>
        )
        )
      }
    </div>
  )
}


export default Home
