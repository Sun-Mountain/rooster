"use client";

import {
  CalendarToday,
  ShowChart,
  PeopleAltOutlined,
  ImportContacts
} from '@mui/icons-material';

interface StatBoxProps {
  title: string;
  total?: number;
}

const StatBox = ({ title, total }: StatBoxProps) => {
  const boxTitle = () => {
    switch (title) {
      case "classes":
        return "Total Classes";
      case "students":
        return "Active Students";
      case "sessions":
        return "Live Sessions";
      case "enrollments":
        return "Enrollments";
      default:
        return title;
    }
  }

  const boxIcon = () => {
    switch (title) {
      case "classes":
        return <ImportContacts />;
      case "students":
        return <PeopleAltOutlined />;
      case "sessions":
        return <CalendarToday />;
      case "enrollments":
        return <ShowChart />;
      default:
        return null;
    }
  }

  return (
    <div className="stat-box">
      <div className="stat-header">
        <div>
          <h4>{boxTitle()}</h4>
        </div>
        <div className="stat-icon">
          {boxIcon()}
        </div>
      </div>
      <div className="stat-value">{total ?? 0}</div>
    </div>
  );
};

export default StatBox;