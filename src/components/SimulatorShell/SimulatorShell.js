export default function SimulatorShell({ title, children }) {
    return (
        <div className="flex flex-col h-full bg-[#f3f3f3] shadow-inner">
            <div className="h-9 bg-white border-b border-slate-200 flex items-center px-4 shrink-0 select-none">
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                </div>
                <div className="flex-grow text-center text-xs font-medium text-slate-500 pr-12">
                    {title}
                </div>
            </div>
            <div className="flex-grow relative overflow-hidden">
                {children}
            </div>
        </div>
    );
}
