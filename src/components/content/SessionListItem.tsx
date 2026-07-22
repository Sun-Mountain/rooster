
import { TermProps } from "@/lib/props";
import { dateFormat, titleCaseFormat } from "@/helpers/formatting";
import Link from "next/link";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface SessionListItemProps {
  term: TermProps;
} 

const SessionListItem = ({ term }: SessionListItemProps) => {

  const pillText = (status: string) => {
    const text = status.at(0) + status.slice(1).toLowerCase();
    return text;
  }

  return (
    <div className={`session-list-item-container`}>
      <div className="list-item-header">
        <div className="week-count">
          <span className="week-count-number">{term.weeks}</span><br />wk{term.weeks > 1 ? "s" : ""}
        </div>
        <div className="list-item-info">
          <div className="list-item-name">
            <Link className="list-item-link" href={`/admin/session?id=${term.id}`}>
              <h3>{titleCaseFormat(term.name)}</h3>
            </Link>
            <div className={`pill ${term.status.toLowerCase()}`}>{pillText(term.status)}</div>
          </div>
          <div className="list-item-dates">
            {dateFormat(term.startDate)} - {dateFormat(term.endDate)}
          </div>
          <div className="list-item-class-count">
            # classes
          </div>
        </div>
      </div>
      <div>
        <div>
        </div>
        <div className="list-item-actions">
          <Link className="list-item-btn" href={`/admin/session?id=${term.id}`}>
            <ArrowForwardIosIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SessionListItem;