import React, { useState, useRef } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { User } from '../store/api/usersApi';

const AxiosDemo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ text: string; type: string }>({ text: '', type: '' });
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchUsers = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setStatus({ text: 'Загрузка...', type: 'loading' });

    try {
      const response = await axiosInstance.get<User[]>('/users', {
        signal: abortControllerRef.current.signal,
      });
      setUsers(response.data);
      setStatus({ text: 'Загрузка завершена', type: 'success' });
    } catch (error) {
      if (axios.isCancel(error)) {
        setStatus({ text: 'Запрос отменен', type: 'cancelled' });
      } else {
        setStatus({ text: 'Ошибка загрузки', type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setStatus({ text: 'Запрос отменен', type: 'cancelled' });
    }
  };

  return (
    <div className="section">
      <h2>Axios с отменой запроса (AbortController)</h2>
      <div className="axios-buttons">
        <button className="btn btn-primary" onClick={fetchUsers} disabled={isLoading}>
          Загрузить (Axios)
        </button>
        <button className="btn btn-danger" onClick={cancelRequest} disabled={!isLoading}>
          Отменить загрузку
        </button>
      </div>
      {status.text && (
        <p className={`status status-${status.type}`}>Статус: {status.text}</p>
      )}
      {users.length > 0 && (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AxiosDemo;
