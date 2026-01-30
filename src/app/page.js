'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { courses, packages } from '@/data/courses';
import CourseCard from '@/components/CourseCard/CourseCard';

export default function LandingPage() {
  const { user, loading, buyPackage } = useAuth();
  const router = useRouter();

  if (loading) return null;

  return (
    <div className="min-h-screen bg-white font-Segoe overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight cursor-default">
            e<span className="text-blue-600">Learner</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 uppercase tracking-widest">
            <a href="#courses" className="hover:text-blue-600 transition-colors">Courses</a>
            <a href="#bundles" className="hover:text-blue-600 transition-colors">Bundles</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">How it works</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard" className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all">
                My Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-blue-600 px-4 py-2 transition-colors">
                  Log In
                </Link>
                <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                  Join Free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[13px] font-black mb-8 animate-fade-in shadow-sm border border-blue-100 uppercase tracking-widest">
            ✨ One-Time Purchase • Lifetime Access
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] mb-8 max-w-5xl tracking-tighter">
            Master the digital world with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Pure Interactive Logic.</span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mb-12 font-medium leading-relaxed">
            Pixel-perfect simulators for Windows 11 and Microsoft Office. Buy once, learn at your own pace, and keep your skills forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center px-4">
            <Link href="#bundles" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/30 transition-all scale-100 hover:scale-[1.02] active:scale-95 text-center">
              Get the Office Bundle
            </Link>
            <Link href="#courses" className="bg-white border-2 border-slate-200 hover:border-slate-300 px-10 py-5 rounded-2xl text-lg font-bold text-slate-700 transition-all text-center">
              Browse Individual Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses Grid */}
      <section id="courses" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">Featured Courses</h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">Targeted learning sessions for specific tools. Pick what you need, own it forever.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} isEnrolled={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundles / Pricing Section */}
      <section id="bundles" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-sm">Packages</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 tracking-tight">Save big with Bundles</h2>
          </div>

          <div className="flex justify-center">
            {packages.map((pkg) => (
              <div key={pkg.id} className="w-full max-w-2xl bg-slate-900 rounded-[40px] p-12 text-white relative shadow-2xl shadow-blue-900/20 group">
                <div className="absolute top-0 right-0 p-8">
                  <span className="bg-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">Best Value</span>
                </div>

                <h3 className="text-3xl font-black mb-4">{pkg.title}</h3>
                <p className="text-slate-400 mb-8 text-lg font-medium">{pkg.description}</p>

                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-5xl font-black text-white">${pkg.price}</span>
                  <span className="text-slate-500 line-through text-xl font-bold">$89.97</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {pkg.courseIds.map(cid => {
                    const c = courses.find(item => item.id === cid);
                    return c ? (
                      <div key={cid} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <span className="text-2xl">{c.icon}</span>
                        <span className="font-bold text-sm">{c.title}</span>
                      </div>
                    ) : null;
                  })}
                </div>

                <button
                  onClick={() => buyPackage(pkg)}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xl font-black transition-all shadow-xl shadow-blue-600/30 group-hover:scale-[1.02]"
                >
                  Buy the Package Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 flex flex-col items-center bg-slate-50">
        <div className="text-2xl font-black tracking-tight mb-8">
          Win<span className="text-blue-600">Tutor</span>
        </div>
        <p className="text-slate-300 text-xs font-semibold">&copy; 2026 WinTutor Learning Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}
