import { AccessDeniedError } from 'domain/errors'
import useLogout from './useLogout'

type Callback = (error: Error) => void
type Result = (error: Error) => void

export default function useHandleForbidden(callback: Callback): Result {
  const logout = useLogout()

  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      logout()
    } else {
      callback(error)
    }
  }
}
