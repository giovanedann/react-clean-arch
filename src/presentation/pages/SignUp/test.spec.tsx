import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import createSignUpSut from 'tests/mocks/presentation/SignUp/createSignUpSut'

describe('<SignUp /> component', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it.only('should not render the loader and have the submit button disabled initially', () => {
    createSignUpSut({ error: 'Required fields' })

    expect(screen.queryByText(/carregando\.../i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()

    expect(
      screen.getByPlaceholderText(/digite seu e-mail/i)
    ).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/digite seu nome/i)).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/repita sua senha/i)).toBeInTheDocument()

    expect(screen.getAllByText('🔴')).toHaveLength(2)
  })
})
