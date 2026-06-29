"use client";

import { useEffect, useState } from "react";
import StatBox from "@/components/.ui/StatBox";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    classes: 0,
    users: 0,
    liveSessions: 0,
    totalSessions: 0
  });

  useEffect(() => {
    // Fetch stats from the backend and update the state
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-overview">
      <h1>Overview</h1>
      <div className="stat-box-container">
        <StatBox title="classes" total={stats.classes} link="/admin/classes" />
        <StatBox title="students" total={stats.users} />
        <StatBox
          title="live sessions"
          total={stats.liveSessions}
          link="/admin/sessions"
          linkText="View All"
          otherStat={`${stats.totalSessions} total`}
        />
        <StatBox title="enrollments" />
      </div>
    </div>
  );
};

export default DashboardOverview;