import { Feather } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center">
            <Feather className="w-6 h-6 text-paper" />
          </div>
          <div className="h-px w-16 bg-ink/30" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-ink mb-3 tracking-tight">
          打字机效果生成器
        </h1>
        <div className="h-px w-32 bg-accent-red/50 mx-auto mb-4" />
        <p className="text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
          让文字穿越时光，重现复古打字机的独特韵味。
          调整参数，创造属于你的怀旧文字作品。
        </p>
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="inline-block w-2 h-2 bg-accent-red rounded-full" />
          <span className="inline-block w-2 h-2 bg-ink/30 rounded-full" />
          <span className="inline-block w-2 h-2 bg-accent-red rounded-full" />
        </div>
      </div>
    </header>
  );
}
