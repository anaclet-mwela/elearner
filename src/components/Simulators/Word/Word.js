import { useState } from 'react';

// Helper for highlights (Reused logic, could be extracted but keeping self-contained for now)
const getTargetClass = (id, activeTargetId, highlightType = 'action', baseClass = "") => {
    const isTarget = id === activeTargetId;
    let glowClass = 'ring-[6px] ring-blue-500 ring-offset-2 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.6)]';
    if (highlightType === 'attention') {
        glowClass = 'ring-[6px] ring-red-500 ring-offset-2 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)] border-red-500';
    }
    return `${baseClass} ${isTarget ? glowClass : ''}`;
};

export default function Word({ onAction, currentStep, highlightType }) {
    const [view, setView] = useState('landing'); // 'landing' or 'editor'
    const [content, setContent] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [alignment, setAlignment] = useState('left');
    const [isSelectionActive, setIsSelectionActive] = useState(false);

    const activeTargetId = currentStep?.targetId;

    // Landing Page Component
    const LandingPage = () => (
        <div className="flex bg-[#f3f3f3] h-full font-Segoe">
            {/* Sidebar */}
            <div className="w-[200px] bg-[#fdfdfd] h-full flex flex-col p-4 gap-2">
                <h1 className="text-[#2b579a] font-bold text-xl mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#2b579a] text-white rounded text-sm font-serif">W</span>
                    Word
                </h1>
                <button className="flex items-center gap-3 px-4 py-2 bg-[#e8e8e8] rounded text-[#2b579a] font-semibold text-sm">
                    <span>🏠</span> Home
                </button>
                <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#e8e8e8] rounded text-slate-600 font-semibold text-sm">
                    <span>🆕</span> New
                </button>
                <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#e8e8e8] rounded text-slate-600 font-semibold text-sm">
                    <span>📂</span> Open
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                <h2 className="text-xl font-semibold text-slate-700 mb-4">New</h2>
                <div className="flex gap-4 mb-4">
                    <button
                        id="word-blank-doc"
                        className={getTargetClass('word-blank-doc', activeTargetId, highlightType, "w-40 h-52 bg-white border border-slate-200 hover:border-[#2b579a] hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group")}
                        onClick={() => {
                            setView('editor');
                            onAction('click', 'word-blank-doc');
                        }}
                    >
                        <div className="w-24 h-32 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform"></div>
                        <span className="text-sm font-semibold text-slate-700">Blank document</span>
                    </button>

                    {/* Fake templates */}
                    {['Resume', 'Brochure', 'Report'].map((t, i) => (
                        <div key={i} className="w-40 h-52 bg-white border border-slate-200 hover:border-[#2b579a] hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 cursor-default">
                            <div className="w-24 h-32 bg-slate-50 border border-slate-100"></div>
                            <span className="text-sm text-slate-700">{t}</span>
                        </div>
                    ))}
                </div>

                <h2 className="text-xl font-semibold text-slate-700 mb-4 mt-8">Recent</h2>
                <div className="bg-white rounded border border-slate-200">
                    <div className="flex items-center p-3 border-b border-slate-100 text-xs font-semibold text-slate-500">
                        <div className="flex-1">Name</div>
                        <div className="w-40">Date modified</div>
                    </div>
                    {['Proposal.docx', 'Notes.docx'].map((file, i) => (
                        <div key={i} className="flex items-center p-3 border-b border-slate-50 text-sm hover:bg-slate-50 cursor-pointer">
                            <div className="flex-1 flex items-center gap-2 font-medium text-slate-700">
                                <span className="text-[#2b579a]">📄</span>
                                {file}
                            </div>
                            <div className="w-40 text-slate-500 text-xs">Yesterday</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Editor Component
    const Editor = () => (
        <div className="flex flex-col h-full bg-[#f3f3f3] font-Segoe">
            {/* Title Bar */}
            <div className="h-10 bg-[#2b579a] flex text-white items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <span className="font-semibold text-xs border border-white/20 p-1 rounded hover:bg-white/10 cursor-pointer">AutoSave On</span>
                    <span className="text-sm text-center font-medium">Document1 - Word</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <span>User Account</span>
                    <div className="flex gap-2">
                        <button className="hover:bg-white/10 p-2 rounded">─</button>
                        <button className="hover:bg-white/10 p-2 rounded">◻</button>
                        <button className="hover:bg-red-500 p-2 rounded">✕</button>
                    </div>
                </div>
            </div>

            {/* Ribbon */}
            <div className="bg-white shadow-sm flex flex-col">
                <div className="flex text-xs font-semibold text-slate-600 border-b border-slate-200">
                    <div className="bg-[#2b579a] text-white px-4 py-2 rounded-t-sm cursor-pointer">File</div>
                    {['Home', 'Insert', 'Layout', 'References', 'Review', 'View'].map(tab => (
                        <div key={tab} className={`px-4 py-2 cursor-pointer ${tab === 'Home' ? 'text-[#2b579a] border-b-2 border-[#2b579a]' : 'hover:bg-slate-100'}`}>
                            {tab}
                        </div>
                    ))}
                </div>
                {/* Home Content */}
                <div className="h-24 flex items-center px-2 gap-2 text-xs text-slate-600">
                    {/* Clipboard Group */}
                    <div className="flex flex-col items-center gap-1 px-2 border-r border-slate-200 h-full justify-center">
                        <div className="flex gap-1">
                            <span className="text-xl">📋</span>
                            <span className="text-sm">Paste</span>
                        </div>
                    </div>
                    {/* Font Group */}
                    <div className="flex flex-col gap-1 px-2 border-r border-slate-200 h-full justify-center">
                        <div className="flex gap-2 mb-1">
                            <select className="border border-slate-300 rounded px-1 w-24"><option>Calibri</option></select>
                            <select className="border border-slate-300 rounded px-1 w-12"><option>11</option></select>
                        </div>
                        <div className="flex gap-1">
                            <button
                                id="word-bold-btn"
                                className={getTargetClass('word-bold-btn', activeTargetId, highlightType, `p-1 rounded hover:bg-slate-200 font-bold w-6 text-center ${isBold ? 'bg-slate-300' : ''}`)}
                                onClick={() => {
                                    if (isSelectionActive) setIsBold(!isBold);
                                    onAction('click', 'word-bold-btn');
                                }}
                            >
                                B
                            </button>
                            <button className="p-1 rounded hover:bg-slate-200 italic w-6 text-center">I</button>
                            <button className="p-1 rounded hover:bg-slate-200 underline w-6 text-center">U</button>
                        </div>
                    </div>
                    {/* Paragraph Group */}
                    <div className="flex flex-col gap-1 px-2 border-r border-slate-200 h-full justify-center">
                        <div className="flex gap-1">
                            {['left', 'center', 'right', 'justify'].map(align => (
                                <button
                                    key={align}
                                    id={`word-align-${align}`}
                                    className={getTargetClass(`word-align-${align}`, activeTargetId, highlightType, `p-1 rounded hover:bg-slate-200 w-6 text-center ${alignment === align ? 'bg-slate-300' : ''}`)}
                                    onClick={() => {
                                        setAlignment(align);
                                        onAction('click', `word-align-${align}`);
                                    }}
                                >
                                    <span className="text-xs">≡</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 overflow-auto p-8 flex justify-center bg-[#f3f3f3] cursor-text" onClick={() => {
                // Simulate typing if requested
                if (activeTargetId === 'word-document') {
                    setContent("My First Document");
                    onAction('click', 'word-document');
                }
            }}>
                <div
                    id="word-document"
                    className={getTargetClass('word-document', activeTargetId, highlightType, "bg-white w-[210mm] min-h-[297mm] shadow-lg p-[25mm] outline-none")}
                >
                    {content && (
                        <p
                            className={`text-lg cursor-text selection:bg-blue-200 ${isBold ? 'font-bold' : ''} text-${alignment}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsSelectionActive(true);
                                onAction('click', 'word-text');
                            }}
                        >
                            <span
                                id="word-text"
                                className={isSelectionActive ? "bg-blue-200" : ""}
                            >
                                {content}
                            </span>
                        </p>
                    )}
                    {!content && <span className="animate-pulse">|</span>}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#2b579a] text-white text-[10px] flex items-center justify-between px-2">
                <div className="flex gap-4">
                    <span>Page 1 of 1</span>
                    <span>3 words</span>
                    <span>English (US)</span>
                </div>
                <div className="flex gap-4 items-center">
                    <span>Focus</span>
                    <div className="flex gap-2">
                        <span>-</span>
                        <div className="w-20 h-1 bg-white/50 rounded-full mt-1.5 relative"><div className="w-2 h-2 bg-white rounded-full absolute top-1/2 -translate-y-1/2 left-1/2"></div></div>
                        <span>+</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return view === 'landing' ? <LandingPage /> : <Editor />;
}
