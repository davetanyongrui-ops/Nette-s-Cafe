'use client'

import { Suspense, useState } from 'react'
import Header from '@/components/customer/Header'
import CartSidebar from '@/components/customer/CartSidebar'
import Footer from '@/components/customer/Footer'

type FooterData = { cafeName: string; tagline: string; copyright: string }
type CustomPageLink = { id: string; title: string; slug: string }

export default function CustomerShell({
    children,
    footerData,
    customPages = [],
}: {
    children: React.ReactNode
    footerData: FooterData
    customPages?: CustomPageLink[]
}) {
    const [cartOpen, setCartOpen] = useState(false)

    return (
        <Suspense>
            <Header onCartOpen={() => setCartOpen(true)} customPages={customPages} />
            <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
            {children}
            <Footer
                cafeName={footerData.cafeName}
                tagline={footerData.tagline}
                copyright={footerData.copyright}
                cafeNameKey="footer_cafe_name"
                taglineKey="footer_tagline"
                copyrightKey="footer_copyright"
            />
        </Suspense>
    )
}
