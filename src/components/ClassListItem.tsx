"use client";

interface ClassListItemProps {
  classId: string;
  name: string;
}

export const ClassListItem = ({
  classId,
  name,
}: ClassListItemProps) => {
  return (
    <li className="list-item" key={classId}>
      <div className="link-container">
        <a href={`/admin/class/${classId}`}>
          {name}
        </a>
      </div>
      <div></div>
    </li>
  )
};