import 'jest-localstorage-mock'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import createLoginSut from 'tests/mocks/presentation/Login/createLoginSut'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}))

describe('<Login />', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should display the loader during submit request', async () => {
    const user = userEvent.setup()
    createLoginSut()

    await user.type(
      screen.getByLabelText(/enter your e-mail/i),
      faker.internet.email()
    )
    await user.type(
      screen.getByLabelText(/enter your password/i),
      faker.internet.password()
    )

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/loading\.../i)).toBeInTheDocument()
  })

  it('should call authentication only once', async () => {
    const user = userEvent.setup()
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { authenticationSpy } = createLoginSut()

    await user.type(screen.getByLabelText(/enter your e-mail/i), email)
    await user.type(screen.getByLabelText(/enter your password/i), password)

    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(authenticationSpy.calls).toBe(1)
  })
})
