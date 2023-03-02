import { render } from '@testing-library/react'
import { FormProvider } from 'presentation/contexts/form'
import SignUp from 'presentation/pages/SignUp'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AddAccountSpy } from 'tests/mocks/domain/models/add-account'
import { SaveAccessTokenMock } from 'tests/mocks/infra/cache/save-access-token'
import { ValidationStub } from 'tests/mocks/presentation/protocols/validation'

export type SutTypes = {
  validationStub: ValidationStub
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

export type SutParams = {
  error?: string
}

export default function createSignUpSut({ error = '' }: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
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
              <SignUp validation={validationStub} addAccount={addAccountSpy} />
            </FormProvider>
          }
        />
      </Routes>
    </MemoryRouter>
  )

  return {
    validationStub,
    saveAccessTokenMock,
    addAccountSpy
  }
}
