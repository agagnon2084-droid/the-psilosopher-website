import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-earth-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mystic-500 to-forest-600 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">P</span>
              </div>
              <span className="font-serif font-bold text-xl text-white">The Psilosopher</span>
            </div>
            <p className="text-sm leading-relaxed text-earth-400">Honest, grounded psychedelic education and integration support.</p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white mb-4">Explore</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/about" className="hover:text-gold-400 transition-colors">About</Link>
              <Link href="/blog" className="hover:text-gold-400 transition-colors">Blog</Link>
              <Link href="/resources" className="hover:text-gold-400 transition-colors">Resources</Link>
              <Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white mb-4">Topics</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/blog" className="hover:text-gold-400 transition-colors">Neuroscience</Link>
              <Link href="/blog" className="hover:text-gold-400 transition-colors">Integration</Link>
              <Link href="/blog" className="hover:text-gold-400 transition-colors">History &amp; Culture</Link>
              <Link href="/blog" className="hover:text-gold-400 transition-colors">Wellness Practices</Link>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white mb-4">Connect</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="hover:text-gold-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-gold-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-gold-400 transition-colors">TikTok</a>
              <a href="#" className="hover:text-gold-400 transition-colors">X (Twitter)</a>
            </div>
          </div>
        </div>

        <div className="border-t border-earth-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-earth-500">&copy; 2026 The Psilosopher. All rights reserved.</p>
          <p className="text-xs text-earth-600">Educational content only. Not medical advice. Always consult a healthcare professional.</p>
        </div>
      </div>
    </footer>
  );
}
