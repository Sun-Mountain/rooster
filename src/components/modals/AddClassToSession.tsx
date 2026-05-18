"use client";

import { useState } from "react";
import { AttachMoney } from "@mui/icons-material";
import { Modal } from "@/components/_ui/Modal";
import { TextField } from "@/components/_ui/TextField";

export const AddClassToSessionModal = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    price: 0,
    capacity: 0,
  })

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  return (
    <>
      <Modal
        modalBtnContent="Add Class to Session"
        modalBtnClassName="primary"
        includeCancel={true}
      >
        <div className="form-container no-border">
          <form>
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
          </form>
        </div>
      </Modal>
    </>
  )
}