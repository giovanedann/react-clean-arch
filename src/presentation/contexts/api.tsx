import { type AccountModel } from 'domain/models'
import { setCurrentAccountAdapter } from 'main/adapters/current-account-adapter'
import { createContext, type ReactNode, useContext, useCallback } from 'react'
import { mockAccountModel } from 'tests/mocks/domain/models/authentication'

type ApiContextProps = {
  saveCurrentAccount: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const ApiContext = createContext({} as ApiContextProps)

type ApiProviderProps = {
  children: ReactNode
}

function ApiProvider({ children }: ApiProviderProps): JSX.Element {
  const saveCurrentAccount = useCallback((account: AccountModel) => {
    setCurrentAccountAdapter(account)
  }, [])

  const getCurrentAccount = useCallback(() => mockAccountModel(), [])

  return (
    <ApiContext.Provider value={{ saveCurrentAccount, getCurrentAccount }}>
      {children}
    </ApiContext.Provider>
  )
}

const useApi = (): ApiContextProps => useContext(ApiContext)

export { ApiProvider, useApi, ApiContext }
