import { dateFormat } from "@/helpers/formatting";
import { titleCaseFormat } from "@/helpers/formatting";

type SessionInfoCardProps = {
  weeks: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  description?: string;
};

const SessionInfoCard = ({ weeks, name, startDate, endDate, status, description }: SessionInfoCardProps) => {
  return (
    <>
      <div className="session-card-header">
        <div className="session-card-header-info">
          <div className="week-counter">
            <span className="week-count-number">{weeks}</span><br />weeks
          </div>
          <div>
            <h1>{titleCaseFormat(name)}</h1>
            <div>
              {dateFormat(startDate)} - {dateFormat(endDate)}
            </div>
          </div>
        </div>
        <div>
          <div className={`pill ${status.toLowerCase()}`}>
            {status.at(0) + status.slice(1).toLowerCase()}
          </div>
        </div>
      </div>
      <div className="session-description">
        {description}
      </div>
    </>
  )
}

export default SessionInfoCard;