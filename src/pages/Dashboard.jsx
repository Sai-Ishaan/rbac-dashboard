// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { fetchUsers, addUser, deleteUser, updateUser } from '../utils/api';
import PropTypes from 'prop-types';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    // Fetch users from API or mock data
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    addUser(newUser).then((user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
      setNewUser({ name: '', email: '', role: '' });
    });
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    });
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleUpdateUser = () => {
    updateUser(editUser.id, editUser).then((updatedUser) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setEditUser(null);
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div>
        <h2 className="text-xl mb-4">Manage Users</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Add New User</h3>
          <div className="space-y-2">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              className="p-2 border border-gray-300 rounded"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <select
              className="p-2 border border-gray-300 rounded"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">User List</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editUser && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Edit User</h3>
            <div className="space-y-2">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
              <input
                type="email"
                className="p-2 border border-gray-300 rounded"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
              <select
                className="p-2 border border-gray-300 rounded"
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button
                onClick={handleUpdateUser}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update User
              </button>
              <button
                onClick={() => setEditUser(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  users: PropTypes.array.isRequired,
  newUser: PropTypes.object.isRequired,
  editUser: PropTypes.object,
};

export default Dashboard;
