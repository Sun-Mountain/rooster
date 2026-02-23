import { Dispatch, SetStateAction } from "react";
import { TermProps } from "@/lib/props";

export const fetchTerms = async (
  setError: Dispatch<SetStateAction<string | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setTermList: Dispatch<SetStateAction<TermProps[]>>
) => {
  try {
    setIsLoading(true)
    const res = await fetch("/api/term");
    if (!res.ok) throw new Error("Failed to fetch sessions.")
    const data = await res.json();
    setTermList(data)
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load sessions");
  } finally {
    setIsLoading(false);
  }
}