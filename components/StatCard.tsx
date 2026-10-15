'use client';

import { useState } from 'react';
import { ApplicationShell } from '@/components/ApplicationShell';
import { getAppState, saveAppState } from '@/lib/storage';

export default function SupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const sendSupportRequest = (event: React.FormEvent) => {
    event.preventDefault();
    const appState = getAppState();
    const supportRequest = {
      id: `support-${Date.now()}`,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    saveAppState({ ...appState, supportMessages: [supportRequest, ...appState.supportMessages] });
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <ApplicationShell>
      <section className="container-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-navy p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-200">Support</p>
            <h1 className="mt-3 text-4xl font-black">Need help with your account?</h1>
            <p className="mt-5 text-slate-200">We can help with rewards questions, payout review, account issues, or app feedback.</p>
            <div className="mt-8 space-y-4 text-slate-200">
              <p>• Email: support@dailyearn.co.za</p>
              <p>• Response target: 24-48 hours</p>
              <p>• Availability: Mon-Fri</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-navy">Send a message</h2>
            <form className="mt-6 space-y-5" onSubmit={sendSupportRequest}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">How can we help?</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-500" />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-500">
                Send message
              </button>
            </form>
            {sent ? <p className="mt-4 rounded-2xl bg-green-50 p-3 text-sm text-green-700">Your support request has been queued.</p> : null}
          </div>
        </div>
      </section>
    </ApplicationShell>
  );
}
