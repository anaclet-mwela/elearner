import { notFound } from 'next/navigation';
import CourseContent from './CourseContent';
import { getCourseById } from '@/queries/course-queries';

export default async function CoursePage({ params }) {
    const { id } = await params;
    const course = await getCourseById(id);

    if (!course) {
        notFound();
    }

    return (
        <CourseContent course={course} id={id} />
    );
}
