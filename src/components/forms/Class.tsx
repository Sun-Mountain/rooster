'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Add as AddIcon, EditSquare as EditIcon, RemoveCircle } from "@mui/icons-material";
import { Weekday } from "@prisma/client";
import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";
import { Checkbox } from "@/components/_ui/Checkbox";
import { DatePicker } from "@/components/_ui/DatePicker";
import { DropDownSelect } from "../_ui/DropDownSelect";
import { TextField } from "@/components/_ui/TextField";
import { TimePicker } from "@/components/_ui/TimePicker";
import { SessionSelect } from "@/components/content/SessionSelect";
import { classBuilder } from "@/helpers/builder";
import * as z from 'zod';

export const ClassForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isWorkshop, setIsWorkshop] = useState<"on" | "off">("off");

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const classData = classBuilder(formData)

    console.log(classData)
  };

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
              label="Class Name"
              name="title"
            />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={2}
            />
            <Checkbox
              name="workshop"
              label="Workshop"
              defaultChecked={isWorkshop === "on"}
              onChange={(e) => setIsWorkshop(e.target.checked ? "on" : "off")}
            />
            {isWorkshop === "on" ? (
              <>
                <DatePicker label="Workshop Date" name="workshopDate" />
                <div className="flex-fields-container">
                  <TimePicker
                    label="Start Time"
                    name="startTime"
                  />
                  <TimePicker
                    label="End Time"
                    name="endTime"
                  />
                </div>
              </>
            ) : (
              <>
                <SessionSelect />
                <div className="day-time-group">
                  <div>
                    <DropDownSelect
                      label="Week Day"
                      name="weekday"
                      options={Object.values(Weekday)}
                    />
                    <div className="flex-fields-container">
                      <TimePicker
                        label="Start Time"
                        name="startTime"
                      />
                      <TimePicker
                        label="End Time"
                        name="endTime"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="two-thirds-group reverse">
              <Button
                ariaLabel={"Create Class"}
                type="submit"
                // disabled={isLoading}
              >
                Create Class
              </Button>
              <Button
                ariaLabel="Cancel Changes"
                className="text-style-btn danger"
                type="button"
                onClick={handleModalClose}
                // disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}