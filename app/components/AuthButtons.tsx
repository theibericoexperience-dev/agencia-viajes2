"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons(){
  const { data: session } = useSession();
  if(session) return (
    <div>
      <span className="mr-3">{session.user?.name}</span>
      <button onClick={() => signOut()} className="px-3 py-1 bg-red-600 text-white rounded">Cerrar sesión</button>
    </div>
  );

  return (
    <div className="flex gap-3">
      <button onClick={() => signIn("google")} className="px-3 py-1 bg-blue-600 text-white rounded">Entrar con Google</button>
      <button onClick={() => signIn("facebook")} className="px-3 py-1 bg-blue-800 text-white rounded">Entrar con Facebook</button>
    </div>
  )
}
