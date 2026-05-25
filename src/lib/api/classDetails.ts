import { Dispatch, SetStateAction } from "react";
import { ClassDetailProps } from "@/lib/props";

export const fetchClassDetailsByTerm = async (
  termId: string,
  setError: Dispatch<SetStateAction<string | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setClassDetailsList: Dispatch<SetStateAction<ClassDetailProps[]>>
) => {
  try {
    setIsLoading(true);
    const res = await fetch(`/api/admin/classDetails?termId=${termId}`);
    if (!res.ok) throw new Error("Failed to fetch class details.");
    const data = await res.json();
    setClassDetailsList(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load class details");
  } finally {
    setIsLoading(false);
  }
}

export const deleteClassDetail = async (id: string) => {
  try {
    const res = await fetch(`/api/admin/classDetails?id=${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Failed to delete class detail.");
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Failed to delete class detail");
  }
}