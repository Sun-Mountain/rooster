"use client";

import { useEffect, useState } from "react";
import { AddOrEditClassInSessionModal } from "@/components/modals/AddOrEditClassInSession";
import { fetchClassDetailsByTerm } from "@/lib/api/classDetails";
import { ClassDetailProps } from "@/lib/props";
import { Button } from "@/components/_ui/Button";
import { ClassDetailNameList } from "@/components/ClassDetailNameList";
import { ClassDetailSchedule } from "@/components/ClassDetailSchedule";

interface TermClassesProps {
  termId: string;
  termEnded: boolean;
}

export const AdminClassDetailsByTerm = ({ termId, termEnded }: TermClassesProps) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [classDetailsList, setClassDetailsList] = useState<ClassDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingClass, setAddingClass] = useState(false);

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
  }, [termId, addingClass]);

  if (isLoading) {
    return <p>Loading class details...</p>;
  }

  if (error) {
    return <p>Error loading class details: {error}</p>;
  }

  return (
    <>
      <div className="admin-list-header">
        <h2>Session Classes</h2>
        {!termEnded && <AddOrEditClassInSessionModal
                          termId={termId}
                          setStartAction={setAddingClass}
                          classChange={addingClass}
                        />}
      </div>
      <div>
        {classDetailsList.length > 0 && (
          <div>
            There are {consolidatedSchedule.length} {consolidatedSchedule.length === 1 ? "class" : "classes"} in this session.
          </div>
        )}
      </div>
      <div className="action-btns-container">
        <Button
          className="small invert"
          onClick={() => setShowSchedule(prev => !prev)}
        >
          {!showSchedule ? "Show Class Schedule" : "Order by Class Name"}
        </Button>
      </div>
      {classDetailsList.length === 0 ? (
        <p>No classes found for this session.</p>
      ) : (
        <>
          {!showSchedule ? (
            <ClassDetailNameList
              classDetailsList={classDetailsList}
              termId={termId}
              termEnded={termEnded}
              setClassDetailsList={setClassDetailsList}
            />
          ) : (
            <>
              <ClassDetailSchedule classSchedule={consolidatedSchedule} />
            </>
          )}
        </>
      )}
    </>
  )
}