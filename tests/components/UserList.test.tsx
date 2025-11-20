import { render, screen } from '@testing-library/react';
import UserList from '../../src/components/UserList';
import { User } from '../../src/entities';

describe('UserList', () => {
  it('should render no users if user list is empty', () => {
    render(<UserList users={[]}></UserList>);

    const paragraph = screen.getByRole('paragraph');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(/No users/i);
  });

  it('should render users', () => {
    const users: User[] = [
      {
        id: 1,
        name: 'Afique',
      },
      { id: 2, name: 'Hossain' },
    ];

    render(<UserList users={users}></UserList>);

    users.forEach((user) => {
      const link = screen.getByRole('link', { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`)
    });

  });
});
