import { useEffect, type ReactElement } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function PrivateRoute(): ReactElement {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login')
  }, [])

  return <Outlet />
}
