import { createClient } from '@/lib/supabase/server'
import { toSettingsMap, getSetting } from '@/types/database'
import { CheckCircle2 } from 'lucide-react'
import EditableText from '@/components/EditableText'

type Props = { isEditable?: boolean }

export default async function AboutView({ isEditable = false }: Props) {
    const supabase = await createClient()
    const { data } = await supabase.from('site_settings').select('key, value')
    const s = toSettingsMap(data ?? [])

    return (
        <div className="bg-stone-50">
            {/* Hero */}
            <section className="bg-emerald-950 py-24 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680')] bg-cover bg-center" />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">
                        <EditableText settingKey="about_hero_tag"
                            initialValue={getSetting(s, 'about_hero_tag', 'Our Story')}
                            className="text-emerald-400 font-bold uppercase tracking-widest text-sm"
                            isEditable={isEditable} />
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                        <EditableText settingKey="about_hero_title"
                            initialValue={getSetting(s, 'about_hero_title', "About Nette's Cafe")}
                            className="text-5xl md:text-6xl font-black tracking-tight text-white"
                            wrapperClassName="w-full" isEditable={isEditable} />
                    </h1>
                    <EditableText settingKey="about_intro"
                        initialValue={getSetting(s, 'about_intro', "Nette's Cafe was founded with a simple belief: hospital food should be the healthiest food in the world.")}
                        as="textarea" className="text-emerald-100 text-lg leading-relaxed font-medium"
                        wrapperClassName="max-w-2xl mx-auto w-full" isEditable={isEditable} />
                </div>
            </section>

            {/* Mission + Values */}
            <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-black text-emerald-950 tracking-tight mb-4">
                            <EditableText settingKey="about_mission_title"
                                initialValue={getSetting(s, 'about_mission_title', 'Our Mission')}
                                className="text-3xl font-black text-emerald-950 tracking-tight"
                                wrapperClassName="w-full" isEditable={isEditable} />
                        </h2>
                        <EditableText settingKey="about_mission_body"
                            initialValue={getSetting(s, 'about_mission_body', 'To nourish, comfort, and energize everyone who walks through our doors. We source the freshest local ingredients and prepare everything from scratch daily.')}
                            as="textarea" className="text-stone-600 text-lg leading-relaxed"
                            wrapperClassName="w-full" isEditable={isEditable} />
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
                        <h3 className="font-bold text-emerald-700 uppercase tracking-widest text-xs mb-6">
                            <EditableText settingKey="about_values_heading"
                                initialValue={getSetting(s, 'about_values_heading', 'Our Values')}
                                className="font-bold text-emerald-700 uppercase tracking-widest text-xs"
                                isEditable={isEditable} />
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { key: 'about_value_1', fallback: 'Fresh & Local' },
                                { key: 'about_value_2', fallback: 'Zero Cream Soups' },
                                { key: 'about_value_3', fallback: 'Customizable Salads' },
                                { key: 'about_value_4', fallback: 'Hospital-Grade Hygiene' },
                            ].map((v) => (
                                <li key={v.key} className="flex items-center gap-3 text-stone-800 font-semibold">
                                    <CheckCircle2 size={22} className="text-emerald-500 shrink-0" />
                                    <EditableText settingKey={v.key}
                                        initialValue={getSetting(s, v.key, v.fallback)}
                                        className="font-semibold text-stone-800"
                                        wrapperClassName="flex-1" isEditable={isEditable} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}
