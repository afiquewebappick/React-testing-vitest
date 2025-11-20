import Greet from '../../src/components/Greet';
import { render, screen } from '@testing-library/react';

describe('Greet', () => {
  it('should render hello when name is provided', () => {
    render(<Greet name="Afique"></Greet>);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Afique/i);
  });

  it('should render name when name is not provided', () => {
    render(<Greet></Greet>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
