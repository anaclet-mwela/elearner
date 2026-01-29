'use client';

import Link from 'next/link';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

import { useAuth } from '@/contexts/AuthContext';

export default function CourseCard({ id, title, description, icon, color, price, lessons = [], isEnrolled: propIsEnrolled }) {
  const { displayLanguage } = useSettings();
  const { user, buyCourse } = useAuth();
  const { t } = useTranslation(displayLanguage);

  const isPurchased = propIsEnrolled ?? user?.purchasedCourses.includes(id);

  const getLocalizedContent = (content) => {
    if (typeof content === 'object' && content !== null) {
      return content[displayLanguage] || content['en'];
    }
    return content;
  };

  const total = lessons.length;

  const CardContent = (
    <div className="relative z-10">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300 bg-slate-50 dark:bg-slate-800"
        style={{ color: color }}
      >
        {icon}
      </div>

      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {getLocalizedContent(title)}
        </h3>
        {!isPurchased && price && (
          <span className="bg-blue-100 text-blue-700 text-xs font-black px-2 py-1 rounded uppercase tracking-tighter">
            ${price}
          </span>
        )}
      </div>

      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 h-20 overflow-hidden">
        {getLocalizedContent(description)}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          {total} Lessons
        </span>

        {isPurchased ? (
          <span className="flex items-center gap-2 text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
            {t('course.start')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        ) : (
          <Link
            href={`/courses/${id}`}
            className="px-6 py-2 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-md group-hover:scale-105"
          >
            Learn More
          </Link>
        )}
      </div>
    </div>
  );

  const cardClassName = "block group relative bg-white dark:bg-slate-900 rounded-3xl p-8 border hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 overflow-hidden w-full text-left";

  if (isPurchased) {
    return (
      <Link href={`/course/${id}`} className={cardClassName}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundColor: color }} />
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={cardClassName}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundColor: color }} />
      {CardContent}
    </div>
  );
}
