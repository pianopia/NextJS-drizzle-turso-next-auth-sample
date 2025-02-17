'use client'
import Link from 'next/link';
import Header from '@/components/Header';
import { useSession } from "next-auth/react";


export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header session={session} />
      <Link href="/mypage" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        My Page
      </Link>
    </main>
  );
}
