import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

import Login from '.'
import { ValidationSpy } from 'tests/mocks/validation'

describe('<Login /> component', () => {
  it('should not render the loader and have the submit button disabled initially', () => {
    const validationSpy = new ValidationSpy()
    render(<Login validation={validationSpy} />)

    expect(screen.queryByText(/carregando\.\.\./i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()

    expect(
      screen.getByPlaceholderText(/digite seu e-mail/i)
    ).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument()

    expect(screen.getAllByText('🔴')).toHaveLength(2)
  })

  it('should call validation with the correct email', async () => {
    const user = userEvent.setup()
    const email = faker.internet.email()

    const validationSpy = new ValidationSpy()

    render(<Login validation={validationSpy} />)

    await user.type(screen.getByPlaceholderText(/digite seu e-mail/i), email)

    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  it('should call validation with the correct password', async () => {
    const user = userEvent.setup()
    const password = faker.internet.password()

    const validationSpy = new ValidationSpy()

    render(<Login validation={validationSpy} />)

    await user.type(screen.getByPlaceholderText(/digite sua senha/i), password)

    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })
})
