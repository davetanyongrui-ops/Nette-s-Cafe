'use client'

import { useCartStore } from '@/lib/store/cartStore'
import { Plus } from 'lucide-react'

export function AddToCartButton({ item, disabled }: { item: any, disabled: boolean }) {
    const addItem = useCartStore((state) => state.addItem)

    const handleAdd = () => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            category: item.category,
            customizations: null
        })
        alert(`${item.name} added to cart!`)
    }

    return (
        <button
            onClick={handleAdd}
            disabled={disabled}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${disabled
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white group-hover:bg-emerald-600 group-hover:text-white'
                }`}
        >
            <Plus size={20} /> Add to Order
        </button>
    )
}
