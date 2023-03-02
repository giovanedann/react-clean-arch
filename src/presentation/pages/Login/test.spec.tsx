import '@testing-library/jest-dom'
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
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled()

    expect(
      screen.getByPlaceholderText(/enter your e-mail/i)
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(/enter your password/i)
    ).toBeInTheDocument()

    expect(screen.getAllByText('🔴')).toHaveLength(2)
  })

  it('should show the email error if email validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createLoginSut({ error: 'Invalid email' })

    await user.type(
      screen.getByPlaceholderText(/enter your e-mail/i),
      faker.internet.email()
    )

    const [emailInputStatus] = screen.getAllByText('🔴')

    expect(emailInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the password error if password validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createLoginSut({ error: 'Invalid password' })

    await user.type(
      screen.getByPlaceholderText(/enter your password/i),
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

    expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled()
  })

  it('should call authentication with correct values', async () => {
    const user = userEvent.setup()

    const { authenticationSpy } = createLoginSut({})

    const { email, password } = await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(authenticationSpy.params).toStrictEqual({
      email,
      password
    })
  })

  it('should not call authentication if form fields are invalid', async () => {
    const user = userEvent.setup()

    const { authenticationSpy } = createLoginSut({ error: 'invalid fields' })

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled()

    expect(authenticationSpy.calls).toBe(0)
  })

  it('should display an error and hide spinner on form if authentication fails', async () => {
    const user = userEvent.setup()
    const error = new InvalidCredentialsError()

    const { authenticationSpy } = createLoginSut({})
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.queryByText(/carregando\.../i)).not.toBeInTheDocument()
    expect(await screen.findByText(error.message)).toBeInTheDocument()
  })

  it('should remove the form error on the second submit attempt if first one fails', async () => {
    const user = userEvent.setup()
    const error = new InvalidCredentialsError()

    const { authenticationSpy } = createLoginSut({})
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.queryByText(/carregando\.../i)).not.toBeInTheDocument()
    expect(await screen.findByText(error.message)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.queryByText(error.message)).not.toBeInTheDocument()
  })

  it('should call SaveAccessToken if auth succeed', async () => {
    const user = userEvent.setup()

    const { authenticationSpy, saveAccessTokenMock } = createLoginSut({})

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    )
  })

  it('should show an error if SaveAccessToken save method fails', async () => {
    const user = userEvent.setup()
    const { saveAccessTokenMock } = createLoginSut({})

    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockRejectedValueOnce(new Error('Error on SaveAccessToken'))

    await populateValidInputs(user)
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(
      await screen.findByText(/error on saveaccesstoken/i)
    ).toBeInTheDocument()
  })

  it('should go to the home page if the authentication succeeds', async () => {
    const user = userEvent.setup()
    createLoginSut({})

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/home/i)).toBeInTheDocument()
  })

  it('should go to the sign-up page if the sign up button is clicked', async () => {
    const user = userEvent.setup()
    createLoginSut({})

    await user.click(screen.getByRole('link', { name: /sign up/i }))

    expect(
      screen.queryByRole('link', { name: /sign up/i })
    ).not.toBeInTheDocument()

    expect(await screen.findByText(/sign up/i)).toBeInTheDocument()
  })
})
