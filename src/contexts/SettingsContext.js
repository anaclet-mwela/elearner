'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const defaultSettings = {
    displayLanguage: 'en', // 'en' or 'fr'
    narrationLanguage: 'en', // 'en' or 'fr'
    narratorVoice: 'default', // voice name or 'default'
    isVoiceOverEnabled: false,
    completedLessons: [] // Array of completed lesson IDs
};

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('wintutor-settings');
        if (savedSettings) {
            try {
                // Merge saved settings with defaults to ensure new fields (like completedLessons) exist
                setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
            } catch (e) {
                console.error('Failed to parse settings:', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save settings to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('wintutor-settings', JSON.stringify(settings));
        }
    }, [settings, isLoaded]);

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const completeLesson = (lessonId) => {
        setSettings(prev => {
            if (prev.completedLessons?.includes(lessonId)) return prev;
            return {
                ...prev,
                completedLessons: [...(prev.completedLessons || []), lessonId]
            };
        });
    };

    const value = {
        settings,
        updateSettings,
        completeLesson,
        displayLanguage: settings.displayLanguage,
        narrationLanguage: settings.narrationLanguage,
        narratorVoice: settings.narratorVoice,
        isVoiceOverEnabled: settings.isVoiceOverEnabled,
        completedLessons: settings.completedLessons || []
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
