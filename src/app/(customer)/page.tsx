import Link from 'next/link'
import { ArrowRight, Leaf, HeartPulse, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/80 to-transparent z-10" />
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop')" }}
        />

        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col items-start gap-6">
          <span className="px-4 py-1.5 rounded-full bg-emerald-800/50 text-emerald-100 text-sm font-semibold backdrop-blur-md border border-emerald-700/50 flex items-center gap-2">
            <Leaf size={16} /> Nourishing Hospital Staff & Patients
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight max-w-3xl tracking-tight">
            Healthy Food,<br />
            <span className="text-emerald-400">Healing Power.</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 max-w-xl leading-relaxed font-medium">
            Discover Nette's Cafe. Real ingredients, restorative broths, and customized salads designed to fuel your day.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/menu/salad-bar" className="px-8 py-4 rounded-full bg-white text-emerald-950 font-bold hover:bg-emerald-50 transition-all flex items-center gap-2 hover:gap-3 shadow-xl shadow-emerald-900/20">
              Build a Salad <ArrowRight size={20} />
            </Link>
            <Link href="/menu/soups" className="px-8 py-4 rounded-full bg-emerald-800/80 text-white font-bold backdrop-blur-md hover:bg-emerald-700 transition border border-emerald-600/50">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tight">Why Choose Nette's?</h2>
            <p className="mt-4 text-stone-500 max-w-2xl mx-auto text-lg font-medium">We believe that hospital food should be the healthiest food in the world.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Leaf className="text-emerald-600" size={32} />, title: 'Fresh Daily', desc: 'All ingredients are sourced locally and prepared fresh every morning.' },
              { icon: <HeartPulse className="text-emerald-600" size={32} />, title: 'Healing Broths', desc: 'Our traditional Chinese soups are slow-cooked for maximum nutrition.' },
              { icon: <Sparkles className="text-emerald-600" size={32} />, title: 'Zero Cream', desc: 'We never use heavy creams; our flavor comes from robust, natural stocks.' }
            ].map((feature, i) => (
              <div key={i} className="bg-stone-50 rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 border border-stone-100 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                <p className="text-stone-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-24 bg-emerald-50 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-teal-200/50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl font-black text-emerald-950 mb-6 tracking-tight">Ready to order?</h2>
          <p className="text-lg text-emerald-800 mb-8 max-w-xl font-medium">Choose between eat-in or takeaway, and enjoy nutritious meals crafted for your well-being.</p>
          <Link href="/menu/salad-bar" className="px-10 py-4 text-lg rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20">
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  )
}
