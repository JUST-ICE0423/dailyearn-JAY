import Link from 'next/link';
import { ApplicationShell } from '@/components/ApplicationShell';

const highlights = [
  { label: 'No deposits', value: 'Zero upfront money required' },
  { label: 'No guaranteed earnings', value: 'Reward amounts are validated before payout' },
  { label: 'No incentivized clicks', value: 'All offers are transparent and approval-based' },
];

const featureCards = [
  {
    title: 'Approved offers',
    text: 'Browse high-quality offers from trusted brands and complete tasks only when you understand the activity.',
    accent: 'bg-navy',
  },
  {
    title: 'Reward ledger',
    text: 'Track pending payments and confirmed earnings clearly in ZAR with transparent approval history.',
    accent: 'bg-teal',
  },
  {
    title: 'Safe payouts',
    text: 'Request cash-out from your verified balance once your rewards are approved and settled.',
    accent: 'bg-slate-900',
  },
];

export default function HomePage() {
  return (
    <ApplicationShell>
      <main>
        <section className="bg-soft text-white">
          <div className="container-shell py-16 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
                  DailyEarn with JAY
                </span>
                <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                  Earn rewards for legitimate digital activity in South Africa.
                </h1>
                <p className="mt-6 max-w-xl text-lg text-slate-200">
                  DailyEarn JAY helps you discover approved offers, track verified rewards, and request payouts in ZAR with a clear, user-first process.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/register" className="rounded-full bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-400">
                    Join free
                  </Link>
                  <Link href="/offers" className="rounded-full border border-white/25 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10">
                    Explore offers
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-200">
                  <span>R100 min payout</span>
                  <span>Fast approval flow</span>
                  <span>Zero deposits</span>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="rounded-2xl bg-white p-5 text-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Available balance</p>
                      <p className="mt-2 text-4xl font-black text-navy">R 1,248.40</p>
                    </div>
                    <div className="rounded-full bg-green-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                      Verified
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-2xl bg-slate-100 p-3">
                      <p className="text-slate-500">Pending</p>
                      <p className="mt-2 font-bold text-navy">R 385.00</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-3">
                      <p className="text-slate-500">Confirmed</p>
                      <p className="mt-2 font-bold text-navy">R 863.40</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-3">
                      <p className="text-slate-500">Payouts</p>
                      <p className="mt-2 font-bold text-navy">R 600</p>
                    </div>
                  </div>
                  <div className="mt-6 rounded-2xl bg-slate-100 p-4">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Reward progress</span>
                      <span>72%</span>
                    </div>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-shell py-14">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="card p-6">
                <div className="mb-4 h-2 w-14 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">{item.label}</p>
                <p className="mt-3 text-lg font-semibold text-navy">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-shell pb-14">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Why DailyEarn</p>
            <h2 className="mt-3 text-3xl font-black text-navy">Built for clarity, trust, and transparent reward tracking.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((card) => (
              <div key={card.title} className="card p-6">
                <div className={`mb-5 inline-flex rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white ${card.accent}`}>
                  DailyEarn
                </div>
                <h3 className="text-xl font-bold text-navy">{card.title}</h3>
                <p className="mt-4 text-slate-600">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#eaf7f9] py-14">
          <div className="container-shell">
            <div className="grid items-center gap-8 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-[1.6fr_1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Ready to begin?</p>
                <h2 className="mt-3 text-3xl font-black text-navy">Create your free account and track verified rewards.</h2>
              </div>
              <div className="flex justify-end">
                <Link href="/register" className="rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-sky-900">
                  Register now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ApplicationShell>
  );
}
