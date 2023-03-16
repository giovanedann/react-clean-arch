import { useApi } from 'presentation/contexts/api'
import { useNavigate } from 'react-router-dom'

type Result = () => void

export default function useLogout(): Result {
  const navigate = useNavigate()
  const { saveCurrentAccount } = useApi()

  return () => {
    saveCurrentAccount(null)
    navigate('/login')
  }
}
