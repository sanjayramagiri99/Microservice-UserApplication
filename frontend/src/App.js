import React, { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { getUserService } from './services/userService';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const userService = getUserService();

  useEffect(() => {
    fetchUsers();
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      console.log('Backend health:', data);
    } catch (err) {
      console.error('Health check failed:', err);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users. Make sure the backend is running.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const newUser = await userService.createUser(userData);
      setUsers([...users, newUser]);
      return true;
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
      return false;
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      const updatedUser = await userService.updateUser(id, userData);
      setUsers(users.map(user => user.id === id ? updatedUser : user));
      setEditingUser(null);
      return true;
    } catch (err) {
      setError('Failed to update user');
      console.error('Error updating user:', err);
      return false;
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservice Application</h1>
        <p>Java Spring Boot + React</p>
      </header>
      
      <main className="App-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="content-container">
          <div className="form-section">
            <h2>{editingUser ? 'Edit User' : 'Create New User'}</h2>
            <UserForm
              user={editingUser}
              onSubmit={editingUser 
                ? (data) => handleUpdateUser(editingUser.id, data)
                : handleCreateUser
              }
              onCancel={editingUser ? handleCancelEdit : null}
            />
          </div>

          <div className="list-section">
            <div className="list-header">
              <h2>Users</h2>
              <button 
                onClick={fetchUsers} 
                className="refresh-btn"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            {loading && users.length === 0 ? (
              <div className="loading">Loading users...</div>
            ) : (
              <UserList
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

