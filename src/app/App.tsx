import s from "./App.module.css"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

import CircularProgress from "@mui/material/CircularProgress"
import { selectThemeMode, setIsLoggedIn } from "./appSlice"
import { useMeQuery } from "features/auth/api/authAPI"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()

  const {data, isLoading} = useMeQuery()

  useEffect(()=>{
    if(!isLoading) {
      if(data?.resultCode === 0) {
        dispatch(setIsLoggedIn({isLoggedIn: true}))
      }
      setIsInitialized(true)
    }
  }, [isLoading])
  

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      {isInitialized && (
        <>
          <Header />
          <Outlet />
        </>
      )}
      {!isInitialized && (
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
