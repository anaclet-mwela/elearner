'use client';

import { useState, useEffect, useRef } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

export default function LessonPlayer({ course, lesson, children, onBackToCourse }) {
    const { settings, updateSettings, completeLesson, displayLanguage, narrationLanguage, narratorVoice, isVoiceOverEnabled } = useSettings();
    const { t } = useTranslation(displayLanguage);

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Quiz State
    const [quizState, setQuizState] = useState({
        currentQuestionIndex: 0,
        score: 0,
        showResults: false,
        selectedOption: null,
        isAnswered: false
    });

    const speechSynthesisRef = useRef(null);
    const autoAdvanceTimer = useRef(null);

    const currentStep = lesson.steps[currentStepIndex];
    const progress = Math.round(((currentStepIndex + (isCompleted ? 1 : 0)) / lesson.steps.length) * 100);

    const getLocalizedContent = (content, lang = displayLanguage) => {
        if (typeof content === 'object' && content !== null) {
            return content[lang] || content['en'];
        }
        return content;
    };

    // Voice-over functions
    const speak = (text) => {
        if (!isVoiceOverEnabled || !text) return;

        // Stop any ongoing speech
        if (speechSynthesisRef.current) {
            window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = narrationLanguage === 'fr' ? 'fr-FR' : 'en-US';

        // Find and use selected voice if not default
        if (narratorVoice !== 'default') {
            const voices = window.speechSynthesis.getVoices();
            const selectedVoice = voices.find(v => v.name === narratorVoice);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
        }

        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        if (speechSynthesisRef.current) {
            window.speechSynthesis.cancel();
            speechSynthesisRef.current = null;
        }
    };

    const handleQuizOptionSelect = (option) => {
        if (quizState.isAnswered) return;

        const isCorrect = option.isCorrect;
        setQuizState(prev => ({
            ...prev,
            selectedOption: option.id,
            isAnswered: true,
            score: isCorrect ? prev.score + 1 : prev.score
        }));

        const feedbackMsg = isCorrect ? t('course.correct') : t('course.notQuite');
        speak(feedbackMsg);
    };

    const handleNextQuestion = () => {
        const questions = currentStep.questions;
        if (quizState.currentQuestionIndex < questions.length - 1) {
            setQuizState(prev => ({
                ...prev,
                currentQuestionIndex: prev.currentQuestionIndex + 1,
                selectedOption: null,
                isAnswered: false
            }));
        } else {
            setQuizState(prev => ({ ...prev, showResults: true }));
            completeLesson(lesson.id);
        }
    };

    const handleNext = () => {
        stopSpeaking();
        if (autoAdvanceTimer.current) {
            clearTimeout(autoAdvanceTimer.current);
            autoAdvanceTimer.current = null;
        }
        setFeedback(null);
        if (currentStepIndex < lesson.steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const handleAction = (action, targetId) => {
        if (isCompleted || currentStep.type === 'overview') return;

        if (action === currentStep.action && targetId === currentStep.targetId) {
            const explanation = getLocalizedContent(currentStep.afterExplanation, narrationLanguage);
            setFeedback({
                type: 'success',
                message: t('course.correct'),
                explanation: currentStep.afterExplanation
            });

            // Calculate delay based on explanation length (approx 80ms per character) or min 6 seconds
            const textLength = explanation ? explanation.length : 0;
            const delay = Math.max(6000, textLength * 80);

            // Auto-advance after delay
            autoAdvanceTimer.current = setTimeout(() => {
                handleNext();
            }, delay);
        } else {
            setFeedback({
                type: 'error',
                message: t('course.notQuite'),
                explanation: t('course.tryAgain')
            });
            setTimeout(() => setFeedback(null), 3500);
        }
    };

    const handleRestart = () => {
        setCurrentStepIndex(0);
        setIsCompleted(false);
        setFeedback(null);
        if (autoAdvanceTimer.current) {
            clearTimeout(autoAdvanceTimer.current);
            autoAdvanceTimer.current = null;
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
            setFeedback(null);
        }
    };

    // Voice-over effect: Read content when step changes or voice-over is enabled
    useEffect(() => {
        if (!isVoiceOverEnabled || currentStep.type === 'overview') return;

        // Read the educational content for the new step
        let textToRead = '';
        const instruction = getLocalizedContent(currentStep.instruction, narrationLanguage);
        const explanation = getLocalizedContent(currentStep.beforeExplanation, narrationLanguage);

        if (explanation) {
            textToRead += explanation + ' ';
        }

        if (instruction) {
            textToRead += instruction;
        }

        if (textToRead) {
            // Small delay to let the UI render first
            setTimeout(() => speak(textToRead), 300);
        }
    }, [currentStepIndex, isVoiceOverEnabled, narrationLanguage]);

    // Voice-over effect: Read feedback explanations
    useEffect(() => {
        if (!isVoiceOverEnabled || !feedback?.explanation) return;
        const explanation = getLocalizedContent(feedback.explanation, narrationLanguage);
        if (explanation) {
            setTimeout(() => speak(explanation), 500);
        }
    }, [feedback, isVoiceOverEnabled, narrationLanguage]);

    // Cleanup: Stop speech when component unmounts or lesson changes
    useEffect(() => {
        return () => {
            stopSpeaking();
        };
    }, []);

    // Overview Step UI
    if (currentStep.type === 'overview') {
        const objectives = getLocalizedContent(currentStep.objectives) || [];
        return (
            <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-white font-sans">
                <div className="w-full max-w-4xl mx-auto p-12 py-16">
                    <button
                        onClick={onBackToCourse}
                        className="mb-8 px-4 py-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors flex items-center gap-2 group"
                    >
                        <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                        {t('course.backToCourse')}
                    </button>

                    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-12 md:p-16">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                                <span>{t('course.lessonOverview')}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                {getLocalizedContent(currentStep.title)}
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                {getLocalizedContent(currentStep.content)}
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                                    🎯
                                </span>
                                {t('course.whatYouLearn')}
                            </h2>
                            <ul className="space-y-4">
                                {objectives.map((objective, index) => (
                                    <li key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                                            {index + 1}
                                        </span>
                                        <p className="text-lg text-slate-700 pt-1">{objective}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98]"
                        >
                            {t('course.startLesson')} →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Quiz Step UI
    if (currentStep.type === 'quiz') {
        const questions = currentStep.questions || [];
        const currentQuestion = questions[quizState.currentQuestionIndex];

        if (quizState.showResults) {
            const passed = quizState.score >= questions.length * 0.5; // 50% pass rate
            return (
                <div className="h-screen overflow-y-auto bg-gradient-to-br from-indigo-900 to-slate-900 font-sans flex items-center justify-center p-8">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center animate-in zoom-in duration-300">
                        <div className="text-6xl mb-6">{passed ? '🏆' : '📚'}</div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4">
                            {passed ? t('course.congratulations') : t('course.lessonComplete')}
                        </h2>
                        <p className="text-xl text-slate-600 mb-8">
                            You scored {quizState.score} out of {questions.length} correct!
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={onBackToCourse}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                {t('course.backToCourse')}
                            </button>
                            <button
                                onClick={handleRestart}
                                className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-lg transition-all"
                            >
                                {t('course.restartLesson')}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="h-screen overflow-y-auto bg-gradient-to-br from-indigo-50 to-blue-50 font-sans flex flex-col">
                {/* Header */}
                <div className="p-8 flex justify-between items-center max-w-5xl mx-auto w-full">
                    <button onClick={onBackToCourse} className="text-slate-500 hover:text-slate-800 font-bold transition-colors">
                        ← {t('course.backToCourse')}
                    </button>
                    <div className="text-slate-600 font-bold">
                        Question {quizState.currentQuestionIndex + 1} of {questions.length}
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-3xl">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                            <div className="p-10 border-b border-slate-100">
                                <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                                    {getLocalizedContent(currentQuestion.text)}
                                </h1>
                            </div>
                            <div className="p-8 bg-slate-50 grid gap-4">
                                {currentQuestion.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleQuizOptionSelect(option)}
                                        disabled={quizState.isAnswered}
                                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group
                                            ${quizState.selectedOption === option.id
                                                ? (option.isCorrect
                                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                                    : 'bg-rose-50 border-rose-500 text-rose-800')
                                                : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                                            }
                                            ${quizState.isAnswered && option.isCorrect && quizState.selectedOption !== option.id
                                                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200'
                                                : ''
                                            }
                                        `}
                                    >
                                        <span className="text-lg font-medium">
                                            {getLocalizedContent(option.text)}
                                        </span>
                                        {quizState.selectedOption === option.id && (
                                            <span className="text-2xl">
                                                {option.isCorrect ? '✓' : '✗'}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Footer Actions */}
                            {quizState.isAnswered && (
                                <div className="p-8 bg-white border-t border-slate-200 flex justify-end animate-in slide-in-from-bottom-2">
                                    <button
                                        onClick={handleNextQuestion}
                                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {quizState.currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz 🏆'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Interactive Step UI
    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 font-sans">
            {/* Polished Sidebar */}
            {!isFullscreen && (
                <aside className="w-96 flex-shrink-0 bg-gradient-to-br from-white via-white to-slate-50 border-r border-slate-200 flex flex-col shadow-2xl relative">
                    {/* Header */}
                    <div className="p-8 border-b border-slate-200 bg-white">
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={onBackToCourse}
                                className="px-4 py-2 hover:bg-slate-50 rounded-xl text-slate-600 hover:text-slate-900 transition-all font-semibold flex items-center gap-2 group"
                                title="Back to Course"
                            >
                                <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                                {t('course.backToCourse')}
                            </button>

                            {/* Voice-Over Toggle */}
                            <button
                                onClick={() => {
                                    updateSettings({ isVoiceOverEnabled: !isVoiceOverEnabled });
                                    if (isVoiceOverEnabled) {
                                        stopSpeaking();
                                    }
                                }}
                                className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all ${isVoiceOverEnabled
                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                title={isVoiceOverEnabled ? "Voice-Over: ON" : "Voice-Over: OFF"}
                            >
                                <span className="text-lg">{isVoiceOverEnabled ? '🔊' : '🔇'}</span>
                                <span className="text-sm">{isVoiceOverEnabled ? 'ON' : 'OFF'}</span>
                            </button>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight">
                            {getLocalizedContent(lesson.title)}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-600 font-medium mb-4">
                            <span>{t('course.step')} {currentStepIndex + 1} {t('course.of')} {lesson.steps.length}</span>
                            <span>•</span>
                            <span>{progress}% {t('course.complete')}</span>
                        </div>
                        {/* Polished progress bar */}
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out rounded-full shadow-sm"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Educational Content Area */}
                    <div className="flex-1 p-8 overflow-auto">
                        {/* Before Explanation */}
                        {getLocalizedContent(currentStep.beforeExplanation) && !feedback && (
                            <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm">
                                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                                    <span className="text-lg">📚</span>
                                    {t('course.learn')}
                                </div>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {getLocalizedContent(currentStep.beforeExplanation)}
                                </p>
                            </div>
                        )}

                        {/* Current Instruction */}
                        {!isCompleted && (
                            <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
                                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                    {t('course.yourTask')}
                                </div>
                                <p className="text-lg font-bold leading-relaxed text-slate-900">
                                    {getLocalizedContent(currentStep.instruction)}
                                </p>
                            </div>
                        )}

                        {/* Feedback */}
                        {feedback && (
                            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                <div
                                    className={`p-5 rounded-2xl text-center font-bold border-2 ${feedback.type === 'success'
                                        ? 'bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-700 border-emerald-200'
                                        : 'bg-gradient-to-br from-rose-50 to-red-50 text-rose-700 border-rose-200'
                                        }`}
                                >
                                    <div className="text-xl mb-1">{feedback.message}</div>
                                </div>
                                {feedback.explanation && (
                                    <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                                            💡 {t('course.explanation')}
                                        </div>
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {getLocalizedContent(feedback.explanation)}
                                        </p>
                                    </div>
                                )}
                                {feedback.type === 'success' && (
                                    <button
                                        onClick={handleNext}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
                                    >
                                        Next Step →
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Completion Message */}
                        {isCompleted && (
                            <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl text-center">
                                <div className="text-5xl mb-4">🎉</div>
                                <h4 className="text-2xl font-black text-emerald-900 mb-2">
                                    {t('course.lessonComplete')}
                                </h4>
                                <p className="text-emerald-700 font-medium">
                                    {t('course.congratulations')}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer Navigation */}
                    <div className="p-8 border-t border-slate-200 bg-white space-y-3">
                        {!isCompleted && currentStepIndex > 0 && currentStep.type !== 'overview' && (
                            <button
                                onClick={handlePrevious}
                                className="w-full py-3 border-2 border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-900 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                ← {t('course.previousStep')}
                            </button>
                        )}

                        {isCompleted && (
                            <>
                                <button
                                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-black shadow-lg shadow-emerald-500/30 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                                    onClick={onBackToCourse}
                                >
                                    {t('course.backToCourse')} 🚀
                                </button>
                                <button
                                    className="w-full py-3 text-slate-500 hover:text-slate-900 font-bold transition-colors"
                                    onClick={handleRestart}
                                >
                                    {t('course.restartLesson')}
                                </button>
                            </>
                        )}
                    </div>
                </aside>
            )}

            {/* Simulator Area */}
            <main className="flex-grow bg-slate-900 flex items-center justify-center p-12 overflow-auto relative">
                {/* Fullscreen Toggle Button */}
                <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="absolute top-6 right-6 z-50 p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? (
                        <>
                            <span className="text-lg">⇲</span>
                            <span className="text-sm">Exit Fullscreen</span>
                        </>
                    ) : (
                        <>
                            <span className="text-lg">⤢</span>
                            <span className="text-sm">Fullscreen</span>
                        </>
                    )}
                </button>

                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className={`bg-white rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border-[12px] border-slate-800 overflow-hidden relative group transition-all duration-300 ${isFullscreen
                    ? 'w-full h-full max-w-none'
                    : 'w-full max-w-6xl aspect-[16/10]'
                    }`}>
                    <div className="absolute inset-0 border border-slate-700/50 pointer-events-none rounded-xl z-50"></div>
                    {typeof children === 'function' ? children({
                        handleAction,
                        currentStep,
                        highlightType: (isVoiceOverEnabled && !feedback) ? 'attention' : 'action'
                    }) : children}
                </div>
            </main>
        </div>
    );
}
