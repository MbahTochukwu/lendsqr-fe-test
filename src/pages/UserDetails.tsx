import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserDetails.scss';
import mockUsers from '../data/mockUsers.json'; 

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residence: string;
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    name: string;
    phone: string;
    email: string;
    relationship: string;
  };
  bank: {
    fullName: string;
    accountNumber: string;
    phone: string;
    bankName: string;
  };
  documents: { name: string; submitted: boolean }[];
  loans: { id: number; amount: string; status: string }[];
  savings: string;
  appSystem: string[];
}

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('general');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(mockUsers));
    }
  }, []);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers) as User[];
      const foundUser = users.find((u) => u.id.toString() === id);

      if (foundUser) {
        setUser(foundUser);
      } else {
        alert('User not found');
      }
    }
  }, [id]);

  if (!user) return <div>Loading user details...</div>;

  return (
    <div className="user-details-page" style={{ padding: '20px' }}>
      <button
        onClick={() => window.history.back()}
        className="back-btn"
      >
        ← Back to Users
      </button>

      <div className="top-header-row">
        <h2>User Details</h2>
        <div className="user-actions">
          <button
            className="blacklist-btn"
            onClick={() => {
              setUser((prev) => prev ? { ...prev, status: 'Blacklisted' } : prev);
              alert('User has been Blacklisted.');
            }}
          >
            Blacklist User
          </button>
          <button
            className="activate-btn"
            onClick={() => {
              setUser((prev) => prev ? { ...prev, status: 'Active' } : prev);
              alert('User has been Activated.');
            }}
          >
            Activate User
          </button>
        </div>
      </div>

      <div className="user-summary-card">
        <div className="user-info">
          <img src="/avatar-placeholder.svg" alt="User avatar" className="avatar" />
          <div>
            <h4>{user.name}</h4>
            <p>ID: USR{user.id}</p>
          </div>
        </div>
        <div className="user-tier">
          <p>User's Tier</p>
          <div className="stars">
            <span>★</span><span>☆</span><span>☆</span>
          </div>
        </div>
        <div className="user-account">
          <h4>₦20,000.00</h4>
          <p>{user.bank.accountNumber} / {user.bank.bankName}</p>
        </div>
      </div>

      <div className="tab-navigation">
        {['general', 'documents', 'bank', 'loans', 'savings', 'app'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'active-tab' : ''}
          >
            {{
              general: 'General Details',
              documents: 'Documents',
              bank: 'Bank Details',
              loans: 'Loans',
              savings: 'Savings',
              app: 'App and System',
            }[tab]}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'general' && (
          <>
            <div className="section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div><strong>Full Name:</strong> {user.name}</div>
                <div><strong>Phone:</strong> {user.phone}</div>
                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>BVN:</strong> {user.bvn}</div>
                <div><strong>Gender:</strong> {user.gender}</div>
                <div><strong>Marital Status:</strong> {user.maritalStatus}</div>
                <div><strong>Children:</strong> {user.children}</div>
                <div><strong>Residence:</strong> {user.residence}</div>
              </div>
            </div>
            <div className="section">
              <h3>Education & Employment</h3>
              <div className="info-grid">
                <div><strong>Education Level:</strong> {user.education.level}</div>
                <div><strong>Employment Status:</strong> {user.education.employmentStatus}</div>
                <div><strong>Sector:</strong> {user.education.sector}</div>
                <div><strong>Duration:</strong> {user.education.duration}</div>
                <div><strong>Office Email:</strong> {user.education.officeEmail}</div>
                <div><strong>Monthly Income:</strong> {user.education.monthlyIncome}</div>
                <div><strong>Loan Repayment:</strong> {user.education.loanRepayment}</div>
              </div>
            </div>
            <div className="section">
              <h3>Socials</h3>
              <div className="info-grid">
                <div><strong>Twitter:</strong> {user.socials.twitter}</div>
                <div><strong>Facebook:</strong> {user.socials.facebook}</div>
                <div><strong>Instagram:</strong> {user.socials.instagram}</div>
              </div>
            </div>
            <div className="section">
              <h3>Guarantor</h3>
              <div className="info-grid">
                <div><strong>Name:</strong> {user.guarantor.name}</div>
                <div><strong>Phone:</strong> {user.guarantor.phone}</div>
                <div><strong>Email:</strong> {user.guarantor.email}</div>
                <div><strong>Relationship:</strong> {user.guarantor.relationship}</div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'documents' && (
  <div className="section">
    <h3>User Documents</h3>
    {user.documents && user.documents.length > 0 ? (
      <ul>
        {user.documents.map((doc, index) => (
          <li key={index}>
            {doc.submitted ? '' : ''} {doc.name}
          </li>
        ))}
      </ul>
    ) : (
      <p>No documents available for this user.</p>
    )}
  </div>
)}


        {activeTab === 'bank' && (
          <div className="section">
            <h3>Bank Details</h3>
            <div className="info-grid">
              <div><strong>Full Name:</strong> {user.bank.fullName}</div>
              <div><strong>Phone:</strong> {user.bank.phone}</div>
              <div><strong>Account Number:</strong> {user.bank.accountNumber}</div>
              <div><strong>Bank Name:</strong> {user.bank.bankName}</div>
            </div>
          </div>
        )}

        {activeTab === 'loans' && (
          <div className="section">
            <h3>Loan History</h3>
            <ul>
              {user.loans.map((loan) => (
                <li key={loan.id}>{loan.amount} - {loan.status}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'savings' && (
          <div className="section">
            <h3>Total Savings</h3>
            <p>{user.savings}</p>
          </div>
        )}

        {activeTab === 'app' && (
          <div className="section">
            <h3>App & System</h3>
            <ul>
              {user.appSystem.map((item, i) => (
                <li key={i}>🔧 {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
