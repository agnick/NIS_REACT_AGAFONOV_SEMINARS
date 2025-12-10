import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import AxiosDemo from './components/AxiosDemo';
import { User } from './store/api/usersApi';
import './App.css';

function App() {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="App">
      <h1>Управление пользователями</h1>
      <UserForm editingUser={editingUser} onCancelEdit={handleCancelEdit} />
      <UserList onEditUser={handleEditUser} />
      <AxiosDemo />
    </div>
  );
}

export default App;
