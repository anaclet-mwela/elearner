export const translations = {
    en: {
        dashboard: {
            title: 'Learn Computer Skills',
            subtitle: 'Master essential digital skills through interactive, hands-on lessons',
            settings: 'Settings',
            courses: 'Available Courses'
        },
        settings: {
            title: 'Settings',
            displayLanguage: 'Display Language',
            displayLanguageDesc: 'Choose the language for the user interface',
            narrationLanguage: 'Narration Language',
            narrationLanguageDesc: 'Choose the language for voice-over',
            narratorVoice: 'Narrator Voice',
            narratorVoiceDesc: 'Select your preferred narrator',
            testVoice: 'Test Voice',
            testText: 'Hello! This is how I will sound when reading the lessons.',
            save: 'Save Changes',
            cancel: 'Cancel',
            english: 'English',
            french: 'Français (French)',
            selectVoice: 'Select a voice...',
            voiceSettings: 'Voice-Over Settings'
        },
        course: {
            backToDashboard: 'Back to Dashboard',
            backToCourse: 'Back to Course',
            startLesson: 'Start Lesson',
            lessonOverview: 'Lesson Overview',
            whatYouLearn: 'What You\'ll Learn',
            yourProgress: 'Your Progress',
            estimatedTime: 'Estimated Time',
            step: 'Step',
            of: 'of',
            complete: 'Complete',
            previousStep: 'Previous Step',
            nextLesson: 'Next Lesson',
            restartLesson: 'Restart Lesson',
            lessonComplete: 'Lesson Complete!',
            congratulations: 'Great job! You\'ve mastered this lesson.',
            yourTask: 'Your Task',
            learn: 'Learn',
            explanation: 'Explanation',
            correct: 'Correct!',
            notQuite: 'Not quite right',
            tryAgain: 'Try following the instruction above carefully.',
            minutes: 'minutes',
            steps: 'steps',
            courseLessons: 'Course Lessons',
            completed: 'Completed',
            start: 'Start',
            locked: 'Locked'
        }
    },
    fr: {
        dashboard: {
            title: 'Apprendre les Compétences Informatiques',
            subtitle: 'Maîtrisez les compétences numériques essentielles grâce à des leçons interactives et pratiques',
            settings: 'Paramètres',
            courses: 'Cours Disponibles'
        },
        settings: {
            title: 'Paramètres',
            displayLanguage: 'Langue d\'Affichage',
            displayLanguageDesc: 'Choisissez la langue de l\'interface utilisateur',
            narrationLanguage: 'Langue de Narration',
            narrationLanguageDesc: 'Choisissez la langue pour la voix off',
            narratorVoice: 'Voix du Narrateur',
            narratorVoiceDesc: 'Sélectionnez votre narrateur préféré',
            testVoice: 'Tester la Voix',
            testText: 'Bonjour! C\'est ainsi que je sonnerai en lisant les leçons.',
            save: 'Enregistrer les Modifications',
            cancel: 'Annuler',
            english: 'English (Anglais)',
            french: 'Français',
            selectVoice: 'Sélectionner une voix...',
            voiceSettings: 'Paramètres de Voix Off'
        },
        course: {
            backToDashboard: 'Retour au Tableau de Bord',
            backToCourse: 'Retour au Cours',
            startLesson: 'Commencer la Leçon',
            lessonOverview: 'Aperçu de la Leçon',
            whatYouLearn: 'Ce que Vous Allez Apprendre',
            yourProgress: 'Votre Progression',
            estimatedTime: 'Temps Estimé',
            step: 'Étape',
            of: 'sur',
            complete: 'Terminé',
            previousStep: 'Étape Précédente',
            nextLesson: 'Leçon Suivante',
            restartLesson: 'Recommencer la Leçon',
            lessonComplete: 'Leçon Terminée!',
            congratulations: 'Excellent travail! Vous avez maîtrisé cette leçon.',
            yourTask: 'Votre Tâche',
            learn: 'Apprendre',
            explanation: 'Explication',
            correct: 'Correct!',
            notQuite: 'Pas tout à fait',
            tryAgain: 'Essayez de suivre attentivement l\'instruction ci-dessus.',
            minutes: 'minutes',
            steps: 'étapes',
            courseLessons: 'Leçons du Cours',
            completed: 'Terminé',
            start: 'Commencer',
            locked: 'Verrouillé'
        }
    }
};

export const useTranslation = (language = 'en') => {
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return { t, lang: language };
};
