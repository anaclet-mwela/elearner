'use client';

import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

export default function CourseOverview({ course, onSelectLesson }) {
    const { displayLanguage, completedLessons } = useSettings();
    const { t } = useTranslation(displayLanguage);

    // Helper to get localized content
    const getLocalizedContent = (content) => {
        if (typeof content === 'object' && content !== null) {
            return content[displayLanguage] || content['en'];
        }
        return content;
    };

    const totalLessons = course.lessons?.length || 0;
    // Count lessons in this course that are completed
    const completedCount = course.lessons?.filter(l => completedLessons.includes(l.id)).length || 0;
    const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    const handleLessonClick = (lesson, isLocked) => {
        if (!isLocked) {
            onSelectLesson(lesson);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 md:p-12">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => window.location.href = '/'}
                    className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold group"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                    {t('course.backToDashboard')}
                </button>

                {/* Course Header */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 mb-8">
                    <div className="p-8 md:p-10 border-b border-slate-100">
                        <div className="flex items-start gap-6">
                            <span className="text-6xl p-4 bg-slate-50 rounded-2xl shadow-sm border border-slate-100">
                                {course.icon}
                            </span>
                            <div className="flex-1">
                                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                                    {getLocalizedContent(course.title)}
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                    {getLocalizedContent(course.description)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50/50 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-700 uppercase tracking-wider text-sm">
                                {t('course.yourProgress')}
                            </span>
                            <span className="font-bold text-blue-600">{progress}%</span>
                        </div>
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                            📚
                        </span>
                        {t('course.courseLessons')}
                    </h2>

                    {course.lessons && course.lessons.length > 0 ? (
                        <div className="space-y-4">
                            {course.lessons.map((lesson, index) => {
                                const isCompleted = completedLessons.includes(lesson.id);
                                // Locked if previous lesson not completed (skip for first lesson)
                                const isLocked = index > 0 && !completedLessons.includes(course.lessons[index - 1].id);
                                const isCurrent = !isLocked && !isCompleted;

                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => handleLessonClick(lesson, isLocked)}
                                        disabled={isLocked}
                                        className={`w-full text-left p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 ${isLocked
                                            ? 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-60'
                                            : isCompleted
                                                ? 'bg-emerald-50 border-emerald-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50'
                                                : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isLocked ? 'bg-slate-200 text-slate-500' :
                                                        isCompleted ? 'bg-emerald-100 text-emerald-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {index + 1}
                                                    </span>
                                                    <h3 className={`text-xl font-bold ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>
                                                        {getLocalizedContent(lesson.title)}
                                                    </h3>
                                                    {isCompleted && <span className="text-emerald-500 text-xl">✓</span>}
                                                    {isLocked && <span className="text-slate-400 text-xl">🔒</span>}
                                                </div>
                                                <p className={`${isLocked ? 'text-slate-400' : 'text-slate-600'} ml-11`}>
                                                    {getLocalizedContent(lesson.description)}
                                                </p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className={`text-sm font-semibold mb-2 ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>
                                                    {getLocalizedContent(lesson.duration)}
                                                </div>
                                                {!isLocked && (
                                                    <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${isCompleted
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                                        }`}>
                                                        {isCompleted ? t('course.completed') : t('course.start')}
                                                    </span>
                                                )}
                                                {isLocked && (
                                                    <span className="inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                                        {t('course.locked')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-bold text-slate-600 mb-2">No Lessons Yet</h3>
                            <p className="text-slate-500">Lessons for this course are coming soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
