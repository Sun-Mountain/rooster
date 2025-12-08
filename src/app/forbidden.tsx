
import { Button } from "@/components/_ui/Button";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main>
      <div>
        <div>
          <h1>403 - Forbidden</h1>
          <p>
            You don&apos;t have access to this page.
          </p>
        </div>
        <div>
          <Button>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}