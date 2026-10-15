'use client';

import { ApplicationShell } from '@/components/ApplicationShell';

export default function PrivacyPage() {
  return (
    <ApplicationShell>
      <section className="container-shell py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Privacy policy</p>
          <h1 className="mt-3 text-4xl font-black text-navy">How DailyEarn with JAY handles personal information.</h1>

          <div className="mt-8 space-y-6 text-slate-600">
            <p>DailyEarn with JAY is a prototype application for testing user flows, reward tracking, and payout review scenarios. We collect only the information needed to create an account, process reward tasks, and support account management.</p>
            <p>We process personal information such as your name, email address, account activity, reward history, and payout request data. We do not require a crypto wallet, token purchase, or deposit to use the MVP.</p>
            <p>Information is used to provide access to the service, verify account ownership, review reward applications, maintain a fair ledger of pending and confirmed rewards, and support user inquiries.</p>
            <p>We do not sell personal data. We retain only the minimum necessary records for testing and account support, and we provide straightforward options to update or delete your account data in a production implementation.</p>
            <p>For a live product, compliance with South African data-protection requirements and privacy regulations would be handled in consultation with legal and security advisors.</p>
          </div>
        </div>
      </section>
    </ApplicationShell>
  );
}
