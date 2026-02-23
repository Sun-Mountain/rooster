import { Dispatch, SetStateAction } from "react";
import { TermProps } from "@/lib/props";

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
  formData: {
    name: string,
    description: string,
    startDate: string,
    endDate: string
    live: boolean
  },
  setFormData: Dispatch<SetStateAction<{
    name: string,
    description: string,
    startDate: string,
    endDate: string
    live: boolean
  }>>,
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
      live: false
    })
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to create term");
  } finally {
    setSubmitting(false);
  }
}