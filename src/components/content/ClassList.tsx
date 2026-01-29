'use client';

import { useEffect, useState } from "react";
import { Class } from "@client";

export const ClassList = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/classes"); 
        if (!response.ok) throw new Error("Failed to fetch classes");
        const data = await response.json();
        setClasses(data);
      } catch (err) {
        console.error(err);
        // setError(err instanceof Error ? err.message : "Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <div>Loading classes...</div>;
  }

  return (
    <div className="class-list">
      {classes.length === 0 ? (
        <p>No classes available.</p>
      ) : (
        <ul className="admin-list">
          {classes.map((cls: Class) => (
            <li className="list-item" key={cls.id}>
              <div>
                <a href={`/admin/classes/${cls.id}`}>
                  {cls.name}
                </a>
              </div>
              <div>
                {cls.description}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}