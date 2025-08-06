import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Hello from './Hello'

test('renders Hello text', () => {
  render(<Hello />)
  expect(screen.getByText(/Hello, Test!/i)).toBeInTheDocument()
})
