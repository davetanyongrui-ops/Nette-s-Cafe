'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store/cartStore'
import { Plus, CheckCircle2 } from 'lucide-react'

export function AddToCartButton({ item, disabled }: { item: any; disabled: boolean }) {
    const addItem = useCartStore(s => s.addItem)
    const [added, setAdded] = useState(false)

    const handleAdd = () => {
        if (disabled) return
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            category: item.category,
            customizations: null,
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 1800)
    }

    return (
        <button
            onClick={handleAdd}
            disabled={disabled}
            className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${added
                    ? 'bg-emerald-600 text-white'
                    : disabled
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white group-hover:bg-emerald-600 group-hover:text-white'
                }`}
        >
            {added ? <><CheckCircle2 size={18} /> Added!</> : <><Plus size={18} /> Add to Order</>}
        </button>
    )
}
