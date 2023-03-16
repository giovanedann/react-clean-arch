import { render } from '@testing-library/react'
import AuthHeader from 'presentation/components/AuthHeader'
import { ApiContext } from 'presentation/contexts/api'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

export type SutTypes = {
  saveCurrentAccountMock: jest.Mock
}

export default function createAuthHeaderSut(): SutTypes {
  const saveCurrentAccountMock = jest.fn()

  render(
    <MemoryRouter initialEntries={['/']}>
      <ApiContext.Provider
        value={{
          saveCurrentAccount: saveCurrentAccountMock,
          getCurrentAccount: jest.fn()
        }}
      >
        <Routes>
          <Route path="/" element={<AuthHeader />} />
          <Route path="login" element={<h1>Login</h1>} />
        </Routes>
      </ApiContext.Provider>
    </MemoryRouter>
  )

  return { saveCurrentAccountMock }
}
