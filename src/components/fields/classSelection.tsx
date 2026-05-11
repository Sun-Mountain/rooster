"use client";

import { useEffect, useState } from "react";
import { AutoComplete } from "@/components/_ui/AutoComplete";

interface ClassSelectionProps {
  initialClassId?: string;
  disabled?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ClassSelection = ({
  initialClassId,
  disabled = false,
  handleChange
}: ClassSelectionProps) => {
  const [errors, setErrors] = useState<string | null>(null);
  const [classOptions, setClassOptions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await fetch("/api/admin/list/classes");
        const data = await response.json();
        setClassOptions(data);
      } catch (error) {
        setErrors(`Failed to fetch class options: ${error instanceof Error ? error.message : "An unexpected error occurred"}`);
      }
    };

    fetchClassOptions();
  }, []);

  return (
    <AutoComplete
      options={classOptions}
      label="Select Class"
      name="classId"
      initialValue={initialClassId}
      disabled={disabled}
      handleChange={handleChange}
    />
  );
}