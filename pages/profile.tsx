import { Auth, Typography, Button } from "@supabase/ui"
import { supabase } from '../api'
const { Text } = Typography

const Profile = (props: any) => {
  const { user } = Auth.useUser()
  if (user) 
    return (
      <>
        <Text>Signed in: { user.email } </Text>
        <Button block onClick = { () => props.supabaseClient.auth.signOut() }>
          Sign out
        </Button>
      </>
    )
  return props.children
}

const AuthProfile = () => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}> 
      <Profile supabaseClient={supabase}>
        <Auth supabaseClient={supabase}/> 
      </Profile>
    </Auth.UserContextProvider>
  )
}

export default AuthProfile
