import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

import Login from '.'
import { ValidationStub } from 'tests/mocks/validation'
import { FormProvider } from 'presentation/contexts/form'
import { AuthenticationSpy } from 'tests/mocks/authentication'

type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  error?: string
}

function createSut({ error = '' }: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = error

  render(
    <FormProvider>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </FormProvider>
  )

  return { validationStub, authenticationSpy }
}

describe('<Login /> component', () => {
  it('should not render the loader and have the submit button disabled initially', () => {
    createSut({ error: 'Required fields' })

    expect(screen.queryByText(/carregando\.../i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()

    expect(
      screen.getByPlaceholderText(/digite seu e-mail/i)
    ).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument()

    expect(screen.getAllByText('🔴')).toHaveLength(2)
  })

  it('should show the email error if email validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSut({ error: 'Invalid email' })

    await user.type(
      screen.getByPlaceholderText(/digite seu e-mail/i),
      faker.internet.email()
    )

    const [emailInputStatus] = screen.getAllByText('🔴')

    expect(emailInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the password error if password validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSut({ error: 'Invalid password' })

    await user.type(
      screen.getByPlaceholderText(/digite sua senha/i),
      faker.internet.password()
    )

    const [, passwordInputStatus] = screen.getAllByText('🔴')

    expect(passwordInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should display the success status if validation does not return errors', async () => {
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

    expect(screen.getAllByText('🟢')).toHaveLength(2)
  })

  it('should enable submit button if form data is valid', async () => {
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

    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
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

  it('should call authentication with correct values', async () => {
    const user = userEvent.setup()
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { authenticationSpy } = createSut({})

    await user.type(screen.getByPlaceholderText(/digite seu e-mail/i), email)
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), password)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(authenticationSpy.params).toStrictEqual({
      email,
      password
    })
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
