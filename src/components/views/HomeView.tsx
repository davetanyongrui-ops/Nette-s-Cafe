import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { toSettingsMap, getSetting } from '@/types/database'
import EditableText from '@/components/EditableText'
import HomeViewClient from '@/components/customer/HomePageContent'

type Props = { isEditable?: boolean }

export default async function HomeView({ isEditable = false }: Props) {
    const supabase = await createClient()
    const { data } = await supabase.from('site_settings').select('key, value')
    const s = toSettingsMap(data ?? [])

    const content = {
        tagline: getSetting(s, 'cafe_tagline', 'Nourishing Body & Soul'),
        heroTitle: getSetting(s, 'home_hero_title', 'Wellness in Every Sip.'),
        heroSubtitle: getSetting(s, 'home_hero_subtitle', 'Nette\'s Cafe brings farm-fresh ingredients, healing broths, and nature-inspired nutrition to every plate — crafted for your wellbeing.'),
        ctaButton: getSetting(s, 'home_cta_button', 'Explore Menu'),
        ourStoryBtn: getSetting(s, 'home_our_story_btn', 'Our Story'),
        featuresHeading: getSetting(s, 'home_features_heading', "The Health Hub"),
        featuresSubtitle: getSetting(s, 'home_features_subtitle', 'Where mindful eating meets unforgettable flavour.'),
        feature1Title: getSetting(s, 'home_feature1_title', 'Farm-to-Table Sourcing'),
        feature1Desc: getSetting(s, 'home_feature1_desc', 'We partner with local farms within 50 km of our kitchen. Every morning, fresh produce arrives — no cold-chain shortcuts, just honest ingredients picked at peak nutrition.'),
        feature2Title: getSetting(s, 'home_feature2_title', 'Dish of the Day'),
        feature2Desc: getSetting(s, 'home_feature2_desc', 'Our philosophy is simple: food is medicine. Each dish is designed by our nutritionist to deliver macro-balance, gut-friendly fibre, and anti-inflammatory superfoods.'),
        ctaTitle: getSetting(s, 'home_cta_title', 'Ready to eat well?'),
        ctaSubtitle: getSetting(s, 'home_cta_subtitle', 'Choose eat-in or takeaway. Every meal, made with intention.'),
        startOrderBtn: getSetting(s, 'home_start_order_btn', 'Start Your Order'),
    }

    return <HomeViewClient content={content} isEditable={isEditable} />
}
