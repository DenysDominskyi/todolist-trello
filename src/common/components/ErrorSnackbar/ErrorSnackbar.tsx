import Button from "@mui/material/Button"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { SyntheticEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectError } from "app/appSelectors"
import { setAppErrorAC } from "app/app-reducer"

export const ErrorSnackbar = () => {
  const appError = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (event?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setAppErrorAC(null))
  }

  return (
      <Snackbar open={appError !== null} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' variant="filled">
          {appError}
        </Alert>
      </Snackbar>
  )
}
