import React from 'react';
import { useGetUsersQuery, User } from '../store/api/usersApi';

interface UserListProps {
  onEditUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onEditUser }) => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) {
    return (
      <div className="section">
        <h2>Список пользователей</h2>
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <h2>Список пользователей</h2>
        <div className="error">Ошибка загрузки пользователей</div>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Список пользователей</h2>
      <ul className="user-list">
        {users?.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
            <button className="btn btn-secondary btn-edit" onClick={() => onEditUser(user)}>
              Редактировать
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
