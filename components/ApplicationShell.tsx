import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export function OfferCard({ offer, onSelect }: { offer: any; onSelect: (id: string) => void }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-teal-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">{offer.category}</span>
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">Approved</span>
      </div>
      <h3 className="mt-5 text-2xl font-black text-navy">{offer.title}</h3>
      <p className="mt-3 text-slate-600">{offer.description}</p>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Reward</p>
          <p className="mt-2 text-3xl font-black text-navy">{formatCurrency(offer.reward)}</p>
        </div>
        <Link href={`/offers/${offer.id}`} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-200">
          Details
        </Link>
      </div>
      <button onClick={() => onSelect(offer.id)} className="mt-6 w-full rounded-2xl bg-navy px-4 py-3 font-semibold text-white hover:bg-sky-900">
        Mark as completed
      </button>
    </div>
  );
}
