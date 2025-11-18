"use client";

import { toPng } from "html-to-image";

export default function DownloadButton({ cardRef, title, backgroundWidth }) {
  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const element = cardRef.current;
      const dataUrl = await toPng(element, {
        backgroundColor: null,
        pixelRatio: 2,
        cacheBust: true,
        
        width: element.scrollWidth || backgroundWidth,
        height: element.scrollHeight,
        style: {
          overflow: "visible",
        },
      });

      const link = document.createElement("a");
      link.download = `${title || "image-card"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
    >
      Download Card
    </button>
  );
}
