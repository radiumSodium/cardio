import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", color: "hover:text-blue-500" },
    { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-blue-400" },
    { icon: FaLinkedin, href: "https://linkedin.com", color: "hover:text-blue-700" },
    { icon: FaInstagram, href: "https://instagram.com", color: "hover:text-pink-500" },
  ];

  return (
    <footer className="glass border-t border-white/10 mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
              Care.xyz
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Making professional caregiving easy, secure, and accessible for families worldwide. Your loved ones deserve the best.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a key={idx} href={social.href} target="_blank" rel="noreferrer" className={`text-gray-500 transition-colors duration-300 ${social.color}`}>
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Services</Link></li>
              <li><Link href="/#about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/#contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-white font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Baby Care</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Elderly Support</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Home Nursing</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Respite Care</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-blue-500" />
                <span>support@care.xyz</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-pink-500" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-purple-500" />
                <span>Dhanmondi, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Care.xyz. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
