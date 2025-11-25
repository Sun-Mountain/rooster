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

export const ClassForm = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [daysTimes, setDaysTimes] = useState<{ weekday: Weekday | ''; startTime: string; endTime: string }[]>([{ weekday: '', startTime: '', endTime: '' }]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(data)
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
              name="isActive"
            />
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
          </form>
        </div>
      </Modal>
    </>
  );
}