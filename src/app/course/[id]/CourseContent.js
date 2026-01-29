"use client";

import { useState } from 'react';
import LessonPlayer from '@/components/LessonPlayer/LessonPlayer';
import SimulatorShell from '@/components/SimulatorShell/SimulatorShell';
import Win11 from '@/components/Simulators/Win11/Win11';
import Word from '@/components/Simulators/Word/Word';
import CourseOverview from '@/components/CourseOverview/CourseOverview';
import { useSettings } from '@/contexts/SettingsContext';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function CourseContent({ course, id }) {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const { displayLanguage } = useSettings();
    const { user, loading } = useAuth();
    const router = useRouter();

    // Authentication and Enrollment Protection
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        router.push('/login');
        return null;
    }

    if (!user.purchasedCourses.includes(id)) {
        router.push('/dashboard');
        return null;
    }

    const getLocalizedContent = (content) => {
        if (typeof content === 'object' && content !== null) {
            return content[displayLanguage] || content['en'];
        }
        return content;
    };

    if (!selectedLesson) {
        return (
            <CourseOverview
                course={course}
                onSelectLesson={setSelectedLesson}
            />
        );
    }

    return (
        <LessonPlayer
            course={course}
            lesson={selectedLesson}
            onBackToCourse={() => setSelectedLesson(null)}
        >
            {({ handleAction, currentStep, highlightType }) => {
                if (id === 'windows-11') {
                    return (
                        <SimulatorShell title="Windows 11 Desktop">
                            <Win11 onAction={handleAction} currentStep={currentStep} highlightType={highlightType} />
                        </SimulatorShell>
                    );
                }
                if (id === 'word') {
                    return (
                        <SimulatorShell title="Microsoft Word">
                            <Word onAction={handleAction} currentStep={currentStep} highlightType={highlightType} />
                        </SimulatorShell>
                    );
                }
                const localizedTitle = getLocalizedContent(course.title);
                return (
                    <div className="p-12 text-center flex flex-col items-center justify-center h-full gap-4 text-slate-800">
                        <h2 className="text-3xl font-bold">{localizedTitle} Simulator</h2>
                        <p className="text-slate-500 max-w-md">
                            Interactive content for {localizedTitle} is being prepared. Follow the "Windows 11 Basics" module for the full experience.
                        </p>
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl">
                            ⏳
                        </div>
                    </div>
                );
            }}
        </LessonPlayer>
    );
}
