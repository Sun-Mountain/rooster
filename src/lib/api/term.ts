import { Dispatch, SetStateAction } from "react";
import { TermProps } from "@/lib/props";

export const fetchSingleSession = async (sessionId: string, setSession: Dispatch<SetStateAction<TermProps | null>>) => {
  try {
    const response = await fetch(`/api/admin/term/${sessionId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }
    const data: TermProps = await response.json();
    setSession(data);
  } catch (error) {
    console.error("Error fetching session:", error);
  }
};