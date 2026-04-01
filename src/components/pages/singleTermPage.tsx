import { Breadcrumbs } from "@/components/_ui/Breadcrumbs";

export default function SingleTermPageContent() {
  return (
    <div className="admin-page-container">
      <Breadcrumbs dashboard="admin" page="sessions" />
      <h1>Single Term Page</h1>
    </div>
  )
}