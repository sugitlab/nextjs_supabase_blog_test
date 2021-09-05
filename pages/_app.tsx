import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import { User } from '@supabase/supabase-js'


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
          <span>Home</span>
        </Link>
        {
          user && (
            <Link passHref href="/create-post">
              <span>Create Post</span>
            </Link>
          )
        }
        <Link passHref href="/profile">
          <span>Profile</span>
        </Link>
      </nav>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
export default MyApp
