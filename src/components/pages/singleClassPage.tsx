"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/_ui/Breadcrumbs";
import { fetchSingleClassById } from "@/lib/api/class";
import { ClassProps } from "@/lib/props";
import { DeleteItemModal } from "@/components/modals/DeleteItem";

export default function SingleClassPage() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(part => part);
  const classId = pathParts[pathParts.length - 1];
  const [classData, setClassData] = useState<ClassProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading && classId) fetchSingleClassById(classId, setClassData, setIsLoading);
  }, [isLoading, classId])

  console.log("Class Data:", classData);

  const pageTitle = classData ? classData.name : "Single Class Page";

  return (
    <div className="admin-page-container">
      <Breadcrumbs currentPageTitle={`Class: ${pageTitle}`} />
      <h1>{pageTitle}</h1>
      <div className ="content-container two-column">
        <div>
          <div className="action-btns-container">
            <div>
              {/* {termData && termData?.status !== "ENDED" && (
                <EditSessionModal
                  formData={{ ...termData, description: termData.description ?? undefined }}
                  termId={termId}
                  setTermData={setTermData}
                />
              )} */}
            </div>
            <DeleteItemModal
              itemId={classId}
              type="class"
              name={classData?.name}
              modalBtnSize="small"
            />
          </div>
        </div>
        <div>
          {isLoading ? (
            "Loading..."
          ) : classData ? (
            <div>
              <p><strong>Description:</strong> {classData.description || "No description provided."}</p>
            </div>
          ) : (
            "Class not found."
          )}
        </div>
      </div>
    </div>
  )
}