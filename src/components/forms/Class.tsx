'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Add as AddIcon, EditSquare as EditIcon, RemoveCircle } from "@mui/icons-material";
import { Weekday } from "@prisma/client";
import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";
import { Checkbox } from "@/components/_ui/Checkbox";
import { DatePicker } from "@/components/_ui/DatePicker";
import { TextField } from "@/components/_ui/TextField";
import { SessionSelect } from "@/components/content/SessionSelect";
import { TimePicker as TimePickerUI } from '@mui/x-date-pickers/TimePicker';
import LocalizationProvider from "@/components/providers/Localizer";
import dayjs from 'dayjs';
import { classBuilder } from "@/helpers/builder";

import {
  MenuItem,
  Select as SelectUI,
} from "@mui/material";

import * as z from 'zod';

interface ClassFormData {
  title: string;
  description?: string;
  workshop: boolean;
  date?: string;
  startTime: string;
  endTime: string;
  sessions: string[];
  daysTimes?: {
    weekday: Weekday;
    startTime: string;
    endTime: string;
  }[];
}

const ClassSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  workshop: z.boolean(),
  date: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  sessions: z.array(z.string()),
  daysTimes: z.array(z.object({
    weekday: z.enum(Object.values(Weekday) as [Weekday, ...Weekday[]]),
    startTime: z.string(),
    endTime: z.string(),
  })).optional(),
}).refine((data) => {
  if (data.workshop) {
    return data.startTime && data.startTime.length > 0;
  }
  return true;
}, {
  message: "Start time is required for workshops",
  path: ["startTime"],
}).refine((data) => {
  if (data.workshop) {
    return data.endTime && data.endTime.length > 0;
  }
  return true;
}, {
  message: "End time is required for workshops",
  path: ["endTime"],
}).refine((data) => {
  if (!data.workshop) {
    return data.sessions.length > 0;
  }
  return true;
}, {
  message: "At least one session must be selected for non-workshops",
  path: ["sessions"],
});

export const ClassForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [daysTimes, setDaysTimes] = useState<{ weekday: Weekday | ''; startTime: string; endTime: string }[]>([{ weekday: '', startTime: '', endTime: '' }]);
  const [isWorkshop, setIsWorkshop] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const newClass = classBuilder(data as { [key: string]: string }, daysTimes.length);
      console.log(newClass);
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const addDayTime = () => {
    setDaysTimes([...daysTimes, { weekday: '', startTime: '', endTime: '' }]);
  }

  const removeDayTime = (index: number, setDaysTimes: Dispatch<SetStateAction<{ weekday: Weekday | ''; startTime: string; endTime: string }[]>>) => {
    setDaysTimes((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <>
      <Modal
        buttonContent={<>
          <AddIcon /> Class
        </>}
        buttonClassName={"with-icon"}
        modalOpen={modalOpen}
        onOpen={handleModalOpen}
        onClose={handleModalClose}
      >
        <h2>Create Class</h2>
        <div className="form-container full-page in-modal">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Class Title"
              name="title"
            />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
            />
            <Checkbox
              label="Workshop"
              name="workshop"
              defaultChecked={isWorkshop}
              onChange={() => setIsWorkshop(!isWorkshop)}
            />
            {isWorkshop ? (
              <>
                <DatePicker
                  label="Date"
                  name="date"
                />
                <div className='flex-fields-container text-field-container'>
                  <LocalizationProvider>
                    <TimePickerUI
                      label="Start Time"
                      name="startTime"
                    />
                    <TimePickerUI
                      label="End Time"
                      name="endTime"
                    />
                  </LocalizationProvider>
                </div>
              </>
            ) : (
              <>
                <SessionSelect />
                <div className="days-times-section text-field-container">
                  {daysTimes.map((dayTime, index) => (
                    <div key={index} className={`day-time-row flex-fields-container` + (index > 0 ? ' divider-top' : '')}>
                      {/* TODO: Change this to use the DropDownSelect TimePicker components */}
                      <div>
                        {index === 0 && <label>Days & Times</label>}
                        <div className="">
                          <SelectUI
                            fullWidth
                            name={`weekday-${index}`}
                            value={dayTime.weekday}
                            label="Weekday"
                            onChange={(e) => {
                              const newDaysTimes = [...daysTimes];
                              newDaysTimes[index].weekday = e.target.value as Weekday;
                              setDaysTimes(newDaysTimes);
                            }}
                          >
                            {Object.values(Weekday).map((day) => (
                              <MenuItem key={day} value={day}>
                                {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
                              </MenuItem>
                            ))}
                          </SelectUI>
                        </div>

                        <div className='flex-fields-container text-field-container'>
                          <LocalizationProvider>
                            <TimePickerUI
                              label="Start Time"
                              name={`startTime-${index}`}
                              value={dayTime.startTime ? dayjs(dayTime.startTime) : null}
                              onChange={(time) => {
                                const newDaysTimes = [...daysTimes];
                                newDaysTimes[index].startTime = time ? time.toISOString() : '';
                                setDaysTimes(newDaysTimes);
                              }}
                            />
                            <TimePickerUI
                              label="End Time"
                              name={`endTime-${index}`}
                              value={dayTime.endTime ? dayjs(dayTime.endTime) : null}
                              onChange={(time) => {
                                const newDaysTimes = [...daysTimes];
                                newDaysTimes[index].endTime = time ? time.toISOString() : '';
                                setDaysTimes(newDaysTimes);
                              }}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      {daysTimes.length > 1 && (
                        <Button
                          className="icon transparent danger rounded"
                          onClick={() => removeDayTime(index, setDaysTimes)}
                        >
                          <RemoveCircle />
                        </Button>
                      )}
                    </div>
                  ))}
                  <div className="btn-container">
                    <Button
                      className="with-icon rounded"
                      onClick={addDayTime}
                    >
                      <AddIcon /> Add Day & Time
                    </Button>
                  </div>
                </div>
              </>
            )}
            <div className="two-thirds-group reverse">
              <Button ariaLabel={"Create Class"} type="submit">{'Create'} Class</Button>
              <Button ariaLabel="Cancel Changes" className="text-style-btn danger" type="button" onClick={handleModalClose}>Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}