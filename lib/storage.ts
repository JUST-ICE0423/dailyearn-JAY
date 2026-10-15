'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '@/lib/storage';

export function ApplicationShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-800">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container-shell flex items-center justify-between gap-3 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-900 to-teal-500 text-lg font-black text-white">J</div>
            <div>
              <p className="text-lg font-black text-navy">DailyEarn</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">with JAY</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
            <Link href="/">Home</Link>
            <Link href="/offers">Offers</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/ledger">Ledger</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/support">Support</Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 sm:inline-block">{user.name}</span>
                <button onClick={logout} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300">
                  Login
                </Link>
                <Link href="/register" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-sky-900">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div>{children}</div>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="container-shell grid gap-6 py-10 text-sm text-slate-600 md:grid-cols-4">
          <div>
            <p className="text-lg font-black text-navy">DailyEarn</p>
            <p className="mt-2">A lawful South African rewards prototype built for testing.</p>
          </div>
          <div>
            <p className="font-bold text-navy">Company</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-navy">Resources</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/offers">Offers</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-navy">Important</p>
            <ul className="mt-3 space-y-2">
              <li>No deposit required</li>
              <li>No token required</li>
              <li>Rates shown in ZAR</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
