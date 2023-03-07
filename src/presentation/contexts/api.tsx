import { UnexpectedError } from 'domain/errors'
import { type AccountModel } from 'domain/models'
import localStorageAdapterFactory from 'main/factories/cache/local-storage-adapter-factory'
import { createContext, type ReactNode, useContext, useCallback } from 'react'

type ApiContextProps = {
  saveCurrentAccount: (account: AccountModel) => void
}

function setCurrentAccountAdapter(account: AccountModel): void {
  if (!account.accessToken) {
    throw new UnexpectedError()
  }

  localStorageAdapterFactory().set('currentAccount', account)
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

  return (
    <ApiContext.Provider value={{ saveCurrentAccount }}>
      {children}
    </ApiContext.Provider>
  )
}

const useApi = (): ApiContextProps => useContext(ApiContext)

export { ApiProvider, useApi, ApiContext }
