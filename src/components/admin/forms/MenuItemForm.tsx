'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { menuItemSchema, MenuItemFormValues } from '@/lib/validations/menu'
import { createMenuItem, updateMenuItem } from '@/lib/actions/menuActions'
import { useRouter } from 'next/navigation'
import { Loader2, Save } from 'lucide-react'
import { useState } from 'react'

export default function MenuItemForm({ initialData }: { initialData?: any }) {
    const router = useRouter()
    const [submitError, setSubmitError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MenuItemFormValues>({
        resolver: zodResolver(menuItemSchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            category: 'soup',
            price: 0,
            is_sold_out: false,
        },
    })

    const onSubmit = async (data: MenuItemFormValues) => {
        setSubmitError(null)
        try {
            if (initialData?.id) {
                await updateMenuItem(initialData.id, data)
            } else {
                await createMenuItem(data)
            }
        } catch (error: any) {
            setSubmitError(error.message || 'An error occurred while saving the menu item.')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-sm">
            {submitError && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">⚠️</span>
                    {submitError}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-stone-700 mb-2">Item Name</label>
                    <input {...register('name')} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white transition" placeholder="e.g., Herbal Chicken Soup" />
                    {errors.name && <p className="text-red-500 text-sm mt-1 font-medium">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Price ($)</label>
                    <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white transition" />
                    {errors.price && <p className="text-red-500 text-sm mt-1 font-medium">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Category</label>
                    <select {...register('category')} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white transition appearance-none">
                        <option value="soup">Soup</option>
                        <option value="muffin">Muffin</option>
                        <option value="salad_base">Salad Base</option>
                        <option value="salad_protein">Salad Protein</option>
                        <option value="salad_dressing">Salad Dressing</option>
                        <option value="salad_topping">Salad Topping</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1 font-medium">{errors.category.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-stone-700 mb-2">Description</label>
                    <textarea {...register('description')} rows={3} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50 focus:bg-white transition resize-none" placeholder="Tell customers about this item..." />
                    {errors.description && <p className="text-red-500 text-sm mt-1 font-medium">{errors.description.message}</p>}
                </div>

                <div className="md:col-span-2 flex items-center p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                    <input type="checkbox" {...register('is_sold_out')} className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 mr-3 accent-emerald-600 cursor-pointer" id="soldOut" />
                    <label htmlFor="soldOut" className="text-sm font-bold text-stone-800 cursor-pointer select-none">Mark as Sold Out</label>
                </div>
            </div>

            <div className="pt-6 border-t border-stone-100 flex gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl font-bold bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {initialData?.id ? 'Save Changes' : 'Create Item'}
                </button>
            </div>
        </form>
    )
}
