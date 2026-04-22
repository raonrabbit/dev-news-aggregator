import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import LoginButton from './LoginButton';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) redirect('/articles');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h1 className="text-2xl font-bold">로그인</h1>
      <p className="text-zinc-500 text-sm">Google 계정으로 로그인하세요.</p>
      <LoginButton />
    </div>
  );
}
