import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, Image } from '@supabase/ui'
import Grid from '@mui/material/Grid'
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

  const datetoStr = (str: string) => {
    const date = new Date(str)
    return date.toLocaleDateString()
  }
  
  return (
    <Grid container spacing={2} style={{marginTop: '12px'}}>
      {
        posts.map(post => (
          <Link key={post.id} passHref href={`/posts/${post.id}`}>
            {/* <Paper elevation={2} sx={{ pt: 1, pb: 2, pl: 4, pr: 2, m: 2 }}> */}
            <Grid item xs={4}>
              <Card
                hoverable 
                cover={<Image style={{height:'250px'}} responsive alt='cover' source='https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60' />}
                title={post.title}
              >
                {datetoStr(post.inserted_at)}
              </Card>
            </Grid>
          </Link>
        )
        )
      }
    </Grid>
  )
}


export default Home
