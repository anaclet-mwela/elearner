"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LessonPlayer from '@/components/LessonPlayer/LessonPlayer';
import SimulatorShell from '@/components/SimulatorShell/SimulatorShell';
import Win11 from '@/components/Simulators/Win11/Win11';
import Word from '@/components/Simulators/Word/Word';
import CourseOverview from '@/components/CourseOverview/CourseOverview';
import { useSettings } from '@/contexts/SettingsContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getEnrollment, getCourseProgress } from '@/queries/course-queries';
import { enrollInCourse } from '@/actions/course-actions';

export default function CourseContent({ course, id }) {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const { displayLanguage } = useSettings();
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const queryClient = useQueryClient();

    // Fetch Enrollment Status
    const { data: enrollment, isLoading: enrollmentLoading } = useQuery({
        queryKey: ['enrollment', user?.id, id],
        queryFn: () => getEnrollment(user?.id, id),
        enabled: !!user?.id,
    });

    // Fetch Progress
    const { data: progress, isLoading: progressLoading } = useQuery({
        queryKey: ['progress', user?.id, id],
        queryFn: () => getCourseProgress(user?.id, id),
        enabled: !!user?.id,
    });

    // Enrollment Mutation
    const enrollMutation = useMutation({
        mutationFn: () => enrollInCourse(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['enrollment', user?.id, id] });
        },
    });

    if (authLoading || enrollmentLoading || progressLoading) {
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

    const getLocalizedContent = (content) => {
        if (typeof content === 'object' && content !== null) {
            return content[displayLanguage] || content['en'];
        }
        return content;
    };

    // If not enrolled, show course overview with enrollment option
    if (!enrollment) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-6">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 text-center">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
                        {course.icon}
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-4">
                        {displayLanguage === 'fr' ? course.titleFr : course.titleEn}
                    </h1>
                    <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                        {displayLanguage === 'fr' ? course.descriptionFr : course.descriptionEn}
                    </p>
                    <button
                        onClick={() => enrollMutation.mutate()}
                        disabled={enrollMutation.isPending}
                        className="bg-blue-600 text-white font-bold py-4 px-12 rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                        {enrollMutation.isPending ? 'Enrolling...' : 'Enroll in Course'}
                    </button>
                    {enrollMutation.isError && (
                        <p className="text-red-500 mt-4">Failed to enroll. Please try again.</p>
                    )}
                </div>
            </div>
        );
    }

    if (!selectedLesson) {
        return (
            <CourseOverview
                course={course}
                onSelectLesson={setSelectedLesson}
                progress={progress}
            />
        );
    }

    return (
        <LessonPlayer
            course={course}
            lesson={selectedLesson}
            onBackToCourse={() => setSelectedLesson(null)}
            progress={progress}
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
                const localizedTitle = displayLanguage === 'fr' ? course.titleFr : course.titleEn;
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
