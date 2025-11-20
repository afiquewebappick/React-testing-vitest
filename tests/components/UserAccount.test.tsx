import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';

describe('UserAccount', () => {
  it('should render name of the user if there is user', () => {
    const user: User = { id: 1, name: 'Afique' };

    render(<UserAccount user={user}></UserAccount>);

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('should render edit button if user is admin', () => {
    const user: User = { id: 1, name: 'Afique', isAdmin: true };

    render(<UserAccount user={user}></UserAccount>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it('should render not edit button if user is not admin', () => {
    const user: User = { id: 1, name: 'Afique' };

    render(<UserAccount user={user}></UserAccount>);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
