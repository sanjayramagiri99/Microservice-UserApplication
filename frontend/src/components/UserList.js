import React from 'react';
import './UserList.css';

const UserList = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found. Create your first user!</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <div className="user-info">
            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>
            {user.createdAt && (
              <p className="user-date">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="user-actions">
            <button
              className="edit-btn"
              onClick={() => onEdit(user)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;

