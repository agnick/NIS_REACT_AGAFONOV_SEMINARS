import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../store/api/usersApi';
import UserForm from './UserForm';

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe('UserForm (тест компонента)', () => {
  test('отображает форму добавления пользователя', () => {
    renderWithStore(<UserForm editingUser={null} onCancelEdit={jest.fn()} />);

    expect(screen.getByText('Добавление пользователя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите имя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Добавить' })).toBeInTheDocument();
  });

  test('отображает форму редактирования с заполненными полями', () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
    renderWithStore(<UserForm editingUser={user} onCancelEdit={jest.fn()} />);

    expect(screen.getByText('Редактирование пользователя')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Сохранить' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Отмена' })).toBeInTheDocument();
  });

  test('позволяет вводить данные в поля формы', async () => {
    renderWithStore(<UserForm editingUser={null} onCancelEdit={jest.fn()} />);

    const nameInput = screen.getByPlaceholderText('Введите имя');
    const emailInput = screen.getByPlaceholderText('Введите email');

    await userEvent.type(nameInput, 'Jane');
    await userEvent.type(emailInput, 'jane@test.com');

    expect(nameInput).toHaveValue('Jane');
    expect(emailInput).toHaveValue('jane@test.com');
  });
});
