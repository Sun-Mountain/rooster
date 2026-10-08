import SessionInfoCard from "@/components/content/SessionInfoCard";
import SessionClasses from "@/components/content/SessionClasses";

type SingleSessionSignUpProps = {
  termId: string;
  weeks: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  description?: string;
};

const SingleSessionSignUp = ({
  termId, 
  weeks, 
  name, 
  startDate, 
  endDate, 
  status, 
  description }: SingleSessionSignUpProps) => {
  return (
    <div className="single-session-signup-content">
      <div className="session-card-container">
        <SessionInfoCard
          weeks={weeks}
          name={name}
          startDate={startDate}
          endDate={endDate}
          status={status}
          description={description}
        />
      </div>
      <SessionClasses sessionId={termId} sessionName={name} />
    </div>
  );
};

export default SingleSessionSignUp;