import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ roles, onSubmit, initialValues, isEdit }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [role, setRole] = useState(initialValues?.role || roles[0]?.id);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setEmail(initialValues.email);
      setRole(initialValues.role);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, role };
    onSubmit(initialValues?.id, user);
    setName('');
    setEmail('');
    setRole(roles[0]?.id);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col space-y-4">
        <div>
          <label className="block">Name</label>
          <input 
            type="text" 
            className="input" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input 
            type="email" 
            className="input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="block">Role</label>
          <select 
            className="input" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn">
          {isEdit ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

UserForm.propTypes = {
  roles: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isEdit: PropTypes.bool.isRequired,
};

UserForm.defaultProps = {
  initialValues: null,
};

export default UserForm;
