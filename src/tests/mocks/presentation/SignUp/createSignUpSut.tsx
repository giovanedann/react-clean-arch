import { render } from '@testing-library/react'
import { FormProvider } from 'presentation/contexts/form'
import SignUp from 'presentation/pages/SignUp'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthenticationSpy } from 'tests/mocks/domain/models/authentication'
import { SaveAccessTokenMock } from 'tests/mocks/infra/cache/save-access-token'
import { ValidationStub } from 'tests/mocks/presentation/protocols/validation'

export type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

export type SutParams = {
  error?: string
}

export default function createSignUpSut({ error = '' }: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  validationStub.errorMessage = error

  render(
    <MemoryRouter initialEntries={['/sign-up']}>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="login" element={<h1>Login</h1>} />
        <Route
          path="sign-up"
          element={
            <FormProvider>
              <SignUp validation={validationStub} />
            </FormProvider>
          }
        />
      </Routes>
    </MemoryRouter>
  )

  return { validationStub, authenticationSpy, saveAccessTokenMock }
}
