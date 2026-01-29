'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CourseCard from '@/components/CourseCard/CourseCard';
import { courses } from '@/data/courses';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/translations';
import Settings from '@/components/Settings/Settings';
import { UserButton } from '@clerk/nextjs';

export default function Dashboard() {
    const [showSettings, setShowSettings] = useState(false);
    const { displayLanguage } = useSettings();
    const { user, loading } = useAuth();
    const { t } = useTranslation(displayLanguage);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const purchasedCourses = courses.filter(c => user.purchasedCourses.includes(c.id));
    const otherCourses = courses.filter(c => !user.purchasedCourses.includes(c.id));

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col sticky top-0 h-screen z-40">
                <div className="p-8">
                    <h1 className="text-2xl font-black tracking-tight cursor-pointer" onClick={() => router.push('/')}>
                        Win<span className="text-blue-600">Tutor</span>
                    </h1>
                </div>

                <nav className="flex-grow px-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-bold transition-all">
                        <span>📊</span> My Dashboard
                    </a>
                    <a href="#browse" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold transition-all">
                        <span>📚</span> Browse Library
                    </a>
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold transition-all"
                    >
                        <span>⚙️</span> Settings
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="py-4 px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            {/* Mobile Logo */}
                            <h1 className="text-xl font-black tracking-tight md:hidden cursor-pointer" onClick={() => router.push('/')}>
                                W<span className="text-blue-600">T</span>
                            </h1>
                            <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Lifetime Access</p>
                            </div>
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "w-10 h-10 border border-slate-200 dark:border-slate-700 shadow-sm"
                                    }
                                }}
                                afterSignOutUrl="/"
                            />
                        </div>
                    </div>
                </header>

                <div className="flex-grow max-w-6xl mx-auto w-full py-12 px-6">
                    {/* Welcome Section */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic">Your lifetime library is ready for you.</p>
                    </div>

                    {/* My Courses */}
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl">🎓</span>
                                My Purchased Courses
                            </h3>
                            <span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full">
                                {purchasedCourses.length} OWNED
                            </span>
                        </div>

                        {purchasedCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {purchasedCourses.map((course) => (
                                    <CourseCard key={course.id} {...course} isEnrolled={true} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No courses owned yet</h4>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">Explore our library and unlock your potential!</p>
                                <a href="#browse" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all">
                                    Explore Library
                                </a>
                            </div>
                        )}
                    </section>

                    {/* Browse Library */}
                    <section id="browse" className="pt-12 border-t-2 border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-xl">🚀</span>
                                Unlock New Content
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherCourses.map((course) => (
                                <CourseCard key={course.id} {...course} isEnrolled={false} />
                            ))}
                        </div>
                    </section>
                </div>

                <footer className="py-12 px-6 bg-slate-900 text-white">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h2 className="text-2xl font-black mb-1">Win<span className="text-blue-400">Tutor</span></h2>
                            <p className="text-slate-400 text-sm font-medium">Empowering the next generation of power users.</p>
                        </div>
                        <div className="flex gap-8 text-sm font-bold text-slate-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                        <p className="text-slate-500 text-xs font-semibold">&copy; 2026 WinTutor Learning Systems.</p>
                    </div>
                </footer>
            </main>

            {showSettings && <Settings onClose={() => setShowSettings(false)} />}
        </div>
    );
}
