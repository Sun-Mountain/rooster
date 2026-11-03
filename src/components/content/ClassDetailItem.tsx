"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ClassDetailProps}  from "@/lib/props";
import {
  BorderColor,
  ShoppingCartOutlined,
  ShoppingCartCheckout
} from "@mui/icons-material";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl } from '@mui/material';
import SessionClassForm from "../forms/sessionClass";
import DeleteItemModal from "@/components/modals/DeleteItem";
import Button from "@/components/.ui/Button";

import { useCartStore } from "@/providers/cart-provider";

interface ClassDetailItemProps {
  classDetail: ClassDetailProps;
  sessionId: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  sessionName?: string;
  adminView?: boolean;
}

interface FormDataProps {
  classId: string;
  className: string;
  price: number;
  capacity: number;
  termSpecificDescription: string;
  classInstances: {
    instanceId: string;
    daysOfTheWeek: string[];
    startTime: string;
    endTime: string;
  }[];
  termId: string;
  instanceSelected?: string;
}

const ClassDetailItem = ({
  classDetail,
  sessionId,
  setIsLoading,
  sessionName,
  adminView = false
}: ClassDetailItemProps) => {
  const { addToCart, items } = useCartStore((state) => state);

  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataProps>({
    classId: classDetail.classId,
    className: classDetail.class.name,
    price: classDetail.price,
    capacity: classDetail.capacity,
    termSpecificDescription: classDetail.termSpecificDescription || "",
    classInstances: classDetail.classInstances.map(instance => ({
      instanceId: instance.id,
      daysOfTheWeek: instance.daysOfTheWeek,
      startTime: instance.startTime,
      endTime: instance.endTime
    })),
    termId: sessionId,
    instanceSelected: ""
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

  const handleAddToCart = () => {
    addToCart({
      lineItemId: classDetail.classInstances[0].id,
      lineItem: classDetail.class.name,
      price: classDetail.price,
      quantity: 1
    });
  };

  const handleInstanceChange = (instanceId: string) => {
    setFormData({ ...formData, instanceSelected: instanceId });
  }

  return (
    <div className={`session-class-detail${isEditing ? " editing" : ""}`}>
      {!isEditing ? (
        <>
          <div className="class-detail-info">
            <div>
              <h3>{formData.className}</h3>
            </div>
            <div>
              {formData.classInstances.map((instance, idx) => (
                <div key={idx}>
                  {formData.classInstances.length > 1 && (
                    <div key={`label-${idx}`}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="class-instances"
                          name="class-instances"
                          value={formData.instanceSelected}
                          onChange={() => handleInstanceChange(formData.classInstances[idx].instanceId)}
                        >
                          <FormControlLabel
                            value={instance.instanceId}
                            control={<Radio />}
                            label={`${instance.daysOfTheWeek.join(", ")}: ${instance.startTime} - ${instance.endTime}`}
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                  {formData.classInstances.length === 1 && (
                    <div key={idx}>
                      <div>
                        {instance.daysOfTheWeek.join(", ")}: {instance.startTime} - {instance.endTime}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
            <div className="reveal">
              <div className="action-buttons">
                {adminView ? (
                  <>
                      <Button className="icon x-small transparent no-border" onClick={() => setIsEditing(!isEditing)}>
                        <BorderColor />
                      </Button>
                      <DeleteItemModal
                        itemId={formData.classId || ""}
                        name={`${formData.className} from ${sessionName || "this session"}`}
                        type="classDetails"
                        setIsLoading={setIsLoading}
                      />
                  </>
                ) : (!adminView && (  
                  <>
                    {items.some(item => item.lineItemId === classDetail.classInstances[0].id) ? (
                      <div className="cart-actions">
                        <Button className="w-icon small" disabled>
                          <ShoppingCartCheckout /> In Cart
                        </Button>
                      </div>
                    ) : (
                      <>
                        {formData.classInstances.length > 1 && formData.instanceSelected === "" ? (
                          <Button className="w-icon small">
                            <ShoppingCartOutlined /> Pick a Time
                          </Button>
                        ) : (
                          <Button className="w-icon small" onClick={handleAddToCart}>
                            <ShoppingCartOutlined /> Add to Cart
                          </Button>
                        )}
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>
        </>
      ) : (!!adminView && (
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
      ))}
    </div>
  );
};

export default ClassDetailItem;