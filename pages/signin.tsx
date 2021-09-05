import { Auth, Typography, Button } from "@supabase/ui"
import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../api'
const { Text } = Typography

type SupabaseAuth = {
  supabaseClient: SupabaseClient
}
const SignIn: React.FC<SupabaseAuth> = ({ supabaseClient, children }) => {
  const { user } = Auth.useUser()
  if (user) 
    return (
      <>
        <Text>Signed in: { user.email } </Text>
        <Button block onClick = { () => supabaseClient.auth.signOut() }>
          Sign out
        </Button>
      </>
    )
  return <>{children}</>
}

const SignInProfile = () => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}> 
      <SignIn supabaseClient={supabase}>
        <Auth supabaseClient={supabase} view='sign_in'/> 
      </SignIn>
    </Auth.UserContextProvider>
  )
}

export default SignInProfile