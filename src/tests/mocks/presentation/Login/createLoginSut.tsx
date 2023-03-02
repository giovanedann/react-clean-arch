import { render } from '@testing-library/react'
import { FormProvider } from 'presentation/contexts/form'
import Login from 'presentation/pages/Login'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthenticationSpy } from 'tests/mocks/domain/models/authentication'
import { SaveAccessTokenMock } from 'tests/mocks/infra/cache/save-access-token'
import { ValidationStub } from 'tests/mocks/presentation/protocols/validation'

export type SutTypes = {
  validationStub: ValidationStub<any>
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

export type SutParams = {
  error?: string
}

export default function createLoginSut({ error = '' }: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

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
                validation={validationStub as any}
                authentication={authenticationSpy}
                saveAccessToken={saveAccessTokenMock}
              />
            </FormProvider>
          }
        />
        <Route path="sign-up" element={<h1>Sign up</h1>} />
      </Routes>
    </MemoryRouter>
  )

  return { validationStub, authenticationSpy, saveAccessTokenMock }
}
