"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "@/components/_ui/Modal";
import { updateTermStatusById } from "@/lib/api/term";
import { getStatusIcon } from "@/components/_ui/TermStatusIcon";
import { Button } from "@/components/_ui/Button";

interface StatusUpdateModalProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  termId: string;
  termStatus: "LIVE" | "DRAFT" | "ENDED" | undefined;
}

export const StatusUpdateModal = ({
  setIsLoading,
  termId,
  termStatus
}: StatusUpdateModalProps) => {
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [status, setStatus] = useState(termStatus);

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false);
    }, 1000);
  }

  if (!status || !termId) return null;

  if (status === "ENDED") {
    return (
      <div className="term-status ended">
        Session Ended
      </div>
    )
  }

  const btnContent = () => {
    if (status === "LIVE") {
      return (
        <>
          {getStatusIcon(status)} Session Live
        </>
      )
    }

    return (
      <>
        {getStatusIcon(status)} Draft
      </>
    )
  }

  const updateStatus = () => {
    setIsLoading(true);
    try {
      if (status === "LIVE") {
        updateTermStatusById(termId, "DRAFT");
        setStatus("DRAFT");
      } else {
        updateTermStatusById(termId, "LIVE");
        setStatus("LIVE");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCloseOnAction(true);
      setIsLoading(false);
      resetCloseOnAction();
    }
  }

  const changeStatus = () => {
    return (
      <Button onClick={updateStatus}>
        {status === "LIVE" ? "Change to Draft" : "Set Session Live"}
      </Button>
    )
  }

  return (
    <>
      <Modal
        btnAction={changeStatus()}
        className="modal-sm"
        closeOnAction={closeOnAction}
        includeCancel={true}
        modalBtnContent={btnContent()}
        modalBtnClassName={`w-icon small${status === "LIVE" ? " success" : ""}`}
      >
        <div className="modal-content">
          <h2>Change Session Status</h2>
          <p>Are you sure you want to change the session status to <strong>{status === "LIVE" ? "Draft" : "Live"}</strong>?</p>
          {status === "DRAFT" ? (
            <>
              <p>Changing the status to <strong>Live</strong> will make the session visible to students and allow them to register for classes.</p>
              {/* TODO: Send email to students for live classes. */}
              {/* <p>Students will receive an email notification that the session is now live.</p> */}
            </>
          ) : (
            <>
              <p>Changing the status to <strong>Draft</strong> will hide the session from students and prevent new registrations, but current students will still have access to their classes.</p>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}