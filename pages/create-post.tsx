import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import { supabase } from '../api'
import { PostType } from './posts/[id]'


type PickedPost = Pick<PostType, 'id' | 'title' | 'content'>
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
const initialState: PickedPost = {id: '', title: '', content: '' }

const CreatePost = () => {
  const [post, setPost] = useState<PickedPost>(initialState)
  const { title, content } = post
  const router = useRouter()

  function onChange (e: ChangeEvent<HTMLInputElement>) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }
  async function createNewPost () {
    if (!title || !content) return 
    const user = supabase.auth.user()
    const id = uuid()
    post.id = id
    const { data } = await supabase
      .from('posts')
      .insert([
        { title, content, user_id: user?.id, user_email: user?.email }
      ])
      .single()
    router.push(`/posts/${data.id}`)
  }

  return (
    <div>
      <h1>Create new post</h1>
      <input
        onChange = {onChange}
        name = "title"
        placeholder = "Title"
        value = {post.title}
      />
      <SimpleMDE
        value = {post.content}
        onChange = {value => setPost({ ...post, content: value})}
      />
      <button
        type = "button"
        onClick = {createNewPost}
      >Create Post</button>
    </div>
  )
}

export default CreatePost

