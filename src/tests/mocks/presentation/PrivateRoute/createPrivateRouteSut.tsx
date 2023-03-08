import { render } from '@testing-library/react'
import PrivateRoute from 'main/Routes/PrivateRoute'
import { ApiContext } from 'presentation/contexts/api'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

export default function createPrivateRouteSut(): void {
  render(
    <MemoryRouter initialEntries={['/']}>
      <ApiContext.Provider value={{ saveCurrentAccount: jest.fn() }}>
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
