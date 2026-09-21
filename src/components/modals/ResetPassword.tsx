"use client";

import { Dispatch, SetStateAction, SubmitEvent, useState } from "react";
import Button from "@/components/.ui/Button";
import ModalComponent from "@/components/.ui/Modal";
import TextField from "@/components/.ui/TextField";
import PasswordForm from "@/components/forms/Password";

const ResetPasswordModal = () => {

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  const addClassBtn = <>New <span className="hide-for-mobile">Class</span></>;


  return (
    <ModalComponent
        ariaTitle="Reset Password"
        ariaDescription="Reset your account password"
        modalBtnContent="Reset Password"
        modalBtnClassName="w-icon reset-btn"
        modalHeader={<h2>Reset Password</h2>}
        // btnAction={submitBtn}
        // closeOnAction={closeOnAction}
      >
      <PasswordForm />
    </ModalComponent>
  );
};

export default ResetPasswordModal;