'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'react-hot-toast'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // 1. Fetch all settings on load
  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase.from('site_settings').select('*')
      if (data) {
        const map = Object.fromEntries(data.map(s => [s.key, s.value]))
        setSettings(map)
      }
      setLoading(false)
    }
    loadSettings()
  }, [])

  // 2. Handle the update
  const handleUpdate = async (key: string, newValue: string) => {
    const { error } = await supabase
      .from('site_settings')
      .update({ value: newValue })
      .eq('key', key)

    if (error) toast.error('Update failed')
    else toast.success(`${key} updated!`)
  }

  if (loading) return <div className="p-8">Loading Settings...</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-orange-800">Website Content Manager</h1>
      
      <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-orange-100">
        <h2 className="text-xl font-semibold border-b pb-2">General Contact Info</h2>
        
        {/* We map through the keys we want to edit */}
        {['cafe_phone', 'cafe_address', 'hero_title', 'about_description'].map((key) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 capitalize">
              {key.replace('_', ' ')}
            </label>
            <textarea
              className="border rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none"
              defaultValue={settings[key]}
              onBlur={(e) => handleUpdate(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
        💡 <strong>Pro-Tip:</strong> Changes save automatically when you click out of the text box (on blur).
      </div>
    </div>
  )
}
