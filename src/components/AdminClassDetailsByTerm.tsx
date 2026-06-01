"use client";

import { useEffect, useState } from "react";
import { AddOrEditClassInSessionModal } from "@/components/modals/AddOrEditClassInSession";
import { fetchClassDetailsByTerm } from "@/lib/api/classDetails";
import { ClassDetailProps } from "@/lib/props";
import { Delete } from "@mui/icons-material";
import { Button } from "@/components/_ui/Button";

interface TermClassesProps {
  termId: string;
  termEnded: boolean;
}

export const AdminClassDetailsByTerm = ({ termId, termEnded }: TermClassesProps) => {
  const [classDetailsList, setClassDetailsList] = useState<ClassDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingClass, setAddingClass] = useState(false);

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
                          addingClass={addingClass}
                        />}
      </div>
      {classDetailsList.length === 0 ? (
        <p>No classes found for this session.</p>
      ) : (
        <ul className="admin-list condensed">
          {classDetailsList.map((detail) => (
            <li key={detail.id} className="list-item">
              <div>
                <a href={`/admin/session/${termId}/class?id=${detail.id}`}>
                  {detail.class.name}
                </a>
              </div>
              <div>
                {!termEnded && <Button className="w-icon small invert" onClick={() => {
                  if (confirm("Are you sure you want to delete this class from the session? This action cannot be undone.")) {
                    fetch(`/api/admin/classDetails?id=${detail.id}`, {
                      method: "DELETE"
                    })
                      .then(res => {
                        if (!res.ok) throw new Error("Failed to delete class detail.");
                        return res.json();
                      })
                      .then(() => {
                        setClassDetailsList(prev => prev.filter(cd => cd.id !== detail.id));
                      })
                      .catch(err => {
                        alert(`Error deleting class detail: ${err instanceof Error ? err.message : "An unexpected error occurred"}`);
                      });
                  }
                }}><Delete /></Button>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}