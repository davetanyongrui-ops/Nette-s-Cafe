import { createClient } from '@/lib/supabase/server'
import { toSettingsMap, getSetting } from '@/types/database'
import CustomerShell from '@/components/customer/CustomerShell'

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()

    // Fetch settings
    const { data: settingsData } = await supabase.from('site_settings').select('key, value')
    const s = toSettingsMap(settingsData ?? [])

    // Fetch custom pages for navigation
    const { data: pagesData } = await supabase
        .from('custom_pages')
        .select('id, title, slug')
        .order('created_at', { ascending: true })

    return (
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
            <CustomerShell
                footerData={{
                    cafeName: getSetting(s, 'footer_cafe_name', "Nette's Cafe"),
                    tagline: getSetting(s, 'footer_tagline', 'Providing nutritious, delicious meals for hospital staff, patients, and visitors.'),
                    copyright: getSetting(s, 'footer_copyright', `© ${new Date().getFullYear()} Nette's Cafe. All rights reserved.`),
                }}
                customPages={pagesData || []}
            >
                <main className="flex-1 flex flex-col">
                    {children}
                </main>
            </CustomerShell>
        </div>
    )
}
