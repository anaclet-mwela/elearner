'use server';

import { db } from '@/db';
import { courses, lessons, enrollments, lessonProgress, certificates } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

/**
 * Fetch all available courses
 */
export async function getAllCourses() {
    return await db.query.courses.findMany({
        orderBy: (courses, { asc }) => [asc(courses.titleEn)],
    });
}

/**
 * Fetch a single course by ID with its lessons
 */
export async function getCourseById(id) {
    const course = await db.query.courses.findFirst({
        where: eq(courses.id, id),
    });

    if (!course) return null;

    const courseLessons = await db.query.lessons.findMany({
        where: eq(lessons.courseId, id),
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
    });

    return {
        ...course,
        lessons: courseLessons,
    };
}

/**
 * Fetch all enrollments for a user
 */
export async function getUserEnrollments(userId) {
    if (!userId) return [];

    return await db.query.enrollments.findMany({
        where: eq(enrollments.userId, userId),
        with: {
            course: true,
        },
    });
}

export async function getEnrollment(userId, courseId) {
    if (!userId || !courseId) return null;

    const result = await db.query.enrollments.findFirst({
        where: and(
            eq(enrollments.userId, userId),
            eq(enrollments.courseId, courseId)
        ),
    });

    return result ?? null;
}

/**
 * Get user's progress for a specific course
 */
export async function getCourseProgress(userId, courseId) {
    if (!userId || !courseId) return { completedLessons: [], percentage: 0 };

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

    return {
        completedLessons: completed.map(p => p.lessonId),
        percentage,
        totalLessons: totalLessons.length,
        completedCount: completed.length,
    };
}

export async function getUserCertificate(userId, courseId) {
    if (!userId || !courseId) return null;

    const result = await db.query.certificates.findFirst({
        where: and(
            eq(certificates.userId, userId),
            eq(certificates.courseId, courseId)
        ),
    });

    return result ?? null;
}
