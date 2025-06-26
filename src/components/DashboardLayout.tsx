import { Outlet, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './DashboardLayout.scss';
import '../pages/Users';
import DashboardCard from '../components/DashboardCard';
import { useLocation } from 'react-router-dom';

export default function DashboardLayout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const showDashboardCards =
    location.pathname === '/dashboard' || location.pathname === '/dashboard/users';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="dashboard-layout">
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-section">
          <img src="/logo.svg" alt="Lendsqr logo" className="logo" />
        </div>

        <nav className="sidebar-nav">
          <div className="switch-org">
            <img src="/briefcase.svg" />
            <span>Switch Organization </span>
            <img src="/dropup-icon.svg" alt="Dropdown" className="dropdown-icon" />
          </div>

          <NavLink to="/dashboard" className="nav-link">
            <img src="/dashboard.svg" alt="Dashboard" />
            Dashboard
          </NavLink>

          <p className="section-title">CUSTOMERS</p>
          <NavLink to="/dashboard/users" className="nav-link">
            <img src="/users.svg" alt="Users" />
            Users
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/guarantors.svg" alt="Guarantors" />
            Guarantors
          </NavLink>
          <NavLink to="/dashboard/loans" className="nav-link">
            <img src="/loans.svg" alt="Loans" />
            Loans
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/decision-models.svg" alt="Decision Models" />
            Decision Models
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/savings.svg" alt="Savings" />
            Savings
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/loan-requests.svg" alt="Loan Requests" />
            Loan Requests
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/whitelist.svg" alt="Whitelist" />
            Whitelist
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/karma.svg" alt="Karma" />
            Karma
          </NavLink>

          <p className="section-title">BUSINESSES</p>
          <NavLink to="#" className="nav-link">
            <img src="/briefcase.svg" alt="Organization" />
            Organization
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/products.svg" alt="Products" />
            Products
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/fees-pricing.svg" alt="Fees and Pricing" />
            Fees and Pricing
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/transactions.svg" alt="Transactions" />
            Transactions
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/services.svg" alt="Services" />
            Services
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/service-account.svg" alt="Service Account" />
            Service Account
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/settlements.svg" alt="Settlements" />
            Settlements
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/reports.svg" alt="Reports" />
            Reports
          </NavLink>

          <p className="section-title">SETTINGS</p>
          <NavLink to="#" className="nav-link">
            <img src="/preferences.svg" alt="Preferences" />
            Preferences
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/fees.svg" alt="Fees and Pricing" />
            Fees and Pricing
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/savings.svg" alt="Audit Logs" />
            Audit Logs
          </NavLink>
          <NavLink to="/dashboard/settings" className="nav-link">
            <img src="/settings.svg" alt="Settings" />
            Settings
          </NavLink>
          <NavLink to="#" className="nav-link">
            <img src="/logout.svg" alt="Logout" />
            Logout
          </NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="hamburger-btn"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <img src="/hamburger-icon.svg" alt="Menu" />
          </button>

          <div className="search-wrapper">
            <input type="text" placeholder="Search for anything" />
            <div className="search-icon">
              <img src="/search-icon.svg" alt="Search" />
            </div>
          </div>

          <div className="topbar-right">
            <a href="#" className="docs-link">Docs</a>
            <img src="/bell-icon.svg" alt="Notifications" className="icon" />
            <div
              className="user-profile"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <img src="/user-avatar.svg" alt="Profile" className="avatar" />
              <span className="username">Tochukwu</span>
              <img src="/dropdown-icon.svg" alt="Dropdown" className="dropdown-icon" />

              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">Profile</div>
                  <div className="dropdown-item">Settings</div>
                  <div className="dropdown-item">Switch Organization</div>
                  <div className="dropdown-item">Logout</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {showDashboardCards && (
          <div className="dashboard-cards">
            <DashboardCard icon="/users-icon.svg" title=" New Users" value="2,453" />
            <DashboardCard icon="/active-users-icon.svg" title="New Active Users" value="1,453" />
            <DashboardCard icon="/loans-icon.svg" title="New Users with Loans" value="12,453" />
            <DashboardCard icon="/savings-icon.svg" title="New Users with Savings" value="₦4,453,000" />
          </div>
        )}

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
