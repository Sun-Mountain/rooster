import Link from 'next/link';

export const AdminDashLinks = () => {
  return (
    <div className="admin-dash-links">
      <ul>
        <li>
          <Link href="/admin">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/sessions">Manage Sessions</Link>
        </li>
      </ul>
    </div>
  );
}