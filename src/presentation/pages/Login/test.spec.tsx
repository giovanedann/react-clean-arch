import '@testing-library/jest-dom'
import 'jest-localstorage-mock'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { faker } from '@faker-js/faker'

import Login from '.'
import { ValidationStub } from 'tests/mocks/validation'
import { FormProvider } from 'presentation/contexts/form'
import { AuthenticationSpy } from 'tests/mocks/authentication'
import { InvalidCredentialsError } from 'domain/errors'

export type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

export type SutParams = {
  error?: string
}

export function createSut({ error = '' }: SutParams): SutTypes {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = error

  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route
          path="login"
          element={
            <FormProvider>
              <Login
                validation={validationStub}
                authentication={authenticationSpy}
              />
            </FormProvider>
          }
        />
        <Route path="sign-up" element={<h1>Sign up</h1>} />
      </Routes>
    </MemoryRouter>
  )

  return { validationStub, authenticationSpy }
}

describe('<Login /> component', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

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

  it('should not call authentication if form fields are invalid', async () => {
    const user = userEvent.setup()

    const { authenticationSpy } = createSut({ error: 'invalid fields' })

    await user.type(
      screen.getByPlaceholderText(/digite seu e-mail/i),
      faker.internet.email()
    )
    await user.type(
      screen.getByPlaceholderText(/digite sua senha/i),
      faker.internet.password()
    )

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()

    expect(authenticationSpy.calls).toBe(0)
  })

  it('should display an error and hide spinner on form if authentication fails', async () => {
    const user = userEvent.setup()
    const error = new InvalidCredentialsError()

    const { authenticationSpy } = createSut({})
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    await user.type(
      screen.getByPlaceholderText(/digite seu e-mail/i),
      faker.internet.email()
    )
    await user.type(
      screen.getByPlaceholderText(/digite sua senha/i),
      faker.internet.password()
    )

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.queryByText(/carregando\.../i)).not.toBeInTheDocument()
    expect(await screen.findByText(error.message)).toBeInTheDocument()
  })

  it('should call localStorage with access token if auth succeed', async () => {
    const user = userEvent.setup()

    const { authenticationSpy } = createSut({})

    await user.type(
      screen.getByPlaceholderText(/digite seu e-mail/i),
      faker.internet.email()
    )
    await user.type(
      screen.getByPlaceholderText(/digite sua senha/i),
      faker.internet.password()
    )

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(localStorage.setItem).toBeCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    )
  })

  // it('should go to the home page if the authentication succeeds', async () => {
  //   const user = userEvent.setup()
  //   createSut({})

  //   await user.type(
  //     screen.getByPlaceholderText(/digite seu e-mail/i),
  //     faker.internet.email()
  //   )
  //   await user.type(
  //     screen.getByPlaceholderText(/digite sua senha/i),
  //     faker.internet.password()
  //   )

  //   await user.click(screen.getByRole('button', { name: /entrar/i }))

  //   expect(await screen.findByText(/home/i)).toBeInTheDocument()
  // })

  it('should go to the sign-up page if the sign up button is clicked', async () => {
    const user = userEvent.setup()
    createSut({})

    await user.click(screen.getByRole('link', { name: /criar conta/i }))

    expect(
      screen.queryByRole('link', { name: /criar conta/i })
    ).not.toBeInTheDocument()

    expect(await screen.findByText(/sign up/i)).toBeInTheDocument()
  })
})
