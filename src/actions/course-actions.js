'use server';

import { db } from '@/db';
import { enrollments, lessonProgress, certificates, lessons } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

/**
 * Enroll the current user in a course
 */
export async function enrollInCourse(courseId) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    try {
        const id = uuidv4();
        await db.insert(enrollments).values({
            id,
            userId,
            courseId,
        }).onConflictDoNothing();

        revalidatePath(`/course/${courseId}`);
        revalidatePath('/dashboard');

        return { success: true };
    } catch (error) {
        console.error('Enrollment failed:', error);
        return { success: false, error: 'Failed to enroll' };
    }
}

/**
 * Mark a lesson as complete for the current user
 */
export async function markLessonComplete(courseId, lessonId) {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    try {
        const id = uuidv4();

        // Mark lesson as complete
        await db.insert(lessonProgress).values({
            id,
            userId,
            courseId,
            lessonId,
            completed: true,
            completedAt: new Date(),
        }).onConflictDoUpdate({
            target: [lessonProgress.userId, lessonProgress.courseId, lessonProgress.lessonId],
            set: {
                completed: true,
                completedAt: new Date(),
            }
        });

        // Calculate total progress
        const completed = await db.query.lessonProgress.findMany({
            where: and(
                eq(lessonProgress.userId, userId),
                eq(lessonProgress.courseId, courseId),
                eq(lessonProgress.completed, true)
            ),
        });

        const totalLessons = await db.query.lessons.findMany({
            where: eq(lessons.courseId, courseId),
        });

        const percentage = totalLessons.length > 0
            ? Math.round((completed.length / totalLessons.length) * 100)
            : 0;

        // Auto-generate certificate if 100%
        if (percentage === 100) {
            const certId = uuidv4();
            await db.insert(certificates).values({
                id: certId,
                userId,
                courseId,
                progressPercentage: 100,
            }).onConflictDoNothing();
        }

        revalidatePath(`/course/${courseId}`);

        return {
            success: true,
            percentage,
            completedCount: completed.length,
            totalLessons: totalLessons.length,
            isFinished: percentage === 100
        };
    } catch (error) {
        console.error('Progress update failed:', error);
        return { success: false, error: 'Failed to update progress' };
    }
}
