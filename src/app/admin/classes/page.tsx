'use client';

import { useEffect, useState } from "react";
import { Class } from "@prisma/client";

export default function ClassesPage() {
  const [allClasses, setAllClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchClasses() {
      setIsLoading(true);
      const response = await fetch("/api/admin/classes");
      const data = await response.json();
      setAllClasses(data.classes);
      setIsLoading(false);
    }

    fetchClasses();
  }, []);

  return (
    <>
      <h2>Manage Classes</h2>

      {isLoading ? (
        <p>Loading classes...</p>
      ) : allClasses.length > 0 ? (
        <>
          Yay!
        </>
      ) : (
        <p>No classes found.</p>
      )}
    </>
  );
}
