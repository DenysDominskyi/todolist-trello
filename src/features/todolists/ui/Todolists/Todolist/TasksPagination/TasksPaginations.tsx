import { Pagination, Typography } from "@mui/material"
import s from './TasksPagination.module.css'
import { COUNT } from "features/todolists/api/tasksApi"
import { ChangeEvent } from "react"

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPaginations = ({ totalCount, page, setPage }: Props) => {
  const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }
  return (
    <>
    <Pagination 
        count={Math.ceil(totalCount / COUNT)}
        page={page}
        onChange={changePageHandler}
        shape="rounded"
        color="primary"
        className={s.pagination}
    />
    <div className={s.totalCount}>
        <Typography variant="caption">Total: {totalCount}</Typography>
    </div>
    </>
  )
}
