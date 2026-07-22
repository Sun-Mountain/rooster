import CurrentAndUpcomingSessions from "@/components/content/CurrentAndUpcoming";
import Link from "next/link";

import { ChevronRight } from "@mui/icons-material";

const SessionListSummary = () => {
  return (
    <div className="content-box">
      <div className="content-box-header">
        <div>
          <h2>Upcoming Sessions</h2>
        </div>
        <div>
          <Link href="/sessions">
            View all <ChevronRight />
          </Link>
        </div>
      </div>
      <CurrentAndUpcomingSessions />
    </div>
  )
}

export default SessionListSummary;