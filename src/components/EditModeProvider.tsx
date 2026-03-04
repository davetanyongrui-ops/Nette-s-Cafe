'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Pencil, X, ExternalLink } from 'lucide-react'

type EditModeCtx = { editMode: boolean; isAdmin: boolean }

const EditModeContext = createContext<EditModeCtx>({ editMode: false, isAdmin: false })

export const useEditMode = () => useContext(EditModeContext)

export function EditModeProvider({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams()
    const [editMode, setEditMode] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const checkAdmin = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()

            if (profile?.role === 'admin' || profile?.role === 'staff') {
                setIsAdmin(true)
                // Auto-enable edit mode if on an admin route
                if (window.location.pathname.startsWith('/admin/editor')) {
                    setEditMode(true)
                }
            }
        }
        checkAdmin()
    }, [])

    return (
        <EditModeContext.Provider value={{ editMode, isAdmin }}>
            {children}
        </EditModeContext.Provider>
    )
}
