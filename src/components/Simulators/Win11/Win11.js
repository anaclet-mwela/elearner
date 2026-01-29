import { useState, useEffect } from 'react';
import styles from './Win11.module.css';

// Reusable Helper for glowing effects
const getTargetClass = (id, activeTargetId, highlightType = 'action', baseClass = "") => {
    const isTarget = id === activeTargetId;
    let glowClass = 'ring-[6px] ring-blue-500 ring-offset-2 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.6)]';
    if (highlightType === 'attention') {
        glowClass = 'ring-[6px] ring-red-500 ring-offset-2 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)] border-red-500';
    }
    return `${baseClass} ${isTarget ? glowClass : ''}`;
};

const Taskbar = ({ onAction, onToggleStart, onToggleSettings, isStartMenuOpen, isSettingsOpen, activeTargetId, highlightType }) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-[48px] bg-[#f3f3f3]/90 backdrop-blur-3xl border-t border-white/50 flex justify-between items-center px-3 z-50 shadow-sm">
            {/* Centered App Icons */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 h-full">
                {/* Start Button */}
                <button
                    id="start-button"
                    className={getTargetClass('start-button', activeTargetId, highlightType, `w-10 h-10 flex items-center justify-center rounded hover:bg-white/50 active:bg-white/30 transition-all group ${isStartMenuOpen ? 'bg-white/50' : ''}`)}
                    onClick={() => {
                        onToggleStart();
                        onAction('click', 'start-button');
                    }}
                    title="Start"
                >
                    <div className="grid grid-cols-2 gap-[1px] w-[18px] h-[18px] group-hover:scale-105 transition-transform duration-300">
                        <div className="bg-[#0078d4] rounded-tl-[1px]"></div>
                        <div className="bg-[#0078d4] rounded-tr-[1px] opacity-90"></div>
                        <div className="bg-[#0078d4] rounded-bl-[1px] opacity-90"></div>
                        <div className="bg-[#0078d4] rounded-br-[1px] opacity-80"></div>
                    </div>
                </button>

                {/* Search */}
                <div className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/50 transition-all cursor-default" title="Search">
                    <span className="text-xl text-slate-700 transform rotate-90">⚲</span>
                </div>

                {/* Task View */}
                <div className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/50 transition-all cursor-default" title="Task View">
                    <div className="flex gap-[2px]">
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-slate-500/60 rounded-sm"></div>
                    </div>
                </div>

                {/* Settings App */}
                <button
                    id="settings-app-taskbar"
                    className={getTargetClass('settings-app-taskbar', activeTargetId, highlightType, `w-10 h-10 flex items-center justify-center rounded hover:bg-white/50 active:bg-white/30 transition-all relative ${isSettingsOpen ? 'bg-white/40' : ''}`)}
                    onClick={() => {
                        onToggleSettings();
                        onAction('click', 'settings-app');
                    }}
                    title="Settings"
                >
                    <span className="text-xl text-slate-600">⚙️</span>
                    {isSettingsOpen && <div className="absolute bottom-1 w-1.5 h-1 bg-[#0078d4] rounded-full"></div>}
                </button>

                {/* File Explorer */}
                <div className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/50 transition-all text-xl" title="File Explorer">
                    📁
                </div>

                {/* Edge */}
                <div className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/50 transition-all text-xl text-blue-500" title="Microsoft Edge">
                    🌐
                </div>
            </div>

            {/* System Tray */}
            <div className="flex items-center gap-1 h-[80%]">
                <div className="hidden md:flex items-center hover:bg-white/50 px-2 py-1 rounded transition-all cursor-default" title="Show hidden icons">
                    <span className="text-xs text-slate-700">^</span>
                </div>

                <div className="flex items-center gap-2 hover:bg-white/50 px-2 py-1 rounded transition-all cursor-default" title="Internet access, Speakers">
                    <span className="text-xs text-slate-700">📶</span> {/* Wifi */}
                    <span className="text-xs text-slate-700">🔊</span> {/* Vol */}
                    <span className="text-xs text-slate-700">🔋</span> {/* Battery */}
                </div>

                <div className="flex flex-col items-end hover:bg-white/50 px-2 py-1 rounded transition-all cursor-default ml-1 text-right text-slate-700">
                    <span className="text-xs leading-none mb-[2px]">10:10 AM</span>
                    <span className="text-xs leading-none">10/20/26</span>
                </div>

                <div className="w-[2px] h-full ml-1 border-l border-slate-300"></div>
            </div>
        </div>
    );
};

const StartMenu = ({ onAction, onOpenSettings, activeTargetId, highlightType }) => {
    return (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[640px] h-[680px] bg-[#f3f3f3]/95 backdrop-blur-3xl rounded-lg shadow-2xl border border-white/20 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out z-40 overflow-hidden">
            {/* Search Bar */}
            <div className="p-6 pb-2">
                <div className="bg-[#ffffff] border border-b-2 border-slate-200/50 rounded-full h-10 flex items-center px-4 gap-3 shadow-sm hover:bg-white hover:shadow-md transition-all">
                    <span className="text-slate-500">🔎</span>
                    <input
                        type="text"
                        placeholder="Type here to search"
                        className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-500"
                        readOnly
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 pt-2 overflow-y-auto no-scrollbar">
                {/* Pinned Section */}
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-slate-800 text-sm">Pinned</h4>
                    <button className="text-[11px] bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm text-slate-700 font-semibold hover:bg-slate-50">All apps &gt;</button>
                </div>

                <div className="grid grid-cols-6 gap-2 mb-8">
                    {[
                        { icon: '🌐', name: 'Edge' },
                        { icon: '📧', name: 'Mail' },
                        { icon: '📅', name: 'Calendar' },
                        { icon: '🛒', name: 'Store' },
                        { icon: '📸', name: 'Photos' },
                        { type: 'settings', icon: '⚙️', name: 'Settings' },
                        { icon: '🧮', name: 'Calculator' },
                        { icon: '⏰', name: 'Clock' },
                        { icon: '📝', name: 'Notepad' },
                        { icon: '🎨', name: 'Paint' },
                        { icon: '📁', name: 'File Explorer' },
                        { icon: '🎬', name: 'Movies' },
                    ].map((app, i) => {
                        if (app.type === 'settings') {
                            return (
                                <button
                                    key={i}
                                    id="settings-app"
                                    className={getTargetClass('settings-app', activeTargetId, highlightType, "flex flex-col items-center gap-1 p-2 rounded hover:bg-white/50 active:scale-95 transition-all group")}
                                    onClick={() => {
                                        onOpenSettings();
                                        onAction('click', 'settings-app');
                                    }}
                                >
                                    <div className="w-8 h-8 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{app.icon}</div>
                                    <span className="text-[11px] text-slate-700 font-medium truncate w-full text-center">{app.name}</span>
                                </button>
                            );
                        }
                        return (
                            <button key={i} className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/50 active:scale-95 transition-all group">
                                <div className="w-8 h-8 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform drop-shadow-sm">{app.icon}</div>
                                <span className="text-[11px] text-slate-700 font-medium truncate w-full text-center">{app.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Recommended Section */}
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-slate-800 text-sm">Recommended</h4>
                    <button className="text-[11px] bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm text-slate-700 font-semibold hover:bg-slate-50">More &gt;</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { name: "Project Proposal.docx", time: "2h ago", icon: "📄" },
                        { name: "Budget_2026.xlsx", time: "Yesterday", icon: "📊" },
                        { name: "Team_Photo.jpg", time: "Last week", icon: "🖼️" },
                        { name: "Presentation.pptx", time: "Oct 12", icon: "📑" },
                    ].map((file, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-white/50 cursor-pointer">
                            <div className="text-xl">{file.icon}</div>
                            <div className="text-left">
                                <div className="text-xs font-semibold text-slate-800">{file.name}</div>
                                <div className="text-[10px] text-slate-500">{file.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#e9e9e9]/50 p-4 px-12 flex justify-between items-center backdrop-blur-md">
                <div className="flex items-center gap-3 hover:bg-white/50 p-2 rounded-lg cursor-pointer transition-all">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white/20">US</div>
                    <span className="text-xs font-semibold text-slate-800">User Account</span>
                </div>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/50 transition-colors text-slate-700">
                    ⏻
                </button>
            </div>
        </div>
    );
};

const SettingsWindow = ({ onAction, onClose, activeTargetId, highlightType }) => {
    return (
        <div className="absolute inset-0 bg-transparent flex items-center justify-center animate-in fade-in zoom-in-95 duration-200 z-10 p-12">
            <div className="w-full h-full max-w-[1000px] max-h-[700px] bg-[#f3f3f3] rounded-lg shadow-2xl border border-slate-300 flex flex-col overflow-hidden text-sm font-Segoe">
                {/* Title Bar - Minimal */}
                <div className="h-8 flex justify-end items-center bg-[#f3f3f3]">
                    <button className="w-10 h-full hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xs">─</button>
                    <button className="w-10 h-full hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xs">◻</button>
                    <button
                        id="close-settings"
                        className={getTargetClass('close-settings', activeTargetId, highlightType, "w-10 h-full hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-600 transition-colors")}
                        onClick={() => {
                            onClose();
                            onAction('click', 'close-settings');
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-[280px] p-2 flex flex-col gap-1 overflow-y-auto">
                        <div className="p-4 mb-2">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-lg font-bold">US</div>
                                <div>
                                    <div className="font-bold text-slate-800 text-base">User</div>
                                    <div className="text-xs text-slate-500">Local Account</div>
                                </div>
                            </div>
                            <div className="mt-4 relative">
                                <input type="text" placeholder="Find a setting" className="w-full bg-white border-b border-slate-300 px-3 py-1.5 rounded-sm text-xs outline-none focus:border-blue-500" />
                                <span className="absolute right-3 top-1.5 text-slate-400">🔍</span>
                            </div>
                        </div>

                        {[
                            { name: "System", icon: "💻", active: true },
                            { name: "Bluetooth & devices", icon: "🎧" },
                            { name: "Network & internet", icon: "🌐" },
                            { name: "Personalization", icon: "🎨" },
                            { name: "Apps", icon: "📱" },
                            { name: "Accounts", icon: "👤" },
                            { name: "Time & language", icon: "🕒" },
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded hover:bg-white/50 cursor-default transition-colors relative ${item.active ? 'bg-white/60' : ''}`}>
                                {item.active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-blue-500 rounded-r"></div>}
                                <span className="text-lg w-6 text-center">{item.icon}</span>
                                <span className={`text-sm ${item.active ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{item.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-[#f9f9f9] rounded-tl-lg border-t border-l border-slate-200 p-8 overflow-y-auto">
                        <div className="max-w-[800px] mx-auto">
                            <h1 className="text-4xl font-semibold text-slate-900 mb-8">System</h1>

                            {/* Hero Card - often Display */}
                            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 mb-4 flex items-center gap-4 hover:bg-[#fbfbfb] cursor-pointer">
                                <span className="text-3xl text-blue-600">🖥️</span>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-slate-900">Display</h3>
                                    <p className="text-xs text-slate-500">Monitors, brightness, night light, display profile</p>
                                </div>
                                <span className="text-slate-400">›</span>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 mb-4 flex items-center gap-4 hover:bg-[#fbfbfb] cursor-pointer">
                                <span className="text-3xl text-slate-700">🔊</span>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-slate-900">Sound</h3>
                                    <p className="text-xs text-slate-500">Volume levels, output, input, sound devices</p>
                                </div>
                                <span className="text-slate-400">›</span>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 mb-4 flex items-center gap-4 hover:bg-[#fbfbfb] cursor-pointer">
                                <span className="text-3xl text-slate-700">🔔</span>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-slate-900">Notifications</h3>
                                    <p className="text-xs text-slate-500">Alerts from apps and system, do not disturb</p>
                                </div>
                                <span className="text-slate-400">›</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Win11({ onAction, currentStep, highlightType = 'action' }) {
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Decoupled state: We no longer auto-open menus based on IDs.
    // The user must interact naturally.
    // However, if the lesson starts in a specific context (restoring state), 
    // we could add props to initialize state, but for now we rely on natural flow.

    const activeTargetId = currentStep?.targetId;

    const toggleStart = () => setIsStartMenuOpen(!isStartMenuOpen);

    const openSettings = () => {
        setIsSettingsOpen(true);
        setIsStartMenuOpen(false);
    };

    const toggleSettingsWindow = () => {
        if (isSettingsOpen) {
            setIsSettingsOpen(false);
        } else {
            openSettings();
        }
    };

    const closeSettings = () => setIsSettingsOpen(false);

    return (
        <div className={styles.desktop}>
            <div className={styles.wallpaper}></div>

            {/* Desktop Icons */}
            <div className="absolute top-4 left-4 flex flex-col gap-6">
                <div className="flex flex-col items-center w-20 gap-1 text-xs text-white drop-shadow-md cursor-default hover:bg-white/10 p-2 rounded">
                    <div className="text-3xl">📁</div>
                    <span className="text-center">This PC</span>
                </div>
                <div className="flex flex-col items-center w-20 gap-1 text-xs text-white drop-shadow-md cursor-default hover:bg-white/10 p-2 rounded">
                    <div className="text-3xl">🗑️</div>
                    <span className="text-center">Recycle Bin</span>
                </div>
            </div>

            {/* Sub-Components */}
            {isSettingsOpen && (
                <SettingsWindow
                    onAction={onAction}
                    onClose={closeSettings}
                    activeTargetId={activeTargetId}
                    highlightType={highlightType}
                />
            )}

            <Taskbar
                onAction={onAction}
                onToggleStart={toggleStart}
                onToggleSettings={toggleSettingsWindow}
                isStartMenuOpen={isStartMenuOpen}
                isSettingsOpen={isSettingsOpen}
                activeTargetId={activeTargetId}
                highlightType={highlightType}
            />

            {isStartMenuOpen && (
                <StartMenu
                    onAction={onAction}
                    onOpenSettings={openSettings}
                    activeTargetId={activeTargetId}
                    highlightType={highlightType}
                />
            )}
        </div>
    );
}
