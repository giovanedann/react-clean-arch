import { render } from '@testing-library/react'
import { type AccountModel } from 'domain/models'
import AuthHeader from 'presentation/components/AuthHeader'
import { ApiContext } from 'presentation/contexts/api'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockAccountModel } from 'tests/mocks/domain/models/account'

export type SutTypes = {
  saveCurrentAccountMock: jest.Mock
  account: AccountModel
}

export default function createAuthHeaderSut(): SutTypes {
  const saveCurrentAccountMock = jest.fn()
  const account = mockAccountModel()

  render(
    <MemoryRouter initialEntries={['/']}>
      <ApiContext.Provider
        value={{
          saveCurrentAccount: saveCurrentAccountMock,
          getCurrentAccount: jest.fn(() => account)
        }}
      >
        <Routes>
          <Route path="/" element={<AuthHeader />} />
          <Route path="login" element={<h1>Login</h1>} />
        </Routes>
      </ApiContext.Provider>
    </MemoryRouter>
  )

  return { saveCurrentAccountMock, account }
}
