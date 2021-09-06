import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { Button, IconHome, IconPenTool, IconUser } from '@supabase/ui'
import { supabase } from '../api'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User|null>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async () => checkUser()
    )
    checkUser()
    return () => {
      authListener?.unsubscribe()
    }
  }, [])
  async function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }

  return (
    <div style={{width: '70vw', maxWidth: '920px', minWidth:'480px', margin:'auto'}}>
      <nav>
        <Link passHref href="/">
          <Button type="link" size="large" icon={<IconHome strokeWidth={2} />} style={{fontWeight: 'bold'}}>Home</Button>
        </Link>
        {
          user && (
            <Link passHref href="/create-post">
              <Button type="link" size="large" icon={<IconPenTool strokeWidth={2} />} style={{fontWeight: 'bold'}}>Create Post</Button>
            </Link>
          )
        }
        <Link passHref href="/profile">
          <Button type="link" size="large" icon={<IconUser strokeWidth={2}/>} style={{fontWeight: 'bold'}}>Profile</Button>
        </Link>
      </nav>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
export default MyApp
