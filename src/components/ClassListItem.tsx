"use client";

interface ClassListItemProps {
  classId: string;
  name: string;
  noDescription?: boolean;
}

export const ClassListItem = ({
  classId,
  name,
  noDescription = false,
}: ClassListItemProps) => {
  return (
    <li className="list-item" key={classId}>
      <div className="link-container">
        <a href={`/admin/class/${classId}`}>
          {name}
        </a>
      </div>
      <div></div>
      {noDescription ? <div className="missing-info">Missing description</div> : null}
    </li>
  )
};