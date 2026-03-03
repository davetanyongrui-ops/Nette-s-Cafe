import Link from 'next/link'
import { LayoutDashboard, Utensils, ClipboardList, LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-stone-100">
            {/* Sidebar */}
            <aside className="w-64 bg-emerald-950 text-white flex flex-col">
                <div className="p-6 border-b border-emerald-900">
                    <h2 className="text-xl font-bold tracking-tight">Nette's Cafe Admin</h2>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-900 transition-colors text-emerald-50">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-900 transition-colors text-emerald-50">
                        <ClipboardList size={20} /> Live Orders
                    </Link>
                    <Link href="/admin/menu-editor" className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-900 transition-colors text-emerald-50">
                        <Utensils size={20} /> Menu Editor
                    </Link>
                </nav>
                <div className="p-4 border-t border-emerald-900">
                    <form action="/auth/signout" method="post">
                        <button className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-emerald-900 transition-colors text-emerald-200">
                            <LogOut size={20} /> Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                {children}
            </main>
        </div>
    )
}
