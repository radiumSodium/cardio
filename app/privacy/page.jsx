export const metadata = {
  title: "Privacy Policy - Care.xyz",
  description: "How we protect your data at Care.xyz.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-10">Privacy Policy</h1>
      <div className="glass p-10 rounded-2xl border border-white/10 space-y-8 text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">1. Information We Collect</h2>
          <p>
            To provide our services, we collect personal information such as your name, email address, phone number, 
            and details about the care you require. For caretakers, we also collect professional certifications 
            and identification documents for verification.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-pink-400">2. How We Use Your Information</h2>
          <p>
            Your information is used solely to facilitate the booking process, verify identities, 
            process payments via Stripe, and improve the quality of our service. We do not sell 
            your personal data to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-400">3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information. 
            All financial transactions are handled through Stripe's secure infrastructure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@care.xyz.
          </p>
        </section>
      </div>
    </div>
  );
}
