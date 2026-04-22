'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

export default function HeaderNav() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <nav className="flex gap-4 text-sm items-center">
      <Link href="/articles" className="hover:underline">기사</Link>
      <Link href="/bookmarks" className="hover:underline">북마크</Link>
      {ready && (
        user ? (
          <button onClick={handleLogout} className="hover:underline">
            로그아웃
          </button>
        ) : (
          <Link href="/login" className="hover:underline">로그인</Link>
        )
      )}
    </nav>
  );
}
