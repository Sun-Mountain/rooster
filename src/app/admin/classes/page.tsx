'use client';

import { useEffect, useState } from "react";
import { Class } from "@prisma/client";

import { ConfirmDeleteModal as ButtonDelete } from "@/components/Modals/ConfirmDelete";

import { AddEditClassModal } from "@/components/Modals/AddEditClass";

export default function ClassesPage() {
  const [allClasses, setAllClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchClasses() {
      setIsLoading(true);
      const response = await fetch("/api/admin/classes");
      const data = await response.json();
      console.log(data)
      setAllClasses(data.classes);
      setIsLoading(false);
    }

    fetchClasses();
  }, []);

  const handleNewClassSuccess = () => {
    async function fetchClasses() {
      setIsLoading(true);
      const response = await fetch("/api/admin/classes");
      const data = await response.json();
      setAllClasses(data.classes);
      setIsLoading(false);
    }
    fetchClasses();
  };

  const handleDeleteClassSuccess = () => {
    async function fetchClasses() {
      setIsLoading(true);
      const response = await fetch("/api/admin/classes");
      const data = await response.json();
      setAllClasses(data.classes);
      setIsLoading(false);
    }
    fetchClasses();
  };

  return (
    <>
      <h2>Classes</h2>

      {isLoading ? (
        <p>Loading classes...</p>
      ) : allClasses.length > 0 ? (
        <>
          <section>
            <AddEditClassModal onSuccess={handleNewClassSuccess} />
          </section>
          <section>
            {allClasses.map((classItem) => (
              <div key={classItem.id} className="list-item-container">
                <h4>{classItem.title}</h4>

                <ButtonDelete
                  id={classItem.id} 
                  itemType="class"
                  handleSuccess={handleDeleteClassSuccess} />
              </div>
            ))}
          </section>
        </>
      ) : (
        <>
          <p>No classes found.</p>
          <p>Create your first class.</p>
          <AddEditClassModal onSuccess={handleNewClassSuccess} />
        </>
      )}
    </>
  );
}
