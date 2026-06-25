"use client";

import { useEffect, useState } from "react";
import { useWindowSize } from "@/helpers/useWindowSize";
import { Button } from "@/components/_ui/Button";
import { Apps, EventNote, TableRows } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import { fetchClassDetailsByTerm } from "@/lib/api/classDetails";
import { ClassDetailProps } from "@/lib/props";
import { ClassDetailSchedule } from "@/components/ClassDetailSchedule";
import { PublicClassNameList } from "@/components/PublicClassNameList";

interface ClassTabPanelContentProps {
  termId: string;
  startDate: string;
  endDate: string;
  currentSession: boolean;
}

export const ClassTabPanelContent = ({
  termId,
  startDate,
  endDate,
  currentSession
}: ClassTabPanelContentProps) => {
    const [viewMode, setViewMode] = useState<"grid" | "list" | "schedule">("schedule");
    const [classDetailsList, setClassDetailsList] = useState<ClassDetailProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { width } = useWindowSize();

  const consolidatedSchedule = classDetailsList.flatMap(detail =>
    detail.classInstances.map(instance => ({
      id: detail.id,
      className: detail.class.name,
      dayOfTheWeek: instance.dayOfTheWeek,
      startTime: instance.startTime,
      endTime: instance.endTime,
    }))
  );

    useEffect(() => {
      const fetchClassDetails = async () => {
        try {
          setIsLoading(true);
          await fetchClassDetailsByTerm(termId, setError, setIsLoading, setClassDetailsList);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load class details");
        } finally {
          setIsLoading(false);
        }
      };

      if (termId) fetchClassDetails();
    }, [termId]);

  return (
    <div className="tab-panel-content-container">
      <div className="panel-header">
        <div>
          {currentSession ? (
            <>
              This session is currently live and will end on {new Date(endDate).toLocaleDateString()}.
            </>
          ) : (
            <>
              This session starts on {new Date(startDate).toLocaleDateString()}.
            </>
          )}
        </div>
        <div className="toggle-btns-container">
          <Tooltip title="Grid View">
            <div>
              <Button className={`icon ${viewMode === "grid" ? "invert w-border" : "primary"}`} onClick={() => setViewMode("grid")}>
                <Apps />
              </Button>
            </div>
          </Tooltip>
          <Tooltip title="List View">
            <div>
              <Button className={`icon ${viewMode === "list" ? "invert w-border" : "primary"}`} onClick={() => setViewMode("list")}>
                <TableRows />
              </Button>
            </div>
          </Tooltip>
          <Tooltip title="Schedule View">
            <div>
              <Button className={`icon ${viewMode === "schedule" ? "invert w-border" : "primary"}`} onClick={() => setViewMode("schedule")}>
                <EventNote />
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="panel-content">
        {(viewMode === "list" || viewMode === "grid") && <PublicClassNameList
          classDetailsList={classDetailsList}
          gridView={viewMode === "grid" || (width !== undefined && width < 650)}
        />}
        {viewMode === "schedule" && <ClassDetailSchedule classSchedule={consolidatedSchedule} />}
      </div>
    </div>
  );
}