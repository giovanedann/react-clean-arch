import { render } from '@testing-library/react'
import { ApiContext } from 'presentation/contexts/api'
import { FormProvider } from 'presentation/contexts/form'
import SignUp from 'presentation/pages/SignUp'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AddAccountSpy } from 'tests/mocks/domain/models/add-account'
import { ValidationStub } from 'tests/mocks/presentation/protocols/validation'

export type SutTypes = {
  validationStub: ValidationStub
  addAccountSpy: AddAccountSpy
  saveCurrentAccountMock: jest.Mock
}

export type SutParams = {
  error?: string
}

export default function createSignUpSut({ error = '' }: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const saveCurrentAccountMock = jest.fn()

  validationStub.errorMessage = error

  render(
    <MemoryRouter initialEntries={['/sign-up']}>
      <ApiContext.Provider
        value={{ saveCurrentAccount: saveCurrentAccountMock }}
      >
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="login" element={<h1>Login</h1>} />
          <Route
            path="sign-up"
            element={
              <FormProvider>
                <SignUp
                  validation={validationStub as any}
                  addAccount={addAccountSpy}
                />
              </FormProvider>
            }
          />
        </Routes>
      </ApiContext.Provider>
    </MemoryRouter>
  )

  return {
    validationStub,
    saveCurrentAccountMock,
    addAccountSpy
  }
}
