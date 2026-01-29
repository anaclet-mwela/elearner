import { SignUp } from "@clerk/nextjs";
import Link from 'next/link';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 py-12">
            <div className="mb-10 text-center">
                <Link href="/" className="text-3xl font-black tracking-tight mb-2 inline-block">
                    Win<span className="text-blue-600">Tutor</span>
                </Link>
                <p className="text-slate-500 font-medium italic">Join thousands of students learning computer skills.</p>
            </div>

            <div className="w-full max-w-md flex justify-center">
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm font-bold transition-all',
                            card: 'shadow-2xl border border-slate-200 rounded-3xl',
                            headerTitle: 'text-slate-900 font-black',
                            headerSubtitle: 'text-slate-500 font-medium',
                        }
                    }}
                    routing="path"
                    path="/signup"
                    signInUrl="/login"
                    forceRedirectUrl="/dashboard"
                />
            </div>
        </div>
    );
}
