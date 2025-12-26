import Image from "next/image";

export const metadata = {
  title: "About Us - Care.xyz",
  description: "Learn more about Care.xyz and our mission to provide reliable caregiving services.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 flex flex-col gap-20 bg-slate-950 text-white min-h-screen">
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
            Our Mission & Vision
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            At Care.xyz, we believe that finding quality care should be simple, safe, and dignified. 
            We are dedicated to bridging the gap between compassionate caretakers and families in need.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="glass p-10 rounded-3xl border border-white/10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-white">Why We Started</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Care.xyz was born out of a personal need to find reliable support for our own loved ones. 
              We realized that the traditional ways of finding care were often fragmented, untrusted, and stressful. 
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              We built this platform to ensure that every family has access to verified, professional, 
              and compassionate caregivers, whether for their children, their parents, or specialized medical needs.
            </p>
          </div>
          <div className="flex-1 relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070" 
              alt="Healthcare Professionals" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Safety First",
            desc: "Every caretaker on our platform undergoes a rigorous verification process, including background checks and reference validations.",
            icon: "🛡️"
          },
          {
            title: "Expertise",
            desc: "From newborn specialists to geriatric nurses, our caretakers are skilled professionals with proven track records.",
            icon: "🩺"
          },
          {
            title: "Community",
            desc: "We foster a community based on trust, empathy, and mutual respect between families and care providers.",
            icon: "🤝"
          }
        ].map((item, idx) => (
          <div key={idx} className="glass p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
