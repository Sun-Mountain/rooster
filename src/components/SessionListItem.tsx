interface SessionListItemProps {
  sessionId: string;
  name: string;
  startDate: string;
  endDate: string;
  liveStatus: boolean;
}

export const SessionListItem = ({
  sessionId,
  name,
  startDate,
  endDate,
  liveStatus
}: SessionListItemProps) => {
  let liveText = '';

  if (endDate && new Date(endDate) < new Date()) {
    liveText = ' (Ended)';
  } else if (liveStatus) {
    liveText = ' (Live)';
  } else if (!liveStatus) {
    liveText = ' (Draft)';
  }

  return (
    <li className="list-item" key={sessionId}>
      <div className="link-container">
        <a href={`/admin/sessions/${sessionId}`}>
          {name}
        </a>
      </div>
      <div>
        {liveText}
      </div>
      <div>
        {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
      </div>
    </li>
  )
};