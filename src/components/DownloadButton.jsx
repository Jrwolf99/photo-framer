"use client";

import { toPng } from "html-to-image";

export default function DownloadButton({ cardRef, title }) {
  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: null,
        pixelRatio: 2,
        cacheBust: true,
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
