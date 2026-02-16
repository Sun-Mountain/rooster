'use client';

import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { ClassProps } from "@/lib/props";
import { fetchSessionClasses } from "@/lib/api/class";

interface SessionClassListProps {
  sessionId: string;
  classIds: string[];
}

export const SessionClassList = ({ sessionId, classIds }: SessionClassListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState<ClassProps[]>([]);

  console.log(classes)

  useEffect(() => {
    if (classIds.length > 0) {
      fetchSessionClasses(sessionId, classIds)
      .then(async (res) => {
        if (res.length > 0) {
          const classData = await res;
          setClasses(classData);
        } else {
          console.log("No classes found for the given IDs.");
        }
        setIsLoading(false);
      }).catch((error) => {
        console.error("Error fetching session classes:", error);
        setIsLoading(false);
      });
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second fetch time
    return () => clearTimeout(timer);

  }, [sessionId, classIds]);

  return (
    <>
    {isLoading ? (
      <>
        {classIds.length > 0 ? (
          <>
            Fetching classes...
            {classIds.map((_, index) => {
              if (index >= 5) return null; // Limit to 5 skeletons for brevity
              return (
                <div key={index} className="skeleton-container">
                  <Skeleton variant="rounded" width={735} height={60}/>
                </div>
              )}
            )}
          </>
        ) : (
          <p>No classes are in this session.</p>
        )}
      </>
    ) : (
      <ul>
        {classes.map((cls) => (
          <li key={cls.classId}>
            {cls.name}

            <ul>
              {}
            </ul>
          </li>
        ))}
      </ul>
    )}
    </>
  );
}