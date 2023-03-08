import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import createPrivateRouteSut from 'tests/mocks/presentation/PrivateRoute/createPrivateRouteSut'

describe('<PrivateRoute /> component', () => {
  it('should redirect to /login if token is empty', () => {
    createPrivateRouteSut()

    expect(
      screen.getByRole('heading', { level: 1, name: /login/i })
    ).toBeInTheDocument()
  })
})
