/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { useApi } from 'presentation/contexts/api'
import { useEffect, type ReactElement } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function PrivateRoute(): ReactElement {
  const { getCurrentAccount } = useApi()
  const navigate = useNavigate()

  useEffect(() => {
    const account = getCurrentAccount()

    if (!account || !account?.accessToken) {
      navigate('login')
    }
  }, [])

  return <Outlet />
}
