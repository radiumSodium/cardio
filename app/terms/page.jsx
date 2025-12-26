export const metadata = {
  title: "Terms of Service - Care.xyz",
  description: "Platform terms and conditions for Care.xyz.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-10">Terms of Service</h1>
      <div className="glass p-10 rounded-2xl border border-white/10 space-y-8 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">1. Acceptance of Terms</h2>
          <p>
            By using Care.xyz, you agree to comply with and be bound by these Terms of Service. 
            If you do not agree, please do not use our platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-pink-400">2. Platform Role</h2>
          <p>
            Care.xyz is a platform that connects users with independent caregivers. We facilitate 
            the introduction and payment processing but do not directly employ the caretakers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-400">3. User Obligations</h2>
          <p>
            Users agree to provide accurate information and to use the service for its intended 
            purpose of finding caregiving support. Any misuse of the platform may result in termination of access.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">4. Payments & Refunds</h2>
          <p>
            All payments are processed securely through Stripe. Refunds are handled in accordance 
            with our cancellation policy as stated during the booking process.
          </p>
        </section>
      </div>
    </div>
  );
}
