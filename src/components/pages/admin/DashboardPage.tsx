import DashboardOverview from "@/components/content/AdminOverview";
import SessionListSummary from "@/components/content/SessionListSummary";

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard-page">
      <DashboardOverview />
      <div className="dashboard-main-content">
        <SessionListSummary />
      </div>
    </div>
  );
};

export default AdminDashboardPage;