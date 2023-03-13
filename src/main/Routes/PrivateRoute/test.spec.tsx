import { screen } from '@testing-library/react'
import { type AccountModel } from 'domain/models'
import createPrivateRouteSut from 'tests/mocks/presentation/PrivateRoute/createPrivateRouteSut'

describe('<PrivateRoute /> component', () => {
  it('should redirect to /login if token is empty', () => {
    createPrivateRouteSut(null as unknown as AccountModel)

    expect(
      screen.getByRole('heading', { level: 1, name: /login/i })
    ).toBeInTheDocument()
  })

  it('should render the page if token is not empty', () => {
    createPrivateRouteSut()

    expect(
      screen.getByRole('heading', { level: 1, name: /home/i })
    ).toBeInTheDocument()
  })
})
