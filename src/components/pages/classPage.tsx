"use client";

import { useEffect, useState } from "react";
import { ClassProps } from "@/lib/props";
import { fetchClasses } from "@/lib/api/class";
import { ClassForm } from "@/components/forms/ClassForm";
import AdminClassList from "@/components/AdminClassList";

export default function AdminClassContent() {
  const [classList, setClassList] = useState<ClassProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    console.log("Fetching classes...")
    if (isLoading) fetchClasses(setError, setIsLoading, setClassList)
  }, [isLoading])

  return (
    <div className="admin-page-container">
      <h1>Class Management</h1>
      <div className="content-container">
        <ClassForm
          setIsLoading={setIsLoading}
        />
        {error ? (
          <>
            {error}
          </>
        ) : classList.length === 0 ? (
          <>
            {isLoading ? "Loading..." : "No classes found."}
          </>
        ) : (
          <>
            <AdminClassList classList={classList} />
          </>
        )}
      </div>
    </div>
  )
}