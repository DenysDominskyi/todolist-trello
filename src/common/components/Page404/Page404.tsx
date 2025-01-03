import s from "./Page404.module.css"
import { Path } from "common/routing/RoutingApp"
import { Button, Link } from "@mui/material"

export const Page404 = () => {
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <div className={s.buttonContainer}>
        <Button variant="outlined" component={Link} href={Path.Main}>
          Home
        </Button>
      </div>
    </>
  )
}
