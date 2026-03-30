import { TermStatus } from "@client";
import { Circle, Inventory, Drafts } from "@mui/icons-material";

interface SessionListItemProps {
  sessionId: string;
  name: string;
  startDate: string;
  endDate: string;
  liveStatus: TermStatus;
}

export const SessionListItem = ({
  sessionId,
  name,
  startDate,
  endDate,
  liveStatus
}: SessionListItemProps) => {

  console.log("SessionListItem liveStatus:", liveStatus);

  return (
    <li className={`list-item`} key={sessionId}>
      <div className="link-container">
        <a href={`/admin/sessions/${sessionId}`}>
          {name}
        </a>
      </div>
      <div>
        {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
      </div>
    </li>
  )
};