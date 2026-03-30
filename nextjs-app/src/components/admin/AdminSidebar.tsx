'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Overview', icon: '◈' },
  { href: '/admin/courses', label: 'Courses', icon: '◎' },
  { href: '/admin/workbooks', label: 'Workbooks', icon: '◇' },
  { href: '/admin/users', label: 'Users', icon: '◉' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-earth-900 text-earth-300 flex flex-col z-50">
      <div className="p-6 border-b border-earth-800">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="The Psilosopher" className="w-8 h-8 rounded-full" />
          <div>
            <h1 className="text-earth-50 font-serif text-lg font-semibold leading-tight">
              Psilosopher
            </h1>
            <p className="text-xs text-earth-500">Admin</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? 'bg-earth-800 text-gold-400'
                : 'hover:bg-earth-800/50 hover:text-earth-100'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-earth-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-sm text-earth-400 hover:text-earth-200 transition-colors"
        >
          ← Back to site
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2 text-sm text-earth-400 hover:text-earth-200 transition-colors w-full text-left mt-1"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
