'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as LP } from '@mui/x-date-pickers/LocalizationProvider';

import { FC, ReactNode } from "react";

const LocalizationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LP dateAdapter={AdapterDayjs}>
      {children}
    </LP>
  );
};

export default LocalizationProvider;