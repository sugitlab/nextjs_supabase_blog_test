import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import  Button from '@mui/material/Button'
import { supabase } from '../api'



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
    <div>
      <nav>
        <Link passHref href="/">
          <Button>Home</Button>
        </Link>
        {
          user && (
            <Link passHref href="/create-post">
              <Button>Create Post</Button>
            </Link>
          )
        }
        <Link passHref href="/profile">
          <Button>Profile</Button>
        </Link>
      </nav>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
export default MyApp
