import { render } from '@testing-library/react'
import { ApiContext } from 'presentation/contexts/api'
import { FormProvider } from 'presentation/contexts/form'
import Login from 'presentation/pages/Login'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthenticationSpy } from 'tests/mocks/domain/models/authentication'
import { ValidationStub } from 'tests/mocks/presentation/protocols/validation'

export type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveCurrentAccountMock: jest.Mock
}

export type SutParams = {
  error?: string
}

export default function createLoginSut({
  error = ''
}: SutParams = {}): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveCurrentAccountMock = jest.fn()

  validationStub.errorMessage = error

  render(
    <MemoryRouter initialEntries={['/login']}>
      <ApiContext.Provider
        value={{
          saveCurrentAccount: saveCurrentAccountMock,
          getCurrentAccount: jest.fn()
        }}
      >
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route
            path="login"
            element={
              <FormProvider>
                <Login
                  validation={validationStub as any}
                  authentication={authenticationSpy}
                />
              </FormProvider>
            }
          />
          <Route path="sign-up" element={<h1>Sign up</h1>} />
        </Routes>
      </ApiContext.Provider>
    </MemoryRouter>
  )

  return { validationStub, authenticationSpy, saveCurrentAccountMock }
}
