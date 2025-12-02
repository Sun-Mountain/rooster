'use client';

import { useEffect, useState } from "react";
import { Class, ClassDetails, ClassDayTime } from "@prisma/client";
import { ClassForm } from '../forms/Class';
import { DeleteModal } from "../content/DeleteModal";

interface ClassWithDetails extends Class {
  details: ClassDetails | null;
  dayTimes: ClassDayTime[];
}

export const ClassList = () => {
  const [classes, setClasses] = useState<ClassWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch classes from the API when the component mounts
    fetch('/api/admin/classes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setClasses(data.classes);
    })
    .catch(error => {
      console.error('Error fetching classes:', error);
    });
  }, [isLoading]);

  return (
    <div>
      <ClassForm />
      <div className="divider-top">
        <h2>Classes</h2>
        {classes && classes.length > 0 ? (
          <ul className="table">
            {classes.map((cls) => (
              <li key={cls.id} className="class-item">
                <div className="row-content">
                  <div>{cls.title}</div>
                  <div>{cls.details?.description}</div>
                </div>
                <div className="row-content actions">
                  <DeleteModal
                    item="class"
                    itemName={cls.title}
                    itemId={cls.id}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} />
                </div>
              </li>
            ))}
          </ul>
        ) : <p>No classes found.</p>}
      </div>
    </div>
  );
};