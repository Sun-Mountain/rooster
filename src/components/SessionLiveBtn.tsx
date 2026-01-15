import { Button } from "@/components/_ui/Button";
import { Circle, DoNotDisturb } from "@mui/icons-material";

interface SessionLiveBtnProps {
  live: boolean;
  className?: string;
}

export const SessionLiveBtn = ({ live, className }: SessionLiveBtnProps) => {
  return (
    <Button
      className={`${live ? "status live" : "status inactive"} ${className || ""}`}
    >
      {live ? (
        <>
          <Circle fontSize="small" /> Live
        </>
      ) : (
        <>
          <DoNotDisturb fontSize="small" /> Inactive
        </>
      )}
    </Button>
  );
}