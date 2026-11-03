"use client";

import { useEffect, useState } from "react";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch students data from an API or database
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/admin/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="students-page">
      <h1>Students</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {students.map((student: any) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentsPage;