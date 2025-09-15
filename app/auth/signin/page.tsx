"use client";
import AuthButtons from "../../../app/components/AuthButtons";
export default function SignIn(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
        <AuthButtons />
      </div>
    </div>
  )
}
