"use client";

import Link from "next/link";
import {
  CalendarToday,
  ShowChart,
  PeopleAltOutlined,
  ImportContacts,
  ChevronRight
} from '@mui/icons-material';

interface StatBoxProps {
  title: string;
  total?: number;
  link?: string;
  linkText?: string;
  otherStat?: string;
}

const StatBox = ({
  title,
  total,
  link,
  linkText,
  otherStat
}: StatBoxProps) => {
  const boxTitle = () => {
    switch (title) {
      case "classes":
        return "Total Classes";
      case "students":
        return "Active Students";
      case "live sessions":
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
      case "live sessions":
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
      <div className="stat-content">
        <div>
          <div className="stat-value">{total ?? 0}</div>
          {otherStat && <div className="stat-other">{otherStat}</div>}
        </div>
        {link && (
          <div className="stat-link">
            <Link href={link}><div>{linkText ?? "Manage"}</div> <ChevronRight /></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatBox;