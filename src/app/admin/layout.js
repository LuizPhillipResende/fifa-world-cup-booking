import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({ children }) {
  // Verificação de permissões do lado do servidor
  const { session, errorResponse } = await requireAdmin();

  if (errorResponse) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-bg-base">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
