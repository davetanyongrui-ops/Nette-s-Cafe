'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Leaf, ArrowUpRight } from 'lucide-react'
import EditableText from '@/components/EditableText'

type FooterProps = {
    cafeName: string
    tagline: string
    copyright: string
    cafeNameKey: string
    taglineKey: string
    copyrightKey: string
}

const EXPLORE = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/menu', label: 'Menu' },
    { href: '/contact', label: 'Contact' },
]

export default function Footer({
    cafeName, tagline, copyright,
    cafeNameKey, taglineKey, copyrightKey,
}: FooterProps) {
    return (
        <footer className="bg-[#2D2D2D] text-stone-400">
            {/* Main grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                    {/* Brand column */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <span className="w-8 h-8 rounded-full bg-[#7D8E74] flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                                <Leaf size={14} className="text-white" />
                            </span>
                            <span className="font-serif text-xl font-bold text-white tracking-tight">
                                <EditableText settingKey={cafeNameKey} initialValue={cafeName}
                                    className="font-serif text-xl font-bold text-white tracking-tight" />
                            </span>
                        </Link>
                        <p className="text-sm text-stone-500 leading-relaxed max-w-[220px]">
                            <EditableText settingKey={taglineKey} initialValue={tagline}
                                className="text-sm text-stone-500 leading-relaxed"
                                wrapperClassName="w-full" />
                        </p>
                        {/* Decorative accent line */}
                        <div className="w-12 h-0.5 bg-[#7D8E74] rounded-full mt-1" />
                    </div>

                    {/* Contact column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-stone-500">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="tel:+6221000000" className="flex items-start gap-3 text-sm text-stone-400 hover:text-white transition group">
                                    <Phone size={15} className="mt-0.5 text-[#7D8E74] group-hover:text-[#a3b39b] transition shrink-0" />
                                    <span>+62 21 000 0000</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hello@nettescafe.id" className="flex items-start gap-3 text-sm text-stone-400 hover:text-white transition group">
                                    <Mail size={15} className="mt-0.5 text-[#7D8E74] group-hover:text-[#a3b39b] transition shrink-0" />
                                    <span>hello@nettescafe.id</span>
                                </a>
                            </li>
                            <li>
                                <span className="flex items-start gap-3 text-sm text-stone-400">
                                    <MapPin size={15} className="mt-0.5 text-[#7D8E74] shrink-0" />
                                    <span>123 Wellness Way,<br />Jakarta, Indonesia</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Explore column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-stone-500">Explore</h3>
                        <ul className="space-y-2.5">
                            {EXPLORE.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm text-stone-400 hover:text-white transition flex items-center gap-1 group"
                                    >
                                        {label}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition -translate-x-1 group-hover:translate-x-0" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Follow Us column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-stone-500">Follow Us</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-stone-400 hover:text-white transition group"
                                >
                                    <span className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center group-hover:bg-[#7D8E74] transition">
                                        <Instagram size={14} />
                                    </span>
                                    @nettescafe
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-stone-400 hover:text-white transition group"
                                >
                                    <span className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center group-hover:bg-[#7D8E74] transition">
                                        <Facebook size={14} />
                                    </span>
                                    Nette&apos;s Cafe
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-stone-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-stone-600">
                    <EditableText settingKey={copyrightKey} initialValue={copyright}
                        className="text-xs text-stone-600" />
                </p>
                <a
                    href="/admin/login"
                    className="text-[10px] text-stone-800 hover:text-stone-500 transition tracking-widest uppercase font-bold"
                >
                    Staff Access
                </a>
            </div>
        </footer>
    )
}
