import { Dispatch, SetStateAction } from "react";
import { TermProps, TermFormProps } from "@/lib/props";

interface TermFormPropsSansStatus {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const fetchTerms = async (
  setError: Dispatch<SetStateAction<string | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setTermList: Dispatch<SetStateAction<TermProps[]>>
) => {
  try {
    setIsLoading(true)
    const res = await fetch("/api/admin/term");
    if (!res.ok) throw new Error("Failed to fetch sessions.")
    const data = await res.json();
    setTermList(data)
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load sessions");
  } finally {
    setIsLoading(false);
  }
}

export const createNewTerm = async (
  formData: TermFormProps,
  setFormData: Dispatch<SetStateAction<TermFormProps>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setSubmitting: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const response = await fetch("/api/admin/term", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "failed to create term");
    }

    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    })
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to create term");
  } finally {
    setSubmitting(false);
  }
}

export const fetchSingleTermById = async (
  termId: string,
  setTermData: Dispatch<SetStateAction<TermProps | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const res = await fetch(`/api/admin/term/${termId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!res.ok) throw new Error("Failed to fetch term.")
    const data = await res.json();
    setTermData(data);
    setIsLoading(false);
  } catch (err) {
    throw err instanceof Error ? err : new Error("Failed to load term");
  }
}

export const updateTermStatusById = async (
  termId: string,
  newStatus: string
) => {
  try {
    const res = await fetch(`/api/admin/term/${termId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) throw new Error("Failed to update term status.")
    const data = await res.json();
    return data;
  } catch (err) {
    throw err instanceof Error ? err : new Error("Failed to update term status");
  }
}

// Update term sans status, which has its own dedicated function to ensure status updates are not accidentally made when updating other term details.
export const updateTermById = async (
  termId: string,
  formData: TermFormPropsSansStatus,
  setError: Dispatch<SetStateAction<string | null>>,
  setSubmitting: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const response = await fetch(`/api/admin/term/${termId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "failed to update term");
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to update term");
  } finally {
    setSubmitting(false);
  }
}