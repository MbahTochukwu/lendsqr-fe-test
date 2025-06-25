import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserFilters from '../components/UserFilters';
import './Users.scss';
import usersData from '../data/mockUsers.json';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 9;

  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    phone: '',
    dateJoined: '',
    status: '',
  });

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(usersData));
    }

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const filteredUsers = users.filter((user) => {
    return (
      (!filters.organization || user.name.toLowerCase().includes(filters.organization.toLowerCase())) &&
      (!filters.username || user.name.toLowerCase().includes(filters.username.toLowerCase())) &&
      (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.phone || user.phone.includes(filters.phone)) &&
      (!filters.dateJoined || user.dateJoined.includes(filters.dateJoined)) &&
      (!filters.status || user.status === filters.status)
    );
  });

  const handleStatusChange = (id: number, newStatus: User['status']) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
    setOpenDropdownId(null);
  };

  return (
    <div className="users-page">
      <h2>Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            {['organization', 'username', 'email', 'phone', 'dateJoined', 'status'].map((key) => (
              <th key={key} style={{ position: 'relative', zIndex: 10 }}>
                <div onClick={() => setActiveFilter(key)} style={{ cursor: 'pointer' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  <img src="/filter-icon.svg" alt="filter" />
                </div>
                {activeFilter === key && (
                  <UserFilters
                    columnKey={key}
                    filters={filters}
                    setFilters={setFilters}
                    onClose={() => setActiveFilter(null)}
                  />
                )}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
            .map((user) => (
              <tr key={user.id}>
                <td>{filters.organization || 'Lendsqr'}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.dateJoined}</td>
                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td style={{ position: 'relative', zIndex: 5 }}>
                  <button
                    className="action-btn"
                    onClick={() =>
                      setOpenDropdownId(openDropdownId === user.id ? null : user.id)
                    }
                  >
                    •••
                  </button>

                  {openDropdownId === user.id && (
                    <div className="action-dropdown">
                      <div onClick={() => navigate(`/dashboard/users/${user.id}`)}>
                        <img src="/view-icon.svg" alt="view" className="action-icon" />
                        View Details
                      </div>
                      <div onClick={() => handleStatusChange(user.id, 'Blacklisted')}>
                        <img src="/blacklist-icon.svg" alt="blacklist" className="action-icon" />
                        Blacklist User
                      </div>
                      <div onClick={() => handleStatusChange(user.id, 'Active')}>
                        <img src="/activate-icon.svg" alt="activate" className="action-icon" />
                        Activate User
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div
        className="pagination-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div className="page-info" style={{ fontSize: '14px' }}>
          Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
        </div>

        <div
          className="pagination-controls"
          style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: '5px 10px', cursor: 'pointer' }}
          >
            Prev
          </button>

          {(() => {
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const pagesToShow = [];

  pagesToShow.push(1);

  if (currentPage > 2) {
    if (currentPage > 3) {
      pagesToShow.push('...');
    }
    pagesToShow.push(currentPage - 1);
  }

  if (currentPage !== 1 && currentPage !== totalPages) {
    pagesToShow.push(currentPage);
  }

  if (currentPage < totalPages - 1) {
    pagesToShow.push(currentPage + 1);
    if (currentPage < totalPages - 2) {
      pagesToShow.push('...');
    }
  }

  if (totalPages !== 1) {
    pagesToShow.push(totalPages);
  }

  return pagesToShow.map((page, i) =>
    page === '...' ? (
      <span key={i} style={{ padding: '5px 10px' }}>...</span>
    ) : (
      <button
        key={page}
        onClick={() => setCurrentPage(Number(page))}
        style={{
          padding: '5px 10px',
          backgroundColor: currentPage === page ? '#007bff' : '#f0f0f0',
          color: currentPage === page ? '#fff' : '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {page}
      </button>
    )
  );
})()}

        </div>
      </div>
    </div>
  );
}
