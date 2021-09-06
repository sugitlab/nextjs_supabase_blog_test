import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import markdownHtml from 'zenn-markdown-html';
import { supabase } from '../../api'
import 'zenn-content-css';

const Post = ({post, html}: {post: PostType, html: string}) => {
  // React.useEffect(() => {
  //   import('zenn-embed-elements'); // <- zenn-embed-elements doesn't work on SSR
  // });

  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div style={{width: '70vw', minWidth: '480px', maxWidth:'920px', margin: 'auto', padding: '12pt'}}>
      <h1>{post.title}</h1>
      <p>by {post.user_email}</p>
      <div>
        <span className="znc" dangerouslySetInnerHTML={{ __html: html }}></span>
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
  const paths = data?.map(post => ({ params: { id: JSON.stringify(post.id) } }))
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

  const html = markdownHtml(data?.content ?? '');
  return {
    props: {
      post: data,
      html: html
    }
  }
}
