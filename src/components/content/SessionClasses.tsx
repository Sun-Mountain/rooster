"use client";

import { useEffect, useState } from "react";
import { ClassDetailProps } from "@/lib/props";
import AddSessionClassModal from "@/components/modals/AddSessionClass";
import { fetchClassDetailsByTerm } from "@/lib/api/classDetails";
import { EventNote, SortByAlpha } from "@mui/icons-material";
import ClassDetailItem from "@/components/content/ClassDetailItem";
import Button from "@/components/.ui/Button";
import SessionClassScheduleView from "./SessionClassSchedule";
import { usePathname } from "next/navigation";

type SessionClassesProps = {
  sessionId: string;
  sessionName?: string;
  adminView?: boolean;
};

const SessionClasses = ({
  sessionId,
  sessionName,
}: SessionClassesProps) => {
  const [classes, setClasses] = useState<ClassDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewType, setViewType] = useState<"name" | "schedule">("name");
  const pathname = usePathname();

  const adminView = pathname.startsWith("/admin");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetchClassDetailsByTerm(sessionId, setError, setIsLoading, setClasses);

        if (!response) {
          throw new Error("Failed to fetch class details.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load class details");
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading && sessionId) fetchClasses();
  }, [sessionId, isLoading]);

  return (
    <>
        {adminView && (
          <div className="admin-session-classes-header">
            <div>
              <h2>Classes in this Session</h2>
            </div>
            <div>
              <AddSessionClassModal
                setIsLoading={setIsLoading}
                sessionId={sessionId}
                sessionName={sessionName}
              />
            </div>
          </div>
        )}
      <div className="view-buttons">
        <div>
          Sort By:
        </div>
        <Button className={viewType === "name" ? "active" : ""} onClick={() => setViewType("name")}>
          <SortByAlpha />
          <div>
            Name
          </div>
        </Button>
        <Button className={viewType === "schedule" ? "active" : ""} onClick={() => setViewType("schedule")}>
          <EventNote />
          <div>
            Schedule
          </div>
        </Button>
      </div>
      <div className="session-class-detail-list">
        {isLoading ? (
          <div>Loading classes...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : classes.length === 0 ? (
          <div>No classes found for this session.</div>
        ) : (
          <>
            {viewType === "name" && (
              <>
                {classes.map((classDetail, index) => (
                  <ClassDetailItem
                    key={index}
                    classDetail={classDetail}
                    sessionName={sessionName}
                    sessionId={sessionId}
                    setIsLoading={setIsLoading}
                    adminView={adminView}
                  />
                ))}
              </>
            )}
            {viewType === "schedule" && (
              <SessionClassScheduleView classDetails={classes} />
            )}
          </>
        )}
      </div>
    </>
  )
};

export default SessionClasses;