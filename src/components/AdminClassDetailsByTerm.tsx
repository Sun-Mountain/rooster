"use client";

import { useEffect, useState } from "react";
import { fetchClassDetailsByTerm } from "@/lib/api/classDetails";
import { ClassDetailProps } from "@/lib/props";

interface TermClassesProps {
  termId: string;
}

export const AdminClassDetailsByTerm = ({ termId }: TermClassesProps) => {
  const [classDetailsList, setClassDetailsList] = useState<ClassDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
    return <p>Loading class details...</p>;
  }

  if (error) {
    return <p>Error loading class details: {error}</p>;
  }

  return (
    <>
      <h2>Session Classes</h2>
      {classDetailsList.length === 0 ? (
        <p>No classes found for this session.</p>
      ) : (
        <>
          Yay, classes!
        </>
      )}
    </>
  )
}