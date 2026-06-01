"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AttachMoney, Edit } from "@mui/icons-material";
import { ClassDetailProps } from "@/lib/props";
import { Button } from "@/components/_ui/Button";
import { Modal } from "@/components/_ui/Modal";
import { TextField } from "@/components/_ui/TextField";
import { Autocomplete } from "@/components/_ui/Autocomplete";

interface AddClassToSessionModalProps {
  termId: string;
  setStartAction: Dispatch<SetStateAction<boolean>>;
  classChange: boolean;
  isEdit?: boolean;
  classData?: ClassDetailProps;
  setClassData?: Dispatch<SetStateAction<ClassDetailProps | null>>;
}

export const AddOrEditClassInSessionModal = ({
  termId,
  setStartAction,
  classChange,
  isEdit = false,
  classData,
  setClassData
}: AddClassToSessionModalProps) => {
  const [classOptions, setClassOptions] = useState<{ id: string; name: string }[]>([]);
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    classId: "",
    className: "",
    price: 0,
    capacity: 0,
    termSpecificDescription: "",
    classInstances: [{
      dayOfTheWeek: "",
      startTime: "",
      endTime: "",
    }],
    termId
  })

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false);
      setStartAction(!classChange);
    }, 500);
  }

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await fetch("/api/admin/classNames");
        const data = await response.json();
        setClassOptions(data);
      } catch (error) {
        setErrors(`Failed to fetch class options: ${error instanceof Error ? error.message : "An unexpected error occurred"}`);
      }
    };

    fetchClassOptions();
  }, []);

  useEffect(() => {
    if (isEdit) {
      const fillFormDataFromClassData = (classData: ClassDetailProps) => {
        const { classId, price, capacity, termSpecificDescription, classInstances } = classData;
        const newFormData = {
          classId,
          className: classData.class.name,
          price,
          capacity,
          termSpecificDescription: termSpecificDescription || "",
          classInstances: classInstances.map(instance => ({
            dayOfTheWeek: instance.dayOfTheWeek,
            startTime: instance.startTime,
            endTime: instance.endTime,
          })),
          termId
        };
        setFormData(newFormData);
      };
      if (classData) {
        fillFormDataFromClassData(classData);
      }
    }
  }, [isEdit, classData, termId]);

  function daysOfTheWeek(): { id: string; name: string }[] {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => ({ id: day, name: day }));
  }

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const selectedClass = classOptions.find(option => option.id === value);
    setFormData(prev => prev ? { ...prev, [name]: value, className: selectedClass ? selectedClass.name : "" } : prev);
  };

  const handleRosterChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (!prev) return prev;
      const updatedRoster = [...prev.classInstances];
      updatedRoster[index] = { ...updatedRoster[index], [name]: value };
      return { ...prev, classInstances: updatedRoster };
    });
  };

  const fetchURL = !isEdit ? "/api/admin/classDetails" : `/api/admin/classDetails?id=${classData?.id}`;

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(fetchURL, {
        method: !isEdit ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || (!isEdit ? "Failed to add class to session" : "Failed to update class in session"));
      }
      setCloseOnAction(true);
      if (setClassData) {
        setClassData((prev: ClassDetailProps | null) => {
          const baseData = prev ?? classData;
          if (!baseData) return prev ?? null;

          return {
            ...baseData,
            classId: formData.classId,
            price: Number(formData.price),
            capacity: Number(formData.capacity),
            termSpecificDescription: formData.termSpecificDescription,
            classInstances: formData.classInstances.map((instance, idx) => ({
              ...baseData.classInstances[idx],
              dayOfTheWeek: instance.dayOfTheWeek,
              startTime: instance.startTime,
              endTime: instance.endTime,
            })),
            termId: formData.termId,
            class: {
              ...baseData.class,
              name: formData.className,
            },
          };
        });
      }
      resetCloseOnAction();
    } catch (err) {
      setErrors(`Failed to ${!isEdit ? "add" : "update"} class in session: ${err instanceof Error ? err.message : "An unexpected error occurred"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        modalBtnContent={!isEdit ? "Add Class" : (<><Edit /> Edit</>)}
        modalBtnClassName={!isEdit ? "primary medium" : "w-icon small"}
        btnAction={<Button onClick={onSubmit}>
          {submitting ? (!isEdit ? "Adding..." : "Updating...") : (!isEdit ? "Add Class" : "Update Class")}
          </Button>}
        includeCancel={true}
        closeOnAction={closeOnAction}
      >
        <div className="form-container no-border">
          <form>
            <Autocomplete
              options={classOptions}
              label="Select Class"
              name="classId"
              initialValue={formData.className}
              disabled={submitting}
              handleChange={handleClassChange}
            />
            <div className="flex-fields-container">
              <TextField
                label="Price"
                name="price"
                type="number"
                initialValue={formData.price}
                onChange={handleChange}
                disabled={submitting}
                slotAdornment={
                  <AttachMoney />
                }
              />
              <TextField
                label="Capacity"
                name="capacity"
                type="number"
                initialValue={formData.capacity}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
            {formData.classInstances.map((instance, index) => (
              <div key={index} className="roster-entry">
                <Autocomplete
                  options={daysOfTheWeek()}
                  label="Day of the Week"
                  name="dayOfTheWeek"
                  initialValue={instance.dayOfTheWeek}
                  disabled={submitting}
                  handleChange={(e) => handleRosterChange(index, e)}
                />
                <div className="flex-fields-container">
                  <TextField
                    label="Start Time"
                    name="startTime"
                    type="time"
                    InputLabelProps={{
                      shrink: true, // Forces the label to move to the top
                    }}
                    initialValue={instance.startTime}
                    onChange={(e) => handleRosterChange(index, e)}
                    disabled={submitting}
                  />
                  <TextField
                    label="End Time"
                    name="endTime"
                    type="time"
                    InputLabelProps={{
                      shrink: true, // Forces the label to move to the top
                    }}
                    initialValue={instance.endTime}
                    onChange={(e) => handleRosterChange(index, e)}
                    disabled={submitting}
                  />
                </div>
              </div>
            ))}
            <TextField
              label="Additional Notes"
              name="termSpecificDescription"
              type="text"
              multiline
              rows={4}
              onChange={handleChange}
              disabled={submitting}
            />
          </form>
        </div>
      </Modal>
    </>
  )
}