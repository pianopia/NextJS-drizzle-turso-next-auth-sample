"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Mypage() {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Not signed in</p>;
  }

  return (
    <div>
      <h1>Mypage</h1>
      <p>Welcome, {session.user?.name}</p>
      <button
        onClick={() => signOut()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}