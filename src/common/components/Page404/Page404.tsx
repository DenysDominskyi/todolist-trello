import { useNavigate } from "react-router"
import s from "./Page404.module.css"
import { Path } from "common/routing/RoutingApp"
import { Button, Link } from "@mui/material"

export const Page404 = () => {
  const navigate = useNavigate()

  const goHomeHandler = () => {
    navigate(Path.Main)
  }
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <div className={s.buttonContainer}>
        {/* <MenuButton onClick={goHomeHandler}>Home</MenuButton> */}
        <Button variant="outlined" component={Link} href={Path.Main}>
          Home
        </Button>
      </div>
    </>
  )
}
