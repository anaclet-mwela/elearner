import { db } from './index';
import { courses as coursesTable, lessons as lessonsTable } from './schema';
import { courses as staticCourses } from '../data/courses';

async function seed() {
    console.log('🌱 Starting course seeding...');

    try {
        for (const course of staticCourses) {
            console.log(`Processing course: ${course.id}`);

            const titleEn = typeof course.title === 'string' ? course.title : course.title.en;
            const titleFr = typeof course.title === 'string' ? course.title : course.title.fr;
            const descEn = typeof course.description === 'string' ? course.description : course.description.en;
            const descFr = typeof course.description === 'string' ? course.description : course.description.fr;

            // Insert Course
            await db.insert(coursesTable).values({
                id: course.id,
                titleEn: titleEn,
                titleFr: titleFr,
                descriptionEn: descEn,
                descriptionFr: descFr,
                icon: course.icon,
                color: course.color,
                price: course.price.toString(),
            }).onConflictDoUpdate({
                target: coursesTable.id,
                set: {
                    titleEn: titleEn,
                    titleFr: titleFr,
                    descriptionEn: descEn,
                    descriptionFr: descFr,
                    icon: course.icon,
                    color: course.color,
                    price: course.price.toString(),
                    updatedAt: new Date(),
                },
            });

            // Insert Lessons
            let order = 0;
            for (const lesson of course.lessons) {
                const lessonId = `${course.id}-${lesson.id}`;
                console.log(`  Processing lesson: ${lessonId}`);

                await db.insert(lessonsTable).values({
                    id: lessonId,
                    courseId: course.id,
                    lessonId: lesson.id,
                    titleEn: typeof lesson.title === 'string' ? lesson.title : lesson.title.en,
                    titleFr: typeof lesson.title === 'string' ? lesson.title : lesson.title.fr,
                    descriptionEn: typeof lesson.description === 'string' ? lesson.description : lesson.description.en,
                    descriptionFr: typeof lesson.description === 'string' ? lesson.description : lesson.description.fr,
                    durationEn: typeof lesson.duration === 'string' ? lesson.duration : lesson.duration.en,
                    durationFr: typeof lesson.duration === 'string' ? lesson.duration : lesson.duration.fr,
                    order: order++,
                    steps: lesson.steps,
                }).onConflictDoUpdate({
                    target: lessonsTable.id,
                    set: {
                        titleEn: typeof lesson.title === 'string' ? lesson.title : lesson.title.en,
                        titleFr: typeof lesson.title === 'string' ? lesson.title : lesson.title.fr,
                        descriptionEn: typeof lesson.description === 'string' ? lesson.description : lesson.description.en,
                        descriptionFr: typeof lesson.description === 'string' ? lesson.description : lesson.description.fr,
                        durationEn: typeof lesson.duration === 'string' ? lesson.duration : lesson.duration.en,
                        durationFr: typeof lesson.duration === 'string' ? lesson.duration : lesson.duration.fr,
                        order: order - 1,
                        steps: lesson.steps,
                        updatedAt: new Date(),
                    },
                });
            }
        }

        console.log('✅ Seeding completed successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        process.exit();
    }
}

seed();
