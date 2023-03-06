import { render } from '@testing-library/react'
import { FormProvider } from 'presentation/contexts/form'
import SignUp from 'presentation/pages/SignUp'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AddAccountSpy } from 'tests/mocks/domain/models/add-account'
import { SaveCurrentAccountMock } from 'tests/mocks/infra/cache/save-current-account'
import { ValidationStub } from 'tests/mocks/presentation/protocols/validation'

export type SutTypes = {
  validationStub: ValidationStub
  addAccountSpy: AddAccountSpy
  saveCurrentAccountMock: SaveCurrentAccountMock
}

export type SutParams = {
  error?: string
}

export default function createSignUpSut({ error = '' }: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const saveCurrentAccountMock = new SaveCurrentAccountMock()

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
              <SignUp
                validation={validationStub as any}
                addAccount={addAccountSpy}
                saveCurrentAccount={saveCurrentAccountMock}
              />
            </FormProvider>
          }
        />
      </Routes>
    </MemoryRouter>
  )

  return {
    validationStub,
    saveCurrentAccountMock,
    addAccountSpy
  }
}
