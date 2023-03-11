import { render } from '@testing-library/react'
import PrivateRoute from 'main/Routes/PrivateRoute'
import { ApiContext } from 'presentation/contexts/api'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockAccountModel } from 'tests/mocks/domain/models/authentication'

export default function createPrivateRouteSut(
  account = mockAccountModel()
): void {
  render(
    <MemoryRouter initialEntries={['/']}>
      <ApiContext.Provider
        value={{
          saveCurrentAccount: jest.fn(),
          getCurrentAccount: () => account
        }}
      >
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<h1>Home</h1>} />
          </Route>
          <Route path="login" element={<h1>Login</h1>} />
        </Routes>
      </ApiContext.Provider>
    </MemoryRouter>
  )
}
