'use client'

import { useState } from 'react'
import { MenuItem } from '@/types/database'
import { AddToCartButton } from '@/components/customer/AddToCartButton'
import { SoupCard } from '@/components/customer/SoupCard'
import BuildYourOwnModal, { BYOIngredient } from '@/components/customer/BuildYourOwnModal'
import EditableText from '@/components/EditableText'
import { ChefHat } from 'lucide-react'

const TABS = [
    { key: 'special', label: '⭐ Daily Specials' },
    { key: 'soup', label: '🍲 Soups' },
    { key: 'pie', label: '🥧 Pies' },
    { key: 'wrap', label: '🌯 Wraps' },
    { key: 'muffin', label: '🧁 Muffins' },
    { key: 'pastry', label: '🥐 Pastries' },
    { key: 'build', label: '🥗 Build Your Own' },
]

export default function MenuClient({
    items,
    saladIngredients,
    title,
    subtitle,
    titleKey,
    subtitleKey,
    isEditable = false,
}: {
    items: MenuItem[]
    saladIngredients: BYOIngredient[]
    title: string
    subtitle: string
    titleKey?: string
    subtitleKey?: string
    isEditable?: boolean
}) {
    const [tab, setTab] = useState('special')
    const [byoOpen, setByoOpen] = useState(false)

    const isBuild = tab === 'build'
    const visibleItems = items.filter(i => i.category === tab)

    return (
        <div className="bg-stone-50 min-h-screen">
            {/* Page Header Banner */}
            <section className="bg-emerald-950 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3">
                        {titleKey ? (
                            <EditableText
                                settingKey={titleKey}
                                initialValue={title}
                                className="text-5xl md:text-6xl font-black tracking-tight text-white"
                                wrapperClassName="w-full"
                                isEditable={isEditable}
                            />
                        ) : title}
                    </h1>
                    <p className="text-emerald-200 text-lg font-medium">
                        {subtitleKey ? (
                            <EditableText
                                settingKey={subtitleKey}
                                initialValue={subtitle}
                                className="text-emerald-200 text-lg font-medium"
                                wrapperClassName="w-full"
                                isEditable={isEditable}
                            />
                        ) : subtitle}
                    </p>
                </div>
            </section>

            {/* Sticky Tab Bar */}
            <div className="sticky top-[81px] z-40 bg-white border-b border-stone-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none">
                    <div className="flex gap-1 py-3 min-w-max">
                        {TABS.map(t => (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${tab === t.key
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                                    : 'text-stone-600 hover:bg-stone-100'
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                {/* ── Build Your Own tab ── */}
                {isBuild ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
                        <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center">
                            <ChefHat size={48} className="text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-stone-900 mb-2">
                                <EditableText settingKey="menu_byo_title"
                                    initialValue="Build Your Own"
                                    className="text-3xl font-black text-stone-900"
                                    wrapperClassName="w-full" isEditable={isEditable} />
                            </h2>
                            <p className="text-stone-500 max-w-sm mx-auto">
                                <EditableText settingKey="menu_byo_desc"
                                    initialValue="Choose your base, protein, up to 6 toppings, and a dressing. We'll build it fresh for you."
                                    as="textarea" className="text-stone-500"
                                    wrapperClassName="max-w-sm w-full" isEditable={isEditable} />
                            </p>
                        </div>
                        <button
                            onClick={() => setByoOpen(true)}
                            className="px-10 py-4 bg-emerald-600 text-white text-lg font-bold rounded-full hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20"
                        >
                            <EditableText settingKey="menu_byo_btn"
                                initialValue="Start Building"
                                className="font-bold text-white" isEditable={isEditable} />
                        </button>
                    </div>
                ) : (
                    /* ── Standard grid ── */
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visibleItems.length === 0 ? (
                            /* ── Empty state ── */
                            <div className="col-span-full min-h-[300px] flex flex-col items-center justify-center text-center gap-3">
                                <p className="text-xl font-semibold text-stone-600">No items in this category yet</p>
                                <p className="text-sm text-stone-400">Run the seed SQL or add items in Admin → Menu Editor</p>
                            </div>
                        ) : (
                            visibleItems.map(item =>
                                item.category === 'soup' && item.metadata?.sizes ? (
                                    <SoupCard key={item.id} item={item} />
                                ) : (
                                    <div
                                        key={item.id}
                                        className="bg-stone-50 rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-2xl transition-shadow group relative overflow-hidden"
                                    >
                                        {item.is_sold_out && (
                                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex items-center justify-center">
                                                <span className="bg-white text-emerald-900 font-bold px-6 py-2 rounded-full border border-stone-200 shadow-xl rotate-[-5deg]">
                                                    Sold Out Today
                                                </span>
                                            </div>
                                        )}
                                        <div className="h-48 -mt-6 -mx-6 mb-5 bg-stone-200 relative overflow-hidden flex items-center justify-center group-hover:bg-stone-300 transition-colors">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        (e.target as HTMLImageElement).parentElement!.classList.add('flex');
                                                    }}
                                                />
                                            ) : (
                                                <span className="text-stone-400 font-serif font-bold text-2xl uppercase tracking-widest opacity-30 select-none">
                                                    {item.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mb-5">
                                            <div className="flex justify-between items-start gap-3 mb-2">
                                                <h3 className="text-xl font-serif text-emerald-900 leading-tight">{item.name}</h3>
                                                <span className="font-black text-orange-700 shrink-0">${item.price.toFixed(2)}</span>
                                            </div>
                                            {item.description && (
                                                <p className="text-sm text-stone-600 leading-relaxed font-medium">{item.description}</p>
                                            )}
                                        </div>
                                        <AddToCartButton item={item} disabled={item.is_sold_out} />
                                    </div>
                                )
                            )
                        )}
                    </div>
                )}
            </div>

            {/* Build Your Own Modal — stays on /menu URL */}
            <BuildYourOwnModal
                open={byoOpen}
                onClose={() => setByoOpen(false)}
                ingredients={saladIngredients}
            />
        </div>
    )
}
