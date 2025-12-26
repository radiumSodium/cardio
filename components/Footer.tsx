export default function Footer() {
  return (
    <footer className="glass border-t border-white/10 mt-20 py-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 mb-4">
          Care.xyz
        </h2>
        <p className="text-gray-400 mb-6">Making caregiving easy, secure, and accessible for everyone.</p>
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Care.xyz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
