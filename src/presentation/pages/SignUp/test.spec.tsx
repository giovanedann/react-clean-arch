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
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()

    expect(
      screen.getByPlaceholderText(/digite seu e-mail/i)
    ).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/digite seu nome/i)).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/repita sua senha/i)).toBeInTheDocument()

    expect(screen.getAllByText('🔴')).toHaveLength(4)
  })

  it('should show the name error if name validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSignUpSut({ error: 'Name is required' })

    await user.type(
      screen.getByPlaceholderText(/digite seu nome/i),
      faker.name.firstName()
    )

    const [nameInputStatus] = screen.getAllByText('🔴')

    expect(nameInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the email error if email validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSignUpSut({ error: 'Email is required' })

    await user.type(
      screen.getByPlaceholderText(/digite seu e-mail/i),
      faker.internet.email()
    )

    const [, emailInputStatus] = screen.getAllByText('🔴')

    expect(emailInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the password error if password validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSignUpSut({
      error: 'Password is required'
    })

    await user.type(
      screen.getByPlaceholderText(/digite sua senha/i),
      faker.internet.password()
    )

    const [, , passwordInputStatus] = screen.getAllByText('🔴')

    expect(passwordInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the passowordConfirmation error if passwordConfirmation validation fails', async () => {
    const user = userEvent.setup()
    const { validationStub } = createSignUpSut({
      error: 'Passwords not matching'
    })

    await user.type(
      screen.getByPlaceholderText(/repita sua senha/i),
      faker.internet.password()
    )

    const [, , , passwordConfirmationInputStatus] = screen.getAllByText('🔴')

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
})
