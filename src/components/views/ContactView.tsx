import { createClient } from '@/lib/supabase/server'
import { toSettingsMap, getSetting } from '@/types/database'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import EditableText from '@/components/EditableText'

type Props = { isEditable?: boolean }

export default async function ContactView({ isEditable = false }: Props) {
    const supabase = await createClient()
    const { data } = await supabase.from('site_settings').select('key, value')
    const s = toSettingsMap(data ?? [])

    const details = [
        { icon: <MapPin size={20} className="text-emerald-600" />, label: 'Address', key: 'contact_address', fallback: 'Level 1, Hospital Lobby' },
        { icon: <Phone size={20} className="text-emerald-600" />, label: 'Phone', key: 'contact_phone', fallback: '+65 9123 4567' },
        { icon: <Mail size={20} className="text-emerald-600" />, label: 'Email', key: 'contact_email', fallback: 'hello@nettescafe.com' },
        { icon: <Clock size={20} className="text-emerald-600" />, label: 'Mon – Fri', key: 'contact_hours_weekday', fallback: '7:00 AM – 7:00 PM' },
        { icon: <Clock size={20} className="text-emerald-600" />, label: 'Sat – Sun', key: 'contact_hours_weekend', fallback: '8:00 AM – 4:00 PM' },
    ]

    return (
        <div className="bg-stone-50 min-h-screen">
            <section className="bg-emerald-950 py-24 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
                        <EditableText settingKey="contact_title"
                            initialValue={getSetting(s, 'contact_title', 'Get in Touch')}
                            className="text-5xl md:text-6xl font-black tracking-tight text-white"
                            wrapperClassName="w-full" isEditable={isEditable} />
                    </h1>
                    <EditableText settingKey="contact_subtitle"
                        initialValue={getSetting(s, 'contact_subtitle', 'Located inside the hospital campus.')}
                        className="text-emerald-200 text-lg font-medium"
                        wrapperClassName="max-w-xl mx-auto w-full" isEditable={isEditable} />
                </div>
            </section>

            <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
                        <h2 className="text-2xl font-black text-stone-900 mb-6 tracking-tight">
                            <EditableText settingKey="contact_details_heading"
                                initialValue={getSetting(s, 'contact_details_heading', 'Contact Details')}
                                className="text-2xl font-black text-stone-900 tracking-tight"
                                wrapperClassName="w-full" isEditable={isEditable} />
                        </h2>
                        <ul className="space-y-5">
                            {details.map((d, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
                                        {d.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                                            <EditableText settingKey={`${d.key}_label`}
                                                initialValue={d.label}
                                                className="text-xs font-bold text-stone-400 uppercase tracking-wider"
                                                isEditable={isEditable} />
                                        </p>
                                        <EditableText settingKey={d.key}
                                            initialValue={getSetting(s, d.key, d.fallback)}
                                            className="font-semibold text-stone-800"
                                            wrapperClassName="w-full" isEditable={isEditable} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-emerald-950 rounded-3xl p-8 text-white">
                        <h2 className="text-2xl font-black mb-6 tracking-tight">
                            <EditableText settingKey="contact_form_heading"
                                initialValue={getSetting(s, 'contact_form_heading', 'Send a Message')}
                                className="text-2xl font-black text-white tracking-tight"
                                wrapperClassName="w-full" isEditable={isEditable} />
                        </h2>
                        <form className="space-y-4">
                            {[
                                { label: 'Your Name', type: 'text', placeholder: 'Jane Doe' },
                                { label: 'Email', type: 'email', placeholder: 'jane@example.com' },
                            ].map(f => (
                                <div key={f.label}>
                                    <label className="block text-sm font-bold text-emerald-300 mb-1.5">{f.label}</label>
                                    <input type={f.type} placeholder={f.placeholder}
                                        className="w-full px-4 py-3 rounded-xl bg-emerald-900/80 border border-emerald-800 text-white placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-bold text-emerald-300 mb-1.5">
                                    <EditableText settingKey="contact_form_msg_label"
                                        initialValue="Message"
                                        className="text-sm font-bold text-emerald-300"
                                        isEditable={isEditable} />
                                </label>
                                <textarea rows={4} placeholder="Catering enquiry, feedback..."
                                    className="w-full px-4 py-3 rounded-xl bg-emerald-900/80 border border-emerald-800 text-white placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                            </div>
                            <button type="submit" className="w-full py-4 rounded-xl bg-white text-emerald-950 font-bold hover:bg-emerald-50 transition shadow-lg">
                                <EditableText settingKey="contact_form_submit_btn"
                                    initialValue="Send Message"
                                    className="font-bold text-emerald-950"
                                    isEditable={isEditable} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
