import '@testing-library/jest-dom'
import 'jest-localstorage-mock'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { createSut } from './test.spec'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}))

describe('<Login /> component navigation', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should display the loader during submit request', async () => {
    const user = userEvent.setup()
    createSut({})

    await user.type(
      screen.getByPlaceholderText(/digite seu e-mail/i),
      faker.internet.email()
    )
    await user.type(
      screen.getByPlaceholderText(/digite sua senha/i),
      faker.internet.password()
    )

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText(/carregando\.../i)).toBeInTheDocument()
  })

  it('should call authentication only once', async () => {
    const user = userEvent.setup()
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { authenticationSpy } = createSut({})

    await user.type(screen.getByPlaceholderText(/digite seu e-mail/i), email)
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), password)

    await user.click(screen.getByRole('button', { name: /entrar/i }))
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(authenticationSpy.calls).toBe(1)
  })
})
