import '@testing-library/jest-dom'
import 'jest-localstorage-mock'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

import { InvalidCredentialsError } from 'domain/errors'
import createLoginSut from 'tests/mocks/presentation/Login/createLoginSut'
import populateValidInputs from 'tests/utils/presentation/Login/populateValidInputs'

describe('<Login /> component', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should not render the loader and have the submit button disabled initially', () => {
    createLoginSut({ error: 'Required fields' })

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
    const { validationStub } = createLoginSut({ error: 'Invalid email' })

    await user.type(
      screen.getByPlaceholderText(/digite seu e-mail/i),
      faker.internet.email()
    )

    const [emailInputStatus] = screen.getAllByText('🔴')

    expect(emailInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the password error if password validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createLoginSut({ error: 'Invalid password' })

    await user.type(
      screen.getByPlaceholderText(/digite sua senha/i),
      faker.internet.password()
    )

    const [, passwordInputStatus] = screen.getAllByText('🔴')

    expect(passwordInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should display the success status if validation does not return errors', async () => {
    const user = userEvent.setup()
    createLoginSut({})

    await populateValidInputs(user)

    expect(screen.getAllByText('🟢')).toHaveLength(2)
  })

  it('should enable submit button if form data is valid', async () => {
    const user = userEvent.setup()
    createLoginSut({})

    await populateValidInputs(user)

    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
  })

  it('should call authentication with correct values', async () => {
    const user = userEvent.setup()

    const { authenticationSpy } = createLoginSut({})

    const { email, password } = await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(authenticationSpy.params).toStrictEqual({
      email,
      password
    })
  })

  it('should not call authentication if form fields are invalid', async () => {
    const user = userEvent.setup()

    const { authenticationSpy } = createLoginSut({ error: 'invalid fields' })

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()

    expect(authenticationSpy.calls).toBe(0)
  })

  it('should display an error and hide spinner on form if authentication fails', async () => {
    const user = userEvent.setup()
    const error = new InvalidCredentialsError()

    const { authenticationSpy } = createLoginSut({})
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.queryByText(/carregando\.../i)).not.toBeInTheDocument()
    expect(await screen.findByText(error.message)).toBeInTheDocument()
  })

  it('should call localStorage with access token if auth succeed', async () => {
    const user = userEvent.setup()

    const { authenticationSpy } = createLoginSut({})

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(localStorage.setItem).toBeCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    )
  })

  it('should go to the home page if the authentication succeeds', async () => {
    const user = userEvent.setup()
    createLoginSut({})

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText(/home/i)).toBeInTheDocument()
  })

  it('should go to the sign-up page if the sign up button is clicked', async () => {
    const user = userEvent.setup()
    createLoginSut({})

    await user.click(screen.getByRole('link', { name: /criar conta/i }))

    expect(
      screen.queryByRole('link', { name: /criar conta/i })
    ).not.toBeInTheDocument()

    expect(await screen.findByText(/sign up/i)).toBeInTheDocument()
  })
})
