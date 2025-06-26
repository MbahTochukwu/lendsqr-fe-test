import { useState } from 'react';
import './UserFilters.scss';

interface Props {
  columnKey: string;
  filters: {
    organization: string;
    username: string;
    email: string;
    phone: string;
    dateJoined: string;
    status: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    organization: string;
    username: string;
    email: string;
    phone: string;
    dateJoined: string;
    status: string;
  }>>;
  onClose: () => void;
}

export default function UserFilters({ filters, setFilters, onClose }: Props) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const cleared = {
      organization: '',
      username: '',
      email: '',
      phone: '',
      dateJoined: '',
      status: '',
    };
    setLocalFilters(cleared);
    setFilters(cleared);
    onClose();
  };

  return (
    <div className="user-filters-dropdown">
      <div className="filter-group">
        <label>Organization</label>
        <select name="organization" value={localFilters.organization} onChange={handleChange}>
          <option value="">Select</option>
          <option value="irorun">Irorun</option>
          <option value="lendsqr">Lendsqr</option>
          <option value="lendstart">Lendstart</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={localFilters.username}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={localFilters.email}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={localFilters.phone}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Date Joined</label>
        <input
          type="date"
          name="dateJoined"
          value={localFilters.dateJoined}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select name="status" value={localFilters.status} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </div>

      <div className="filter-buttons">
        <button className="filter-btn" onClick={handleFilter}>
          Filter
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
