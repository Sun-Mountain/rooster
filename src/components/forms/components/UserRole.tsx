'use client';

import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { EditSquare, Save } from "@mui/icons-material";
import { Role } from "@client";
import { Button } from "@/components/_ui/Button";

interface UserRoleProps {
  userId: string;
  role?: Role;
}

export const UserRole = ({ userId, role }: UserRoleProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  function capitalizeFirstLetter(val:string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase();
  }

  return (
    <>
      {isEditing ? (
          <FormControl fullWidth className="text-field-container">
            <InputLabel id="pronoun-label">Pronouns</InputLabel>
            <Select
              labelId="pronoun-label"
              id="pronoun-select"
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value="he/him">He/Him</MenuItem>
              <MenuItem value="she/her">She/Her</MenuItem>
              <MenuItem value="they/them">They/Them</MenuItem>
              <MenuItem value="ze/zir">Ze/Zir</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
      ) : (
        <>
          {role && capitalizeFirstLetter(role)}
        </>
      )}
      <Button className="icon transparent no-border no-padding side-btn" onClick={handleClick}>
        {isEditing ? (<Save />) : (<EditSquare />)}
      </Button>
    </>
  )
}