import { render } from '@testing-library/react'
import { FormProvider } from 'presentation/contexts/form'
import Login from 'presentation/pages/Login'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthenticationSpy } from 'tests/mocks/domain/models/authentication'
import { ValidationStub } from 'tests/mocks/presentation/protocols/validation'

export type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

export type SutParams = {
  error?: string
}

export default function createLoginSut({ error = '' }: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = error

  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route
          path="login"
          element={
            <FormProvider>
              <Login
                validation={validationStub}
                authentication={authenticationSpy}
              />
            </FormProvider>
          }
        />
        <Route path="sign-up" element={<h1>Sign up</h1>} />
      </Routes>
    </MemoryRouter>
  )

  return { validationStub, authenticationSpy }
}
