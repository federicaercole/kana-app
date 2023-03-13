import { render, screen } from '@testing-library/react';
import App from './App';

describe('testing the app logic', () => {
  render(<App />);
  test("", () => {

  });


  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
