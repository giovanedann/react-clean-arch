/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type FormContextProps = {
  isLoading: boolean
  errorMessage: string
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
  const [isLoading, _setIsLoading] = useState<boolean>(false)
  const [errorMessage, _setErrorMessage] = useState<string>('')

  const formContextValue = useMemo(
    () => ({
      isLoading,
      errorMessage
    }),
    [isLoading, errorMessage]
  )

  return (
    <FormContext.Provider value={formContextValue}>
      {children}
    </FormContext.Provider>
  )
}

const useForm = (): FormContextProps => useContext(FormContext)

export { FormProvider, useForm }
