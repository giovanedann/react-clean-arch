/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

type FormContextProps = {
  isLoading: boolean
  errorMessage: string
  setErrorMessage: Dispatch<SetStateAction<string>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  resetFormStatus: () => void
}

export enum ErrorMessages {
  email = 'O campo e-mail é obrigatório',
  password = 'O campo senha é obrigatório'
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const FormContext = createContext({} as FormContextProps)

type FormProviderProps = {
  children: ReactNode
}

function FormProvider({ children }: FormProviderProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const resetFormStatus = useCallback(() => {
    setIsLoading(false)
    setErrorMessage('')
  }, [])

  const formContextValue = useMemo(
    () => ({
      isLoading,
      errorMessage,
      setIsLoading,
      setErrorMessage,
      resetFormStatus
    }),
    [isLoading, errorMessage, setIsLoading, setErrorMessage, resetFormStatus]
  )

  return (
    <FormContext.Provider value={formContextValue}>
      {children}
    </FormContext.Provider>
  )
}

const useForm = (): FormContextProps => useContext(FormContext)

export { FormProvider, useForm }
