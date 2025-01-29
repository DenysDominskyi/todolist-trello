import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { TasksSkeleton } from "features/todolists/ui/skeletons/TaskSeleton/TasksSkeleton"
import { TasksPaginations } from "../TasksPagination/TasksPaginations"
import { useTasks } from "../../lib/hooks/useTasks"
import { DomainTodolist } from "features/todolists/api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {

  const { tasks, isLoading, totalCount, page, setPage } = useTasks(todolist)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {tasks?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          {(totalCount || 0) > 4 && <TasksPaginations totalCount={totalCount || 0} page={page} setPage={setPage} />}
        </>
      )}
    </>
  )
}
