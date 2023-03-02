import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import createSignUpSut from 'tests/mocks/presentation/SignUp/createSignUpSut'
import populateValidInputs from 'tests/utils/presentation/SignUp/populateValidInputs'

describe('<SignUp /> component', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should not render the loader and have the submit button disabled initially', () => {
    createSignUpSut({ error: 'Required fields' })

    expect(screen.queryByText(/carregando\.../i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeDisabled()

    expect(
      screen.getByPlaceholderText(/enter your e-mail/i)
    ).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(/enter your password/i)
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/confirm your password/i)
    ).toBeInTheDocument()

    expect(screen.getAllByText('🔴')).toHaveLength(4)
  })

  it('should show the name error if name validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSignUpSut({ error: 'Name is required' })

    await user.type(
      screen.getByPlaceholderText(/enter your name/i),
      faker.name.firstName()
    )

    const nameInputStatus = screen.getAllByText('🔴').at(0) as HTMLElement

    expect(nameInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the email error if email validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSignUpSut({ error: 'Email is required' })

    await user.type(
      screen.getByPlaceholderText(/enter your e-mail/i),
      faker.internet.email()
    )

    const emailInputStatus = screen.getAllByText('🔴').at(1) as HTMLElement

    expect(emailInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the password error if password validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSignUpSut({
      error: 'Password is required'
    })

    await user.type(
      screen.getByPlaceholderText(/enter your password/i),
      faker.internet.password()
    )

    const passwordInputStatus = screen.getAllByText('🔴').at(2) as HTMLElement

    expect(passwordInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the passowordConfirmation error if passwordConfirmation validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSignUpSut({
      error: 'Passwords not matching'
    })

    await user.type(
      screen.getByPlaceholderText(/confirm your password/i),
      faker.internet.password()
    )

    const passwordConfirmationInputStatus = screen
      .getAllByText('🔴')
      .at(-1) as HTMLElement

    expect(passwordConfirmationInputStatus.title).toBe(
      validationStub.errorMessage
    )
  })

  it('should display the success status if validation does not return errors', async () => {
    const user = userEvent.setup()
    createSignUpSut({})

    await populateValidInputs(user)

    expect(screen.getAllByText('🟢')).toHaveLength(4)
  })

  it('should enable submit button if form data is valid', async () => {
    const user = userEvent.setup()
    createSignUpSut({})

    await populateValidInputs(user)

    expect(screen.getByRole('button', { name: /sign up/i })).toBeEnabled()
  })

  it('should show loader during submit request', async () => {
    const user = userEvent.setup()
    createSignUpSut({})

    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByText(/loading\.../i)).toBeInTheDocument()
  })

  it('should call AddAccount with correct values', async () => {
    const user = userEvent.setup()

    const { addAccountSpy } = createSignUpSut({})

    const data = await populateValidInputs(user)
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(addAccountSpy.params).toStrictEqual({
      ...data,
      passwordConfirmation: data.password
    })
  })
})
