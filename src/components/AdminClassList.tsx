"use client";

import { ClassProps } from "@/lib/props";
import { ClassListItem } from "./ClassListItem";

interface AdminClassListProps {
  classList: ClassProps[];
}

export default function AdminClassList({ classList }: AdminClassListProps) {
  return (
    <ul className="admin-list">
      {classList.map((classItem: ClassProps) => (
        <ClassListItem key={classItem.id} classId={classItem.id} name={classItem.name} />
      ))}
    </ul>
  )
}