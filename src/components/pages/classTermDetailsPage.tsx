"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ClassDetailProps, TermProps } from "@/lib/props";
import { Breadcrumbs } from "@/components/_ui/Breadcrumbs";
import { fetchSingleTermById } from "@/lib/api/term";
import { fetchSingleClassDetailById } from "@/lib/api/classDetails";
import { DeleteItemModal } from "@/components/modals/DeleteItem";
import { AddOrEditClassInSessionModal } from "@/components/modals/AddOrEditClassInSession";

export default function AdminClassTermDetails() {
  const searchParams = useSearchParams()
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [termData, setTermData] = useState<TermProps | null>(null);
  const [classData, setClassData] = useState<ClassDetailProps | null>(null);
  // console.log("classData", classData)

  const classDetailsId = searchParams.get('id');
  const termId = pathname.split("/").filter(part => part)[2];

  useEffect(() => {
    if (isLoading && termId) fetchSingleTermById(termId, setTermData);
    if (isLoading && classDetailsId) fetchSingleClassDetailById(classDetailsId, setClassData);
  }, [classDetailsId, termId, isLoading]);

  return (
    <div className="admin-page-container">
      {/* TODO: Fix Breadcrumbs component */}
      <Breadcrumbs />
      <h1>{classData ? classData.class.name : "Class Term Details"}</h1>
      <div className="content-container">
              <div>
                <div className="action-btns-container">
                  <div>
                    {termData && termData?.status !== "ENDED" && (
                      <AddOrEditClassInSessionModal
                        termId={termId}
                        setStartAction={setIsLoading}
                        addingClass={isLoading}
                        classData={classData as ClassDetailProps}
                        isEdit={true}
                        // termId={termId}
                        // setTermData={setTermData as React.Dispatch<React.SetStateAction<TermProps>>}
                      />
                    )}
                  </div>
                  <DeleteItemModal
                    itemId={classData?.id || ""}
                    type="classDetails"
                    name={`${classData?.class.name} from ${termData?.name}` || "this class from this session"}
                    modalBtnSize="small"
                  />
                </div>
              </div>
        <div>
          {classData?.termSpecificDescription || "No term-specific description available."}<br /><br />
        </div>
        <div>
          Capacity: {classData?.capacity}<br /><br />
          Price: ${classData?.price}<br /><br />
        </div>
      </div>
    </div>
  )
}
