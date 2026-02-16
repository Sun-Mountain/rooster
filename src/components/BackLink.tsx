import { KeyboardDoubleArrowLeft } from "@mui/icons-material";

interface BackLinkProps {
  href: string;
  label: string;
}

export const BackLink = ({ href, label }: BackLinkProps) => {
  return (
    <a className="back-link" href={href}>
      <KeyboardDoubleArrowLeft /> Back to {label}
    </a>
  );
}