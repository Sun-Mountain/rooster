"use client";

import { Dispatch, SetStateAction, SubmitEvent, useState } from "react";
import Button from "@/components/.ui/Button";
import ModalComponent from "@/components/.ui/Modal";
import TextField from "@/components/.ui/TextField";
import PasswordForm from "@/components/forms/Password";

const ResetPasswordModal = ({ setIsLoading }: { setIsLoading: Dispatch<SetStateAction<boolean>> }) => {
  const [closeOnAction, setCloseOnAction] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  const submitBtn = (
    <Button className="primary" type="submit" handleSubmit={handleSubmit}>
      Reset Password
    </Button>
  );

  return (
    <ModalComponent
        ariaTitle="Reset Password"
        ariaDescription="Reset your account password"
        modalBtnContent="Reset Password"
        modalBtnClassName="w-icon reset-btn"
        modalHeader={<h2>Reset Password</h2>}
        btnAction={submitBtn}
        closeOnAction={closeOnAction}
      >
      <PasswordForm />
    </ModalComponent>
  );
};

export default ResetPasswordModal;