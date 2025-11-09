'use client';

import { useEffect, useState } from "react";
import { Session } from "@prisma/client";
import { Button } from "../UI/Button";
import { TextField } from "../UI/TextField";
import { SelectField } from "../UI/SelectField";
import { DayTimesFields } from "./Fields/DayTimes";
import { buildClassData } from "@/helpers/buildClass";
import { Close as CloseIcon } from "@mui/icons-material";

import { ClassProps, DayTimesProps } from "@/lib/interfaces/class";

interface ClassFormProps {
  onSuccess?: () => void;
  editClassId?: string;
  classData?: ClassProps;
}

export const ClassForm = ({ onSuccess, editClassId, classData }: ClassFormProps) => {
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [classNumber, setClassNumber] = useState<DayTimesProps[]>(classData?.sessionDetails?.classDayTimes || [{
    id: '',
    classId: '',
    sessionId: '',
    weekday: '',
    startTime: '',
    endTime: '',
  }]);

  useEffect(() => {
    async function fetchSessions() {
      setIsLoading(true);
      const response = await fetch("/api/admin/sessions");
      const data = await response.json();
      setAllSessions(data.sessions);
      setIsLoading(false);
    }

    fetchSessions();
  }, []);

  const onSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const classData = buildClassData(values, classNumber.length);

    const response = await fetch('/api/admin/class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });

    if (response.ok) {
      if (onSuccess) {
        onSuccess();
      }
    } else {
      console.log("Failed to create class.");
    }
  };

  const handleDelete = (index: number) => {
    const updatedClassNumber = [...classNumber];
    updatedClassNumber.splice(index, 1);
    setClassNumber(updatedClassNumber);
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <TextField label="Class Title" name="title" initialValue={classData?.title || ""} disabled={isLoading} />
        <TextField label="Class Description" name="description" initialValue={classData?.sessionDetails?.description || ""} />
        <TextField label="Class Capacity" name="capacity" initialValue={classData?.sessionDetails?.capacity?.toString() || ""} />
        <TextField label="Price" name="price" initialValue={classData?.sessionDetails?.price?.toString() || ""} />
        <div className="text-field-container">
          <SelectField
            label="Session"
            name="session"
            initialValue={classData?.sessionDetails?.sessionId || ''}
            options={allSessions.map(session => ({
              value: session.id,
              label: `${session.title}: ${new Date(session.startDate).toLocaleDateString()} - ${new Date(session.endDate).toLocaleDateString()}`
            }))}
          />
        </div>
        {classNumber.map((item, index) => (
          <div key={index}>
            <div className="divider-top" />
            <div className="form-list-item">
              <div className="fields-container">
                <DayTimesFields key={index} index={index} details={item} />
              </div>
              {classNumber.length > 1 && (
                <div className="delete-button-container">
                  <Button className="icon transparent" onClick={() => handleDelete(index)}>
                    <CloseIcon />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="extra-form-button">
          <Button type="button" onClick={() => setClassNumber([...classNumber, {
            id: '',
            classId: '',
            weekday: '',
            sessionId: '',
            startTime: '',
            endTime: '',
          }])}>Add Day/Time</Button>
        </div>
        <Button type="submit">{editClassId ? "Update" : "Create"} Class</Button>
      </form>
    </div>
  );
}