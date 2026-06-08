import React, { RefObject, useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { exportAsImage, triggerPrint } from '../../utils/exportUtils';
import type { PreviewHandle } from '../Preview';

interface ExportButtonsProps {
  previewRef: RefObject<PreviewHandle>;
}

export default function ExportButtons({ previewRef }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportImage = async () => {
    const contentElement = previewRef.current?.getContentElement();
    if (!contentElement) return;

    previewRef.current?.stopAnimation();

    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      const timestamp = new Date().toISOString().slice(0, 10);
      await exportAsImage(contentElement, `typewriter-letter-${timestamp}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    previewRef.current?.stopAnimation();
    triggerPrint();
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleExportImage}
        disabled={isExporting}
        className="flex items-center gap-2 px-5 py-2.5 bg-ink text-paper rounded-lg hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg font-medium"
      >
        <Download size={18} />
        <span>{isExporting ? '导出中...' : '导出图片'}</span>
      </button>

      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-5 py-2.5 border-2 border-ink text-ink bg-transparent rounded-lg hover:bg-ink hover:text-paper transition-all duration-200 shadow-md hover:shadow-lg font-medium"
      >
        <Printer size={18} />
        <span>打印</span>
      </button>
    </div>
  );
}
