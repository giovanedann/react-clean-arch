import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmailAlreadyInUseError } from 'domain/errors'

import createSignUpSut from 'tests/mocks/presentation/SignUp/createSignUpSut'
import populateValidInputs from 'tests/utils/presentation/SignUp/populateValidInputs'

describe('<SignUp /> component', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should not render the loader and have the submit button disabled initially', () => {
    createSignUpSut({ error: 'Required field' })

    expect(screen.queryByText(/loading\.../i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeDisabled()

    expect(screen.getByLabelText(/enter your e-mail/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/enter your name/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/enter your password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm your password/i)).toBeInTheDocument()

    expect(screen.getAllByTitle(/required field/i)).toHaveLength(4)
  })

  it('should show the name error if name validation fails', async () => {
    const user = userEvent.setup()
    const error = faker.random.words()
    createSignUpSut({ error })

    await user.type(
      screen.getByLabelText(/enter your name/i),
      faker.name.firstName()
    )

    const nameInputLabel = screen.getByText(/enter your name/i)

    expect(nameInputLabel.title).toEqual(error)
  })

  it('should show the email error if email validation fails', async () => {
    const user = userEvent.setup()
    const error = faker.random.words()
    createSignUpSut({ error })

    await user.type(
      screen.getByLabelText(/enter your e-mail/i),
      faker.internet.email()
    )

    const emailInputLabel = screen.getByText(/enter your e-mail/i)

    expect(emailInputLabel.title).toEqual(error)
  })

  it('should show the password error if password validation fails', async () => {
    const user = userEvent.setup()
    const error = faker.random.words()
    createSignUpSut({ error })

    await user.type(
      screen.getByLabelText(/enter your password/i),
      faker.internet.password()
    )

    const passwordInputLabel = screen.getByText(/enter your password/i)

    expect(passwordInputLabel.title).toEqual(error)
  })

  it('should show the passwordConfirmation error if passwordConfirmation validation fails', async () => {
    const user = userEvent.setup()
    const error = faker.random.words()
    createSignUpSut({ error })

    await user.type(
      screen.getByLabelText(/confirm your password/i),
      faker.internet.password()
    )

    const passwordConfirmationInputLabel = screen.getByText(
      /confirm your password/i
    )

    expect(passwordConfirmationInputLabel.title).toEqual(error)
  })

  it('should display the success status if validation does not return errors', async () => {
    const user = userEvent.setup()
    createSignUpSut({})

    await populateValidInputs(user)

    expect(screen.getAllByRole('label')).toHaveLength(4)
  })

  it('should change inputs status', async () => {
    const user = userEvent.setup()

    const { validationStub } = createSignUpSut({ error: 'invalid' })
    jest.spyOn(validationStub, 'validate').mockImplementation(() => '')

    expect(screen.getAllByTitle(/invalid/i)).toHaveLength(4)

    await populateValidInputs(user)

    expect(screen.queryAllByTitle(/invalid/i)).toHaveLength(0)

    const labels = screen.getAllByRole('label')

    labels.forEach((label) => {
      expect(label.title).toBeFalsy()
    })
  })

  it('should enable submit button if form data is valid', async () => {
    const user = userEvent.setup()
    createSignUpSut({})

    await populateValidInputs(user)

    expect(screen.getByRole('button', { name: /sign up/i })).toBeEnabled()
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

  it('should call AddAccount only once if multiple submits', async () => {
    const user = userEvent.setup()

    const { addAccountSpy } = createSignUpSut({})

    await populateValidInputs(user)
    await user.dblClick(screen.getByRole('button', { name: /sign up/i }))

    expect(addAccountSpy.calls).toEqual(1)
  })

  it('should not call AddAccount on validation errors', async () => {
    const user = userEvent.setup()

    const { addAccountSpy } = createSignUpSut({ error: 'Invalid fields' })

    await user.dblClick(screen.getByRole('button', { name: /sign up/i }))

    expect(addAccountSpy.calls).toEqual(0)
  })

  it('should hide spinner and display a form error message if AddAccount fails', async () => {
    const user = userEvent.setup()
    const error = new EmailAlreadyInUseError()

    const { addAccountSpy } = createSignUpSut({})
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.queryByText(/loading\.../i)).not.toBeInTheDocument()
    expect(await screen.findByText(error.message)).toBeInTheDocument()
  })

  it('should call SaveAccessToken with correct accessToken on success', async () => {
    const user = userEvent.setup()
    const { saveCurrentAccountMock, addAccountSpy } = createSignUpSut({})

    await populateValidInputs(user)

    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(saveCurrentAccountMock).toBeCalledWith(addAccountSpy.account)
  })

  it('should redirect user to home if submit succeeds', async () => {
    const user = userEvent.setup()

    createSignUpSut({})
    await populateValidInputs(user)
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByText(/home/i)).toBeInTheDocument()
  })

  it('should redirect user to Login if link is clicked', async () => {
    const user = userEvent.setup()

    createSignUpSut({})
    await user.click(screen.getByRole('link', { name: /back to login/i }))

    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })
})
