"use client";

import { ClassProps } from "@/lib/props";

interface AdminClassListProps {
  classList: ClassProps[];
}

export default function AdminClassList({ classList }: AdminClassListProps) {
  return (
    <ul className="admin-list">
      {classList.map((classItem: ClassProps) => (
        <li key={classItem.id}>
          {classItem.name}
        </li>
      ))}
    </ul>
  )
}