import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../lib/auth';
import SignInForm from '../../../components/SignInForm';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/user');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido a IBERO</h1>
            <p className="text-gray-600">Inicia sesión para acceder a tu cuenta</p>
          </div>

          <SignInForm />
        </div>
      </div>
    </div>
  );
}