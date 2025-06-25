import DashboardCard from '../components/DashboardCard';

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-cards">
        <DashboardCard 
          icon="/users-icon.svg" 
          title="Old Users" 
          value="2,453" 
        />
        <DashboardCard 
          icon="/loans-icon.svg" 
          title="Old Users with Loans" 
          value="480" 
        />
        <DashboardCard 
          icon="/savings-icon.svg" 
          title="Old Savings" 
          value="₦12,000,000" 
        />
      </div>
    </div>
  );
}
