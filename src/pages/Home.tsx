import { useRef } from 'react';
import { ControlPanel } from '../components/ControlPanel';
import Preview, { PreviewHandle } from '../components/Preview';
import ExportButtons from '../components/Export/ExportButtons';

export default function Home() {
  const previewRef = useRef<PreviewHandle>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-paper via-amber-50/30 to-paper">
      <header className="py-6 px-4 border-b border-ink/10 bg-paper/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-ink text-center">
            打字机效果生成器
          </h1>
          <p className="text-center text-ink/60 mt-2">
            让文字穿越时光，重现复古打字机的韵味
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-96 flex-shrink-0">
            <ControlPanel />
          </aside>

          <section className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">预览效果</h2>
              <ExportButtons previewRef={previewRef} />
            </div>

            <div className="flex-1 flex items-start justify-center bg-ink/5 rounded-xl p-4 md:p-8 min-h-[600px]">
              <Preview ref={previewRef} />
            </div>
          </section>
        </div>
      </main>

      <footer className="py-4 px-4 text-center text-ink/50 text-sm border-t border-ink/10">
        <p>打字机效果生成器 — 留住岁月的墨迹</p>
      </footer>
    </div>
  );
}