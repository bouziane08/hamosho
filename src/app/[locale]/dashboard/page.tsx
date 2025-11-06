import AdminProtected from "@/components/admin/AdminProtected";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function DashboardPage() {
  return (
    <AdminProtected>
      <AdminDashboard />
    </AdminProtected>
  );
}
