'use client';

import { use, useState } from 'react';
import { courses } from '@/data/courses';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';

export default function PublicCoursePage({ params }) {
    const { id } = use(params);
    const course = courses.find(c => c.id === id);
    const { displayLanguage } = useSettings();
    const { user, buyCourse } = useAuth();
    const router = useRouter();

    if (!course) {
        notFound();
    }

    const isPurchased = user?.purchasedCourses.includes(id);

    const getLocalizedContent = (content) => {
        if (typeof content === 'object' && content !== null) {
            return content[displayLanguage] || content['en'];
        }
        return content;
    };

    const handleAction = () => {
        if (isPurchased) {
            router.push(`/course/${id}`);
        } else {
            buyCourse(id);
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-Segoe">
            {/* Header */}
            <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black tracking-tight">
                        Win<span className="text-blue-600">Tutor</span>
                    </Link>
                    <div className="flex gap-4">
                        {user ? (
                            <Link href="/dashboard" className="text-sm font-bold text-slate-600 hover:text-blue-600 px-4 py-2">Dashboard</Link>
                        ) : (
                            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 px-4 py-2">Log In</Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="bg-white border-b border-slate-200 py-20 px-6">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm" style={{ color: course.color, backgroundColor: `${course.color}10` }}>
                            {course.icon}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                            {getLocalizedContent(course.title)}
                        </h1>
                        <p className="text-xl text-slate-500 mb-8 font-medium leading-relaxed">
                            {getLocalizedContent(course.description)}
                        </p>

                        <div className="flex items-center gap-6 mb-10">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Lifetime Access</span>
                                <span className="text-3xl font-black text-slate-900">${course.price}</span>
                            </div>
                            <div className="w-[1px] h-10 bg-slate-200" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Content</span>
                                <span className="text-xl font-bold text-slate-700">{course.lessons.length} Interactive Lessons</span>
                            </div>
                        </div>

                        <button
                            onClick={handleAction}
                            className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-black shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            {isPurchased ? 'Start Learning' : 'Unlock Lifetime Access'}
                        </button>
                    </div>

                    <div className="hidden md:block relative">
                        <div className="absolute inset-0 bg-blue-600 rounded-[40px] blur-3xl opacity-10" />
                        <div className="relative bg-slate-900 rounded-[40px] aspect-square flex items-center justify-center p-12 border border-slate-800 shadow-2xl">
                            <div className="text-[120px] filter drop-shadow-2xl animate-float">{course.icon}</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Curriculum */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-sm">📋</span>
                        Course Curriculum
                    </h2>

                    <div className="space-y-4">
                        {course.lessons.map((lesson, idx) => (
                            <div key={lesson.id} className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-200 transition-all shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 font-black text-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        {idx + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{getLocalizedContent(lesson.title)}</h3>
                                        <p className="text-sm text-slate-500">{getLocalizedContent(lesson.duration)} • Interactive Simulator</p>
                                    </div>
                                </div>
                                {!isPurchased && (
                                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase tracking-widest">Locked</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ / Guarantee */}
            <section className="py-20 bg-slate-900 text-white px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-black mb-8">Purchase with confidence</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h3 className="font-bold mb-2">Lifetime Ownership</h3>
                            <p className="text-slate-400 text-sm">No monthly fees. Pay once and the course is yours forever, including all future updates.</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h3 className="font-bold mb-2">Browser Based</h3>
                            <p className="text-slate-400 text-sm">Learn immediately in your browser. No software installation or high-end PC required.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
