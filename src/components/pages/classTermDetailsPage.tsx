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

  const classDetailsId = searchParams.get('id');
  const termId = pathname.split("/").filter(part => part)[2];

  useEffect(() => {
    if (isLoading && termId) fetchSingleTermById(termId, setTermData);
    if (isLoading && classDetailsId) fetchSingleClassDetailById(classDetailsId, setClassData);
  }, [classDetailsId, termId, isLoading]);

  return (
    <div className="admin-page-container">
      <Breadcrumbs links= {[
        { name: "Admin", href: "/admin" },
        { name: "Sessions", href: "/admin/sessions" },
        { name: termData ? `Session: ${termData.name}` : "Session", href: `/admin/session/${termId}` },
        { name: classData ? `Class: ${classData.class.name}` : "Class" },
      ]}/>
      <h1>{classData ? classData.class.name : "Class Term Details"}</h1>
      <div className="content-container">
              <div>
                <div className="action-btns-container">
                  <div>
                    {termData && termData?.status !== "ENDED" && (
                      <AddOrEditClassInSessionModal
                        termId={termId}
                        setStartAction={setIsLoading}
                        classChange={isLoading}
                        classData={classData as ClassDetailProps}
                        setClassData={setClassData}
                        isEdit={true}
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
          {classData?.classInstances.map((instance) => (
            <div key={instance.id}>
              {instance.dayOfTheWeek}: {instance.startTime} - {instance.endTime}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
