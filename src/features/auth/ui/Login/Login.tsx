import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import { Navigate } from "react-router"
import { useLogin } from "features/auth/lib/hooks/useLogin"
import { LoginForm } from "./LoginForm/LoginForm"
import { LoginFormLabel } from "./LoginFormLabel/LoginFormLabel"

export const Login = () => {
  const { isLoggedIn } = useLogin()
 
  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }
 
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <LoginFormLabel />
            <LoginForm />
          </FormLabel>
        </FormControl>
      </Grid>
    </Grid>
  )
}