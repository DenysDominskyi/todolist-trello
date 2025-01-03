import { Routes, Route } from "react-router"

import { Main } from "app/Main"
import { Login } from "features/auth/ui/Login/Login"
import { Page404 } from "common/components/Page404/Page404"

export const Path = {
  Main: "/",
  Login: "login",
  Page404: '*'
} as const

export const RoutingApp = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.Page404} element={<Page404 />} />
    </Routes>
  )
}
