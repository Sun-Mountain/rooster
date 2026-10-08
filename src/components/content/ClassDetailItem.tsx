"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ClassDetailProps}  from "@/lib/props";
import { BorderColor } from "@mui/icons-material";
import SessionClassForm from "../forms/sessionClass";
import DeleteItemModal from "@/components/modals/DeleteItem";
import Button from "@/components/.ui/Button";

interface ClassDetailItemProps {
  classDetail: ClassDetailProps;
  sessionId: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  sessionName?: string;
  adminView?: boolean;
}

const ClassDetailItem = ({
  classDetail,
  sessionId,
  setIsLoading,
  sessionName,
  adminView = false
}: ClassDetailItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    classId: classDetail.classId,
    className: classDetail.class.name,
    price: classDetail.price,
    capacity: classDetail.capacity,
    termSpecificDescription: classDetail.termSpecificDescription || "",
    classInstances: classDetail.classInstances.map(instance => ({
      daysOfTheWeek: instance.daysOfTheWeek,
      startTime: instance.startTime,
      endTime: instance.endTime
    })),
    termId: sessionId
  });

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/admin/classDetails?id=${classDetail.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || ("Failed to update class in session"));
      }
      setIsLoading(true);
      setIsEditing(false);
    } catch (err) {
      console.log("Error updating class in session:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`admin-session-class-detail${isEditing ? " editing" : ""}`}>
      {!isEditing ? (
        <>
          <div className="class-detail-info">
            <div>
              <h3>{formData.className}</h3>
            </div>
            <div>
              {formData.classInstances.map((instance, idx) => (
                <div key={idx}>
                  {instance.daysOfTheWeek.join(", ")}: {instance.startTime} - {instance.endTime}
                </div>
              ))}
            </div>
          </div>
          {adminView && (
            <div className="reveal">
              <div className="action-buttons">
                <Button className="icon x-small transparent no-border" onClick={() => setIsEditing(!isEditing)}>
                  <BorderColor />
                </Button>
                <DeleteItemModal
                  itemId={formData.classId}
                  name={`${formData.className} from ${sessionName || "this session"}`}
                  type="classDetails"
                  setIsLoading={setIsLoading}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <SessionClassForm
            sessionId={sessionId}
            submitting={submitting}
            setFormData={setFormData}
            formData={formData}
          />
          <div className="form-actions">
            <Button className="w-icon" onClick={onSubmit} disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
            <Button className="transparent" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassDetailItem;