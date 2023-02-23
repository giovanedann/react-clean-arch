import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Login from '.'

describe('<Login /> component', () => {
  it('should not render the loader and have the submit button disabled initially', () => {
    render(<Login />)

    expect(screen.queryByText(/carregando\.\.\./i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
  })
})
