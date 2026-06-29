"use client";

import { useEffect, useState } from "react";
import { ClassProps } from "@/lib/props";
import { fetchClasses } from "@/lib/api/class";
import { Add, ImportExport } from "@mui/icons-material";
import Button from "@/components/.ui/Button";

const AdminClassesMainPage = () => {
  const [classList, setClassList] = useState<ClassProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) fetchClasses(setError, setIsLoading, setClassList);
  }, [isLoading]);

  return (
    <div className="admin-dash-page-container">
      <div className="admin-page-header">
        <h1>Classes</h1>
      </div>
      <div className="admin-page-subheader">
        <div>
          {classList.length} classes
        </div>
        <div>
          <Button className="w-icon">
            <Add /> New Class
          </Button>
        </div>
      </div>
      <div className="admin-page-content">
        <div className="table-container">
          <div className="table-header table-row">
            <div className="table-cell">
              Class <ImportExport />
            </div>
          </div>
          {classList.map((classItem) => (
            <div key={classItem.id} className="table-row">
              <div className="table-cell">
                {classItem.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminClassesMainPage;