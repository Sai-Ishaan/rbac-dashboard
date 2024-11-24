// src/components/PermissionModal.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PermissionModal = ({ isOpen, role, onClose, onSave }) => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (role) {
      setPermissions(role.permissions || []);
    }
  }, [role]);

  const handleTogglePermission = (permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSave = () => {
    onSave(role.id, permissions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl mb-4">Manage Permissions for {role.name}</h3>
        <div className="space-y-2">
          {['view', 'edit', 'delete'].map((permission) => (
            <div key={permission} className="flex items-center">
              <input
                type="checkbox"
                id={permission}
                checked={permissions.includes(permission)}
                onChange={() => handleTogglePermission(permission)}
                className="mr-2"
              />
              <label htmlFor={permission} className="text-sm">{`Can ${permission}`}</label>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

PermissionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  role: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PermissionModal;
