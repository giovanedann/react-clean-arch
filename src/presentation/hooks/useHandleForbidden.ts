import { AccessDeniedError } from 'domain/errors'
import { useApi } from 'presentation/contexts/api'
import { useNavigate } from 'react-router-dom'

type Callback = (error: Error) => void
type Result = (error: Error) => void

export default function useHandleForbidden(callback: Callback): Result {
  const navigate = useNavigate()
  const { saveCurrentAccount } = useApi()

  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      saveCurrentAccount(null)
      navigate('/login')
    } else {
      callback(error)
    }
  }
}
