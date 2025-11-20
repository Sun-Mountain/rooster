'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Add as AddIcon, EditSquare as EditIcon } from "@mui/icons-material";
import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";
import { Checkbox } from "@/components/_ui/Checkbox";
import { DatePicker } from "@/components/_ui/DatePicker";
import { TextField } from "@/components/_ui/TextField";
import * as z from 'zod';

export const ClassForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isWorkshop, setIsWorkshop] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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
            defaultChecked={isWorkshop}
            onChange={(e) => setIsWorkshop(e.target.checked)}
          />
          {isWorkshop ? (
            <>
              <DatePicker label="Workshop Date" name="workshopDate" />
            </>
          ) : (
            <>
              Session
            </>
          )}
          <div className="two-thirds-group reverse">
            <Button
              ariaLabel={"Create Class"}
              type="submit"
              // disabled={isLoading}
            >
              Class
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
        </div>
      </Modal>
    </>
  );
}