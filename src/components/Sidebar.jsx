import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="bg-primary text-white h-screen w-60 p-4">
    <h2 className="text-lg font-bold">Admin Panel</h2>
    <nav className="mt-4">
      <ul>
        <li>
          <Link to="/" className="block py-2 hover:bg-secondary rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/roles" className="block py-2 hover:bg-secondary rounded">Roles Management</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
