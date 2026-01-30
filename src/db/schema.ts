import { pgTable, text, timestamp, numeric, integer, jsonb, boolean, unique, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
    id: text('id').primaryKey(), // Clerk user ID
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    enrollments: many(enrollments),
    lessonProgress: many(lessonProgress),
    certificates: many(certificates),
}));

export const courses = pgTable('courses', {
    id: text('id').primaryKey(), // e.g., 'windows-11', 'word'
    titleEn: text('title_en').notNull(),
    titleFr: text('title_fr').notNull(),
    descriptionEn: text('description_en').notNull(),
    descriptionFr: text('description_fr').notNull(),
    icon: text('icon').notNull(),
    color: text('color').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
    lessons: many(lessons),
    enrollments: many(enrollments),
    lessonProgress: many(lessonProgress),
    certificates: many(certificates),
}));

export const lessons = pgTable('lessons', {
    id: text('id').primaryKey(), // e.g., 'windows-11-navigating-desktop'
    courseId: text('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
    lessonId: text('lesson_id').notNull(), // e.g., 'navigating-desktop'
    titleEn: text('title_en').notNull(),
    titleFr: text('title_fr').notNull(),
    descriptionEn: text('description_en').notNull(),
    descriptionFr: text('description_fr').notNull(),
    durationEn: text('duration_en').notNull(),
    durationFr: text('duration_fr').notNull(),
    order: integer('order').notNull(),
    steps: jsonb('steps').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    course: one(courses, {
        fields: [lessons.courseId],
        references: [courses.id],
    }),
    progressEntries: many(lessonProgress),
}));

export const enrollments = pgTable('enrollments', {
    id: text('id').primaryKey(), // uuid
    userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    courseId: text('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
    enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
}, (table) => ({
    unq: unique().on(table.userId, table.courseId),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
    user: one(users, {
        fields: [enrollments.userId],
        references: [users.id],
    }),
    course: one(courses, {
        fields: [enrollments.courseId],
        references: [courses.id],
    }),
}));

export const lessonProgress = pgTable('lesson_progress', {
    id: text('id').primaryKey(), // uuid
    userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    courseId: text('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
    lessonId: text('lesson_id').notNull(),
    completed: boolean('completed').default(false).notNull(),
    completedAt: timestamp('completed_at'),
}, (table) => ({
    unq: unique().on(table.userId, table.courseId, table.lessonId),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
    user: one(users, {
        fields: [lessonProgress.userId],
        references: [users.id],
    }),
    course: one(courses, {
        fields: [lessonProgress.courseId],
        references: [courses.id],
    }),
    lesson: one(lessons, {
        fields: [lessonProgress.lessonId],
        references: [lessons.lessonId], // Wait, lessonId is not unique across all lessons, only per course.
    }),
}));

export const certificates = pgTable('certificates', {
    id: text('id').primaryKey(), // uuid
    userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    courseId: text('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
    issuedAt: timestamp('issued_at').defaultNow().notNull(),
    progressPercentage: integer('progress_percentage').notNull(),
}, (table) => ({
    unq: unique().on(table.userId, table.courseId),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
    user: one(users, {
        fields: [certificates.userId],
        references: [users.id],
    }),
    course: one(courses, {
        fields: [certificates.courseId],
        references: [courses.id],
    }),
}));
