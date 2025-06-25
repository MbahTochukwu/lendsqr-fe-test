import './DashboardCard.scss';

interface DashboardCardProps {
  icon: string;
  title: string;
  value: string;
}

export default function DashboardCard({ icon, title, value }: DashboardCardProps) {
  return (
    <div className="dashboard-card">
      <img src={icon} alt={title} />
      <p className="title">{title}</p>
      <h3 className="value">{value}</h3>
    </div>
  );
}