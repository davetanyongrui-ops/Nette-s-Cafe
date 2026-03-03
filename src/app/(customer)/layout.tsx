import Link from 'next/link'
import { CartButton } from '@/components/customer/CartButton'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
            <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black text-emerald-900 tracking-tight">
                        Nette's Cafe
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/menu/soups" className="text-sm font-semibold text-stone-600 hover:text-emerald-700 transition">Nourishing Soups</Link>
                        <Link href="/menu/muffins" className="text-sm font-semibold text-stone-600 hover:text-emerald-700 transition">Healthy Muffins</Link>
                        <Link href="/menu/salad-bar" className="text-sm font-semibold text-stone-600 hover:text-emerald-700 transition">Salad Bar</Link>
                        <div className="h-6 w-px bg-stone-200"></div>
                        <CartButton />
                    </nav>
                </div>
            </header>

            <main className="flex-1 flex flex-col">
                {children}
            </main>

            <footer className="bg-stone-950 text-stone-400 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-xl font-bold text-stone-100 tracking-tight mb-4">Nette's Cafe</h3>
                    <p className="text-sm text-stone-500 mb-8 max-w-md mx-auto">Providing nutritious, delicious meals for hospital staff, patients, and visitors.</p>
                    <p className="text-xs">&copy; {new Date().getFullYear()} Nette's Cafe. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
