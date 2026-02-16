import { ClassProps } from "@/lib/props";

export const fetchSessionClasses = async (
  sessionId: string,
  classIds: string[]
): Promise<ClassProps[]> => {
  const response = await fetch(`/api/admin/term/${sessionId}/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ classIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch session classes");
  }

  const data = await response.json();
  return data as ClassProps[];
}