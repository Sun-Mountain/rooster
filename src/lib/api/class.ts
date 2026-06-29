import { Dispatch, SetStateAction } from "react";
import { ClassProps } from "@/lib/props";

export const fetchClasses = async (
  setError: Dispatch<SetStateAction<string | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setClassList: Dispatch<SetStateAction<ClassProps[]>>
) => {
  try {
    setIsLoading(true)
    const res = await fetch("/api/admin/classes");
    if (!res.ok) throw new Error("Failed to fetch classes.")
    const data = await res.json();
    setClassList(data)
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load classes")
  } finally {
    setIsLoading(false)
  }
}

export const fetchSingleClassById = async (
  classId: string,
  setClassData: Dispatch<SetStateAction<ClassProps | null>>,
  setIsLoading?: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (setIsLoading) setIsLoading(true);
    const res = await fetch(`/api/admin/class?id=${classId}`);
    if (!res.ok) throw new Error("Failed to fetch class.")
    const data = await res.json();
    setClassData(data)
  } catch (err) {
    throw err instanceof Error ? err : new Error("Failed to load class");
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export const fetchClassCount = async (
  setError: Dispatch<SetStateAction<string | null>>,
  setClassCount: Dispatch<SetStateAction<number>>
) => {
  try {
    const res = await fetch("/api/admin/class-count");
    if (!res.ok) throw new Error("Failed to fetch class count.")
    const data = await res.json();
    setClassCount(data.count)
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load class count")
  }
}