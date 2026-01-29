'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation } from '@/i18n/translations';

export default function Settings({ onClose }) {
    const { settings, updateSettings, displayLanguage } = useSettings();
    const { t } = useTranslation(displayLanguage);

    const [localSettings, setLocalSettings] = useState(settings);
    const [voices, setVoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    // Filter voices by language
    const getVoicesForLanguage = (lang) => {
        const langCode = lang === 'fr' ? 'fr' : 'en';
        return voices.filter(voice => voice.lang.startsWith(langCode));
    };

    const handleTestVoice = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(t('settings.testText'));
        utterance.lang = localSettings.narrationLanguage === 'fr' ? 'fr-FR' : 'en-US';
        utterance.rate = 0.9;

        if (localSettings.narratorVoice !== 'default') {
            const selectedVoice = voices.find(v => v.name === localSettings.narratorVoice);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
        }

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const handleSave = () => {
        updateSettings(localSettings);
        onClose();
    };

    const narrationVoices = getVoicesForLanguage(localSettings.narrationLanguage);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-8 border-b border-slate-200 bg-gradient-to-br from-white to-slate-50">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-slate-900">{t('settings.title')}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-colors text-2xl"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Display Language Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🌐</span>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{t('settings.displayLanguage')}</h3>
                                <p className="text-sm text-slate-600">{t('settings.displayLanguageDesc')}</p>
                            </div>
                        </div>

                        <div className="space-y-3 pl-11">
                            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                                <input
                                    type="radio"
                                    name="displayLanguage"
                                    value="en"
                                    checked={localSettings.displayLanguage === 'en'}
                                    onChange={(e) => setLocalSettings({ ...localSettings, displayLanguage: e.target.value })}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <span className="font-semibold text-slate-800">{t('settings.english')}</span>
                            </label>

                            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                                <input
                                    type="radio"
                                    name="displayLanguage"
                                    value="fr"
                                    checked={localSettings.displayLanguage === 'fr'}
                                    onChange={(e) => setLocalSettings({ ...localSettings, displayLanguage: e.target.value })}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <span className="font-semibold text-slate-800">{t('settings.french')}</span>
                            </label>
                        </div>
                    </div>

                    <div className="border-t border-slate-200"></div>

                    {/* Voice-Over Settings Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔊</span>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{t('settings.voiceSettings')}</h3>
                            </div>
                        </div>

                        {/* Narration Language */}
                        <div className="pl-11 space-y-3">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    {t('settings.narrationLanguage')}
                                </label>
                                <p className="text-xs text-slate-600 mb-3">{t('settings.narrationLanguageDesc')}</p>
                                <select
                                    value={localSettings.narrationLanguage}
                                    onChange={(e) => setLocalSettings({
                                        ...localSettings,
                                        narrationLanguage: e.target.value,
                                        narratorVoice: 'default' // Reset voice when language changes
                                    })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="en">{t('settings.english')}</option>
                                    <option value="fr">{t('settings.french')}</option>
                                </select>
                            </div>

                            {/* Narrator Voice */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    {t('settings.narratorVoice')}
                                </label>
                                <p className="text-xs text-slate-600 mb-3">{t('settings.narratorVoiceDesc')}</p>
                                <select
                                    value={localSettings.narratorVoice}
                                    onChange={(e) => setLocalSettings({ ...localSettings, narratorVoice: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={narrationVoices.length === 0}
                                >
                                    <option value="default">{t('settings.selectVoice')}</option>
                                    {narrationVoices.map((voice) => (
                                        <option key={voice.name} value={voice.name}>
                                            {voice.name} {voice.localService ? '' : '(Online)'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Test Voice Button */}
                            <button
                                onClick={handleTestVoice}
                                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isSpeaking
                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    }`}
                                disabled={narrationVoices.length === 0}
                            >
                                <span className="text-lg">{isSpeaking ? '⏸️' : '🔊'}</span>
                                {isSpeaking ? 'Stop' : t('settings.testVoice')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-slate-200 bg-slate-50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-6 border-2 border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-900 rounded-xl font-bold transition-all"
                    >
                        {t('settings.cancel')}
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30"
                    >
                        {t('settings.save')}
                    </button>
                </div>
            </div>
        </div>
    );
}
