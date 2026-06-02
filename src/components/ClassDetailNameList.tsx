"use client";

import { Dispatch, SetStateAction } from "react";
import { ClassDetailProps } from "@/lib/props";
import { Button } from "@/components/_ui/Button";
import { Delete } from "@mui/icons-material";

interface ClassDetailNameListProps {
  classDetailsList: ClassDetailProps[];
  termId: string;
  termEnded: boolean;
  setClassDetailsList: Dispatch<SetStateAction<ClassDetailProps[]>>;
}

export const ClassDetailNameList = ({
  classDetailsList,
  termId,
  termEnded,
  setClassDetailsList }: ClassDetailNameListProps) => {
  return (
      <ul className="admin-list condensed">
        {classDetailsList.map((detail) => (
          <li key={detail.id} className="list-item">
            <div className="link-container">
              <a href={`/admin/session/${termId}/class?id=${detail.id}`}>
                {detail.class.name}
              </a>
            </div>
            <div className="class-instances">
              {detail.classInstances.map((instance, index) => (
                <div key={index}>
                  {instance.dayOfTheWeek}s: {instance.startTime} - {instance.endTime}
                </div>
              ))}
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
  );
}