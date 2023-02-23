import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

import Login from '.'
import { ValidationStub } from 'tests/mocks/validation'

describe('<Login /> component', () => {
  it('should not render the loader and have the submit button disabled initially', () => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = 'Required fields'
    render(<Login validation={validationStub} />)

    expect(screen.queryByText(/carregando\.\.\./i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()

    expect(
      screen.getByPlaceholderText(/digite seu e-mail/i)
    ).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument()

    expect(screen.getAllByText('🔴')).toHaveLength(2)
  })

  it('should show the email error if validation fails', async () => {
    const user = userEvent.setup()
    const email = faker.internet.email()

    const validationStub = new ValidationStub()
    validationStub.errorMessage = 'Invalid email'

    render(<Login validation={validationStub} />)

    await user.type(screen.getByPlaceholderText(/digite seu e-mail/i), email)

    const [emailInputStatus] = screen.getAllByText('🔴')

    expect(emailInputStatus.title).toBe(validationStub.errorMessage)
  })

  it('should show the password error if validation fails', async () => {
    const user = userEvent.setup()
    const password = faker.internet.password()

    const validationStub = new ValidationStub()
    validationStub.errorMessage = 'Invalid password'

    render(<Login validation={validationStub} />)

    await user.type(screen.getByPlaceholderText(/digite sua senha/i), password)

    const [, passwordInputStatus] = screen.getAllByText('🔴')

    expect(passwordInputStatus.title).toBe(validationStub.errorMessage)
  })
})
