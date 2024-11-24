// src/pages/RoleManagement.jsx
import { useState, useEffect } from 'react';
import { fetchRoles, fetchUsers, addUser, updateUser, deleteUser } from '../utils/api';
import PermissionModal from '../components/PermissionsModal';
import UserForm from '../components/UserForm';
import Table from '../components/Table';
import PropTypes from 'prop-types';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch roles and users when the component mounts
    fetchRoles().then(setRoles);
    fetchUsers().then(setUsers);
  }, []);

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleSavePermissions = (roleId, updatedPermissions) => {
    // Update the permissions of the selected role
    setRoles((prevRoles) =>
      prevRoles.map((r) =>
        r.id === roleId ? { ...r, permissions: updatedPermissions } : r
      )
    );
  };

  const handleAddUser = async (user) => {
    const newUser = await addUser(user);
    setUsers([...users, newUser]);
  };

  const handleEditUser = async (id, updatedUser) => {
    const updated = await updateUser(id, updatedUser);
    setUsers(users.map((user) => (user.id === id ? updated : user)));
    setEditingUser(null); // Reset editing state
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>

      {/* Role Management Section */}
      <div className="space-y-4">
        <h2 className="text-xl">Roles</h2>
        <div className="grid grid-cols-2 gap-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="border p-4 rounded shadow-lg cursor-pointer"
              onClick={() => handleRoleClick(role)}
            >
              <h3 className="text-lg font-semibold">{role.name}</h3>
              <p>Permissions: {role.permissions.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Form Section (Add/Edit Users) */}
      <UserForm 
        roles={roles} 
        onSubmit={editingUser ? handleEditUser : handleAddUser} 
        initialValues={editingUser}
        isEdit={!!editingUser}
      />

      {/* Assign Users to Roles Section */}
      <h2 className="text-xl mt-8">Assign Users to Roles</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-4">
            <span>{user.name}</span>
            <select
              value={user.role}
              onChange={(e) => {}}
              className="p-2 border border-gray-300 rounded"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Users Table with Edit/Delete Actions */}
      <Table 
        users={users} 
        roles={roles} 
        onEdit={setEditingUser} 
        onDelete={handleDeleteUser} 
      />

      {/* Permission Modal */}
      <PermissionModal
        isOpen={isModalOpen}
        role={selectedRole}
        onClose={() => setModalOpen(false)}
        onSave={handleSavePermissions}
      />
    </div>
  );
};

RoleManagement.propTypes = {
  roles: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

export default RoleManagement;
