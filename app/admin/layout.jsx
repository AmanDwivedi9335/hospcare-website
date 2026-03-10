import AdminSidebar from '@/components/AdminSidebar'

export const metadata = {
  title: 'Admin'
}

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  )
}
