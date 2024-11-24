import PropTypes from 'prop-types';

const Table = ({ users, roles, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">
                {roles.find((role) => role.id === user.role)?.name}
              </td>
              <td className="px-4 py-2 border">
                <button onClick={() => onEdit(user)} className="btn mr-2">
                  Edit
                </button>
                <button onClick={() => onDelete(user.id)} className="btn text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  users: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Table;
