import React, { useMemo, useRef, useState } from 'react';
import { FileText, Calculator, Folder, Power, ChevronUp, Search, StickyNote, Minus, Square, X, Wifi, Volume2, Battery } from 'lucide-react';
import { Rnd } from 'react-rnd';

// Windows 7 color palette and helpers
const win7Blue = '#1a4c8b';
const win7BlueDark = '#0e3564';
const win7BlueLight = '#2b6bb0';
const taskbarBorder = 'rgba(255,255,255,0.25)';

// Types
type AppId = 'notes' | 'calc' | 'explorer';

type WindowState = {
  id: AppId;
  title: string;
  icon: React.ReactNode;
  minimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

const defaultWindows: Record<AppId, Omit<WindowState, 'zIndex'>> = {
  notes: {
    id: 'notes',
    title: 'Sticky Notes',
    icon: <StickyNote size={14} />,
    minimized: false,
    position: { x: 120, y: 120 },
    size: { width: 360, height: 300 },
  },
  calc: {
    id: 'calc',
    title: 'Calculator',
    icon: <Calculator size={14} />,
    minimized: false,
    position: { x: 520, y: 140 },
    size: { width: 280, height: 360 },
  },
  explorer: {
    id: 'explorer',
    title: 'Libraries',
    icon: <Folder size={14} />,
    minimized: false,
    position: { x: 260, y: 200 },
    size: { width: 560, height: 380 },
  },
};

function TitleBar({ title, icon, onMinimize, onClose, onFocus }: {
  title: string;
  icon: React.ReactNode;
  onMinimize: () => void;
  onClose: () => void;
  onFocus: () => void;
}) {
  return (
    <div
      onMouseDown={onFocus}
      className="win7-titlebar cursor-move flex items-center justify-between h-9 select-none"
      style={{
        background: `linear-gradient(to bottom, ${win7BlueLight}, ${win7BlueDark})`,
        color: 'white',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
    >
      <div className="flex items-center gap-2 pl-2 text-[12px]">
        <span className="opacity-90">{icon}</span>
        <span className="font-medium tracking-wide">{title}</span>
      </div>
      <div className="flex items-center h-full">
        <button
          onClick={onMinimize}
          className="h-full px-3 hover:bg-white/15"
          title="Minimize"
        >
          <Minus size={14} />
        </button>
        <button
          className="h-full px-3 opacity-50 cursor-not-allowed"
          title="Maximize (disabled)"
        >
          <Square size={12} />
        </button>
        <button
          onClick={onClose}
          className="h-full px-3 hover:bg-red-500"
          title="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

function NotesApp() {
  const [text, setText] = useState('Double-click to edit\n\n- Todo 1\n- Todo 2');
  const [editing, setEditing] = useState(false);
  return (
    <div className="w-full h-full bg-[#fff8b1] text-black" style={{ borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
      <div className="p-2 no-drag">
        {editing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => setEditing(false)}
            className="w-full h-[260px] bg-transparent outline-none resize-none no-drag"
            autoFocus
          />
        ) : (
          <div
            onDoubleClick={() => setEditing(true)}
            className="whitespace-pre-wrap text-sm leading-relaxed no-drag"
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
}

function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState<number | null>(null);
  const [op, setOp] = useState<'+' | '-' | '*' | '/' | null>(null);

  const press = (val: string) => {
    setDisplay((cur) => (cur === '0' ? val : cur + val));
  };

  const clear = () => {
    setDisplay('0');
    setStored(null);
    setOp(null);
  };

  const choose = (nextOp: typeof op) => {
    setStored(parseFloat(display));
    setDisplay('0');
    setOp(nextOp);
  };

  const equals = () => {
    if (stored === null || op === null) return;
    const cur = parseFloat(display);
    let res = 0;
    switch (op) {
      case '+': res = stored + cur; break;
      case '-': res = stored - cur; break;
      case '*': res = stored * cur; break;
      case '/': res = cur === 0 ? NaN : stored / cur; break;
    }
    setDisplay(String(res));
    setStored(null);
    setOp(null);
  };

  const btn = 'bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 active:to-gray-400 border border-white/60 shadow-sm text-sm rounded-sm';

  return (
    <div className="w-full h-full p-2 bg-gradient-to-br from-gray-100 to-gray-200 no-drag" style={{ borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
      <div className="mb-2 p-2 bg-white/80 border border-white/60 rounded-sm text-right font-mono text-xl shadow-inner">{display}</div>
      <div className="grid grid-cols-4 gap-2">
        <button className={btn} onClick={clear}>C</button>
        <button className={btn} onClick={() => choose('/')}>/</button>
        <button className={btn} onClick={() => choose('*')}>*</button>
        <button className={btn} onClick={() => choose('-')}>-</button>
        {[7,8,9,4,5,6,1,2,3].map((n) => (
          <button key={n} className={btn} onClick={() => press(String(n))}>{n}</button>
        ))}
        <button className={btn} onClick={() => press('0')}>0</button>
        <button className={btn} onClick={() => press('.')}>.</button>
        <button className={btn} onClick={() => choose('+')}>+</button>
        <button className={btn + ' col-span-4'} onClick={equals}>=</button>
      </div>
    </div>
  );
}

function ExplorerApp() {
  const items = useMemo(() => [
    { name: 'Documents', type: 'folder' },
    { name: 'Pictures', type: 'folder' },
    { name: 'Music', type: 'folder' },
    { name: 'Resume.pdf', type: 'file' },
    { name: 'Projects', type: 'folder' },
  ], []);

  return (
    <div className="w-full h-full bg-white" style={{ borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
      <div className="flex items-center gap-2 p-2 border-b border-black/10 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="flex items-center gap-1 text-[12px]">
          <Folder size={14} />
          <span className="font-medium">Libraries</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-black/70 bg-white px-2 py-1 rounded-sm border border-black/10 no-drag">
          <Search size={12} /> Search Libraries
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4 text-sm no-drag">
        {items.map((it) => (
          <div key={it.name} className="flex flex-col items-center gap-2">
            <div className="w-14 h-12 bg-gradient-to-b from-blue-200 to-blue-300 border border-white/50 rounded-sm shadow-sm flex items-center justify-center">
              {it.type === 'folder' ? <Folder size={20} /> : <FileText size={20} />}
            </div>
            <span className="text-center text-[12px]">{it.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OS() {
  const [startOpen, setStartOpen] = useState(false);
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(() => {
    let z = 1;
    return (['explorer', 'notes', 'calc'] as AppId[]).reduce((acc, id) => {
      // @ts-ignore
      const base = defaultWindows[id];
      acc[id] = { ...base, zIndex: z++ } as WindowState;
      return acc;
    }, {} as Record<AppId, WindowState>);
  });

  const bringToFront = (id: AppId) => {
    const maxZ = Math.max(...Object.values(windows).map((w) => w.zIndex));
    setWindows((cur) => ({ ...cur, [id]: { ...cur[id], minimized: false, zIndex: maxZ + 1 } }));
  };

  const closeWindow = (id: AppId) => {
    setWindows((cur) => ({ ...cur, [id]: { ...cur[id], minimized: true } }));
  };

  const toggleStart = () => setStartOpen((s) => !s);

  const launch = (id: AppId) => {
    bringToFront(id);
    setStartOpen(false);
  };

  const TaskbarButton = ({ id, label, icon }: { id: AppId; label: string; icon: React.ReactNode }) => {
    const active = !windows[id].minimized;
    return (
      <button
        onClick={() => (active ? setWindows((cur) => ({ ...cur, [id]: { ...cur[id], minimized: true } })) : bringToFront(id))}
        className={`relative h-9 flex items-center gap-2 px-3 rounded-sm border transition-all ${
          active
            ? 'bg-gradient-to-b from-white/40 to-white/20 border-white/40 shadow-inner'
            : 'bg-gradient-to-b from-white/20 to-white/10 border-white/20 hover:from-white/30 hover:to-white/15'
        }`}
      >
        <span className="opacity-90">{icon}</span>
        <span className="text-[12px]">{label}</span>
        {active && <span className="absolute inset-x-2 bottom-0 h-[2px] bg-white/70 rounded-sm" />}
      </button>
    );
  };

  const renderApp = (id: AppId) => {
    switch (id) {
      case 'notes': return <NotesApp />;
      case 'calc': return <CalculatorApp />;
      case 'explorer': return <ExplorerApp />;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden" style={{
      background: `linear-gradient(135deg, #0c2340 0%, #0a1b31 40%, #05101f 100%), radial-gradient(circle at 30% 30%, rgba(40, 100, 180, 0.35), transparent 50%)`,
    }}>
      {/* Desktop icons */}
      <div className="absolute inset-0 p-4 select-none">
        <div className="grid grid-cols-1 gap-6">
          <button onDoubleClick={() => launch('explorer')} className="flex flex-col items-center w-20 gap-2 text-white/90 hover:text-white">
            <div className="w-14 h-12 bg-gradient-to-b from-blue-300/70 to-blue-500/70 border border-white/20 rounded-md shadow-md flex items-center justify-center">
              <Folder />
            </div>
            <span className="text-[12px] drop-shadow">Libraries</span>
          </button>
          <button onDoubleClick={() => launch('notes')} className="flex flex-col items-center w-20 gap-2 text-white/90 hover:text-white">
            <div className="w-14 h-12 bg-gradient-to-b from-yellow-200/80 to-yellow-300/80 border border-white/20 rounded-md shadow-md flex items-center justify-center">
              <StickyNote />
            </div>
            <span className="text-[12px] drop-shadow">Sticky Notes</span>
          </button>
          <button onDoubleClick={() => launch('calc')} className="flex flex-col items-center w-20 gap-2 text-white/90 hover:text-white">
            <div className="w-14 h-12 bg-gradient-to-b from-gray-200/80 to-gray-300/80 border border-white/20 rounded-md shadow-md flex items-center justify-center">
              <Calculator />
            </div>
            <span className="text-[12px] drop-shadow">Calculator</span>
          </button>
        </div>
      </div>

      {/* Windows */}
      {(['explorer', 'notes', 'calc'] as AppId[]).map((id) => {
        const w = windows[id];
        if (!w || w.minimized) return null;
        return (
          <Rnd
            key={id}
            size={{ width: w.size.width, height: w.size.height }}
            position={{ x: w.position.x, y: w.position.y }}
            minWidth={260}
            minHeight={200}
            bounds="window"
            dragHandleClassName="win7-titlebar"
            cancel=".no-drag"
            onDragStart={() => bringToFront(id)}
            onDragStop={(_, d) => setWindows((cur) => ({ ...cur, [id]: { ...cur[id], position: { x: d.x, y: d.y } } }))}
            onResizeStop={(_, __, ref, ___, pos) => setWindows((cur) => ({
              ...cur,
              [id]: {
                ...cur[id],
                size: { width: ref.offsetWidth, height: ref.offsetHeight },
                position: { x: pos.x, y: pos.y },
              },
            }))}
            enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true }}
            style={{
              zIndex: w.zIndex,
              borderRadius: 6,
              boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(240,240,240,0.95))',
            }}
          >
            <div className="w-full h-full flex flex-col" style={{ borderRadius: 6 }}>
              <TitleBar
                title={w.title}
                icon={w.icon}
                onMinimize={() => setWindows((cur) => ({ ...cur, [id]: { ...cur[id], minimized: true } }))}
                onClose={() => closeWindow(id)}
                onFocus={() => bringToFront(id)}
              />
              <div className="flex-1 overflow-hidden">
                {renderApp(id)}
              </div>
            </div>
          </Rnd>
        );
      })}

      {/* Taskbar */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[46px] px-3 flex items-center gap-2 relative"
        style={{
          background: `linear-gradient(to top, ${win7Blue}, ${win7BlueLight})`,
          borderTop: `1px solid ${taskbarBorder}`,
          boxShadow: '0 -1px 0 rgba(0,0,0,0.4) inset, 0 -4px 16px rgba(0,0,0,0.35)'
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 pointer-events-none" />

        {/* Start Button */}
        <div className="relative mr-2">
          <button
            onClick={toggleStart}
            className="h-10 w-10 -mt-3 rounded-full bg-[radial-gradient(circle_at_30%_30%,#aaf27d,transparent_60%),linear-gradient(to_bottom,#6bcf4a,#2a8f2b)] border border-white/70 shadow-[0_4px_8px_rgba(0,0,0,0.4)] flex items-center justify-center"
            title="Start"
          >
            <ChevronUp className={`text-white drop-shadow transition-transform ${startOpen ? 'rotate-180' : ''}`} />
          </button>
          {startOpen && (
            <div
              className="absolute bottom-[50px] left-0 w-[720px] rounded-md overflow-hidden"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.98), rgba(240,240,240,0.98))',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.45)'
              }}
            >
              <div className="p-3 border-b border-black/10">
                <input
                  className="w-full text-sm px-2 py-1 bg-white/80 border border-black/10 rounded-sm outline-none no-drag"
                  placeholder="Search programs and files"
                />
              </div>
              <div className="grid grid-cols-[260px_1fr] gap-0">
                <div className="p-2 border-r border-black/10">
                  <div className="text-[12px] uppercase tracking-wide text-black/60 px-2 py-1">Recently used</div>
                  <div className="flex flex-col text-sm">
                    {['Word','OneDrive','PowerPoint','Adobe Premiere Pro CC','Adobe Photoshop CC','Calendar','Calculator','Clock','Contacts','Files'].map((name) => (
                      <button key={name} className="text-left px-2 py-[6px] hover:bg-black/5 rounded no-drag">{name}</button>
                    ))}
                  </div>
                </div>
                <div className="p-3 grid grid-cols-3 gap-3 text-sm">
                  <button onClick={() => launch('explorer')} className="px-3 py-4 bg-gradient-to-b from-sky-200 to-sky-300 border border-white/60 rounded hover:from-sky-100 no-drag">Libraries</button>
                  <button onClick={() => launch('notes')} className="px-3 py-4 bg-gradient-to-b from-yellow-200 to-yellow-300 border border-white/60 rounded hover:from-yellow-100 no-drag">Sticky Notes</button>
                  <button onClick={() => launch('calc')} className="px-3 py-4 bg-gradient-to-b from-gray-200 to-gray-300 border border-white/60 rounded hover:from-gray-100 no-drag">Calculator</button>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-xs border-t border-black/10 bg-gradient-to-b from-gray-50 to-gray-100">
                <span className="text-black/60">Ethan</span>
                <button className="flex items-center gap-1 px-2 py-1 hover:bg-black/5 rounded">
                  <Power size={12} /> Shut down
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pinned Icons */}
        <div className="flex items-center gap-2 ml-1">
          <TaskbarButton id="explorer" label="Libraries" icon={<Folder size={14} />} />
          <TaskbarButton id="notes" label="Sticky Notes" icon={<StickyNote size={14} />} />
          <TaskbarButton id="calc" label="Calculator" icon={<Calculator size={14} />} />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* System tray */}
        <div className="flex items-center gap-3 text-white/90 text-[12px]">
          <Wifi size={16} className="opacity-90" />
          <Volume2 size={16} className="opacity-90" />
          <Battery size={16} className="opacity-90" />
          <div className="text-right leading-4">
            <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-white/75 text-[10px] -mt-0.5">{new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
          </div>
        </div>

        {/* Show desktop */}
        <div className="ml-3 h-[28px] w-[8px] rounded-sm bg-white/30 hover:bg-white/50 border border-white/40" title="Show desktop" />
      </div>
    </div>
  );
}