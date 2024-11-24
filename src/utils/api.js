// src/utils/api.js
import { users, roles } from './mockData';

// Fetch all users
export const fetchUsers = () => {
  return Promise.resolve(users);
};

// Fetch all roles
export const fetchRoles = () => {
  return Promise.resolve(roles);
};

// Add a new user
export const addUser = (user) => {
  // Assign a new id to the user (based on the current length of users array)
  const newUser = { id: users.length + 1, ...user };
  users.push(newUser);
  return Promise.resolve(newUser);
};

// Update user details
export const updateUser = (id, updatedUser) => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    // Merge the existing user with updated data
    users[index] = { ...users[index], ...updatedUser };
    return Promise.resolve(users[index]);
  }
  return Promise.reject(new Error('User not found'));
};

// Delete a user
export const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    // Remove the user from the list
    users.splice(index, 1);
    return Promise.resolve();
  }
  return Promise.reject(new Error('User not found'));
};
