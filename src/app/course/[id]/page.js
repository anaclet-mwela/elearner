import { courses } from '@/data/courses';
import { notFound } from 'next/navigation';
import CourseContent from './CourseContent';

export default async function CoursePage({ params }) {
    const { id } = await params;
    const course = courses.find(c => c.id === id);

    if (!course) {
        notFound();
    }

    return (
        <CourseContent course={course} id={id} />
    );
}
