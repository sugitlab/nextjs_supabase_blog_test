import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { supabase } from '../../api'

const Post = ( post: PostType) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <p>by {post.user_email}</p>
      <div>
        <ReactMarkdown className = "prose">
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Post

export type PostType = {
  id: string;
  user_id: string;
  user_email: string;
  title: string;
  content: string;
  inserted_at: string;
}

type Params = {
  params: {
    id: string
  }
}

export const getStaticPaths = async () => {
  const { data, error } = await supabase 
    .from<PostType>('posts')
    .select('id')
  const paths = data?.map(post => ({ params: { id: JSON.stringify(post.id) }}))
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const { id } = params
  const { data } = await supabase
    .from<PostType>('posts')
    .select()
    .filter('id', 'eq', id)
    .single()
  return {
    props: {
      post: data
    }
  }
}
