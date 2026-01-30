'use client';

import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

export default function CertificateModal({ course, user, date, onClose }) {
    const { displayLanguage } = useSettings();
    const { t } = useTranslation(displayLanguage);

    const formattedDate = new Date(date).toLocaleDateString(displayLanguage === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const courseTitle = displayLanguage === 'fr' ? course.titleFr : course.titleEn;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden relative animate-in zoom-in duration-300">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600"></div>

                <div className="p-12 text-center">
                    <div className="text-7xl mb-8 animate-bounce">🏆</div>

                    <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                        {t('course.congratulations')}!
                    </h2>

                    <p className="text-xl text-slate-500 mb-12">
                        {displayLanguage === 'fr'
                            ? "Vous avez brillamment terminé ce module."
                            : "You have successfully completed this module."}
                    </p>

                    {/* Certificate Preview Card */}
                    <div className="bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-10 mb-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            {course.icon}
                        </div>

                        <div className="relative z-10">
                            <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
                                Certificate of Completion
                            </div>

                            <div className="text-2xl font-black text-slate-900 mb-2">
                                {user?.name}
                            </div>

                            <div className="w-12 h-0.5 bg-slate-200 mx-auto mb-4"></div>

                            <div className="text-lg text-slate-600 mb-6">
                                {displayLanguage === 'fr' ? 'pour le module' : 'for completing'}
                                <br />
                                <span className="font-bold text-slate-900">{courseTitle}</span>
                            </div>

                            <div className="text-sm text-slate-400 font-medium">
                                {formattedDate}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={onClose}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-2xl w-full transition-all shadow-lg shadow-blue-500/30 active:scale-95 text-lg"
                        >
                            {t('course.backToCourse')}
                        </button>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors font-bold"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
