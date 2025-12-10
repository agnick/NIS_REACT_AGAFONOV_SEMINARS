import React, { useState, useEffect } from 'react';
import { useAddUserMutation, useUpdateUserMutation, User } from '../store/api/usersApi';

interface UserFormProps {
  editingUser: User | null;
  onCancelEdit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ editingUser, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      await updateUser({ id: editingUser.id, name, email });
      onCancelEdit();
    } else {
      await addUser({ name, email });
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="section">
      <h2>{editingUser ? 'Редактирование пользователя' : 'Добавление пользователя'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary" disabled={isAdding || isUpdating}>
            {editingUser ? 'Сохранить' : 'Добавить'}
          </button>
          {editingUser && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
