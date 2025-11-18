"use client";

import { useState, useRef, useEffect } from "react";
import ImageInput from "~/components/ImageInput";
import ImageCard from "~/components/ImageCard";
import DownloadButton from "~/components/DownloadButton";
import { useLocalStorage } from "~/hooks/useLocalStorage";

export default function HomePage() {
  const [imageUrls, setImageUrls] = useState([""]);
  const [backgroundColor, setBackgroundColor] = useState("#f0f4f8");
  const [imageWidth, setImageWidth] = useState(600);
  const [imageHeight, setImageHeight] = useState(400);
  const [backgroundWidth, setBackgroundWidth] = useState(800);
  const [borderRadius, setBorderRadius] = useState(16);
  const [shadow, setShadow] = useState(2);
  const [fanRotation, setFanRotation] = useState(30);
  const [fanSpacing, setFanSpacing] = useState(80);
  const [fanVerticalHeightDiff, setFanVerticalHeightDiff] = useState(0.3);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [imageRotate, setImageRotate] = useState(0);
  const [aspectRatioLocked, setAspectRatioLocked] = useState(false);
  const [lockedAspectRatio, setLockedAspectRatio] = useState(600 / 400);
  const [savedDocuments, setSavedDocuments] = useLocalStorage(
    "savedDocuments",
    [],
  );
  const [savedConfigurations, setSavedConfigurations] = useLocalStorage(
    "savedConfigurations",
    [],
  );
  const [saveDocumentTitle, setSaveDocumentTitle] = useState("");
  const [saveConfigTitle, setSaveConfigTitle] = useState("");
  const [showDocumentsSection, setShowDocumentsSection] = useState(false);
  const [showConfigurationsSection, setShowConfigurationsSection] =
    useState(false);
  const cardRef = useRef(null);
  const displayAreaRef = useRef(null);

  const saveCurrentDocument = () => {
    if (!saveDocumentTitle.trim()) return;

    const document = {
      id: Date.now().toString(),
      title: saveDocumentTitle.trim(),
      imageUrls: [...imageUrls],
      backgroundColor,
      imageWidth,
      imageHeight,
      backgroundWidth,
      borderRadius,
      shadow,
      fanRotation,
      fanSpacing,
      fanVerticalHeightDiff,
      translateX,
      translateY,
      imageRotate,
    };

    setSavedDocuments([...savedDocuments, document]);
    setSaveDocumentTitle("");
  };

  const saveCurrentConfiguration = () => {
    if (!saveConfigTitle.trim()) return;

    const config = {
      id: Date.now().toString(),
      title: saveConfigTitle.trim(),
      backgroundColor,
      imageWidth,
      imageHeight,
      backgroundWidth,
      borderRadius,
      shadow,
      fanRotation,
      fanSpacing,
      fanVerticalHeightDiff,
      translateX,
      translateY,
      imageRotate,
    };

    setSavedConfigurations([...savedConfigurations, config]);
    setSaveConfigTitle("");
  };

  const loadDocument = (document) => {
    setImageUrls(document.imageUrls || [""]);
    setBackgroundColor(document.backgroundColor || "#f0f4f8");
    setImageWidth(document.imageWidth || 600);
    setImageHeight(document.imageHeight || 400);
    const bgSize = document.backgroundWidth || 800;
    setBackgroundWidth(bgSize);
    setBorderRadius(document.borderRadius || 16);
    setShadow(document.shadow || 2);
    setFanRotation(document.fanRotation || 30);
    setFanSpacing(document.fanSpacing || 80);
    setFanVerticalHeightDiff(document.fanVerticalHeightDiff || 0.3);
    setTranslateX(document.translateX || 0);
    setTranslateY(document.translateY || 0);
    setImageRotate(document.imageRotate || 0);
  };

  const loadConfiguration = (config) => {
    setBackgroundColor(config.backgroundColor || "#f0f4f8");
    setImageWidth(config.imageWidth || 600);
    setImageHeight(config.imageHeight || 400);
    const bgSize = config.backgroundWidth || 800;
    setBackgroundWidth(bgSize);
    setBorderRadius(config.borderRadius || 16);
    setShadow(config.shadow || 2);
    setFanRotation(config.fanRotation || 30);
    setFanSpacing(config.fanSpacing || 80);
    setFanVerticalHeightDiff(config.fanVerticalHeightDiff || 0.3);
    setTranslateX(config.translateX || 0);
    setTranslateY(config.translateY || 0);
    setImageRotate(config.imageRotate || 0);
  };

  const deleteDocument = (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setSavedDocuments(savedDocuments.filter((doc) => doc.id !== id));
    }
  };

  const deleteConfiguration = (id) => {
    if (window.confirm("Are you sure you want to delete this configuration?")) {
      setSavedConfigurations(
        savedConfigurations.filter((config) => config.id !== id),
      );
    }
  };

  const updateImageUrl = (index, url) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  const addImageInput = () => {
    setImageUrls([...imageUrls, ""]);
  };

  /**
   * @param {number} index
   */
  const removeImageInput = (index) => {
    if (imageUrls.length > 1) {
      if (window.confirm("Are you sure you want to remove this image URL?")) {
        const newUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newUrls);
      }
    }
  };

  const clearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all settings? This will not delete your saved documents or configurations. ",
      )
    ) {
      setImageUrls([""]);
      setBackgroundColor("#f0f4f8");
      setImageWidth(600);
      setImageHeight(400);
      setBackgroundWidth(800);
      setBorderRadius(16);
      setShadow(2);
      setFanRotation(30);
      setFanSpacing(80);
      setFanVerticalHeightDiff(0.3);
      setTranslateX(0);
      setTranslateY(0);
      setImageRotate(0);
    }
  };

  const hasImages = imageUrls.some((url) => url.trim() !== "");
  const hasMultipleImages =
    imageUrls.filter((url) => url.trim() !== "").length > 1;

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasImages) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasImages]);

  return (
    <main className="flex min-h-screen">
      <div className="sticky top-0 h-screen w-[416px] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Photo Framer</h1>
            <button
              onClick={clearAll}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <button
                onClick={() => setShowDocumentsSection(!showDocumentsSection)}
                className="flex w-full items-center justify-between rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-left transition-colors hover:bg-gray-50"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Saved Documents
                </label>
                <span className="text-xs text-gray-500">
                  {showDocumentsSection ? "−" : "+"}
                </span>
              </button>
              {showDocumentsSection && (
                <div className="space-y-2 rounded-lg border-2 border-gray-300 bg-gray-50 p-3">
                  {savedDocuments.length > 0 && (
                    <div className="max-h-48 space-y-2 overflow-y-auto">
                      {savedDocuments.map((document) => (
                        <div
                          key={document.id}
                          className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-2"
                        >
                          <div className="flex-1 text-sm font-medium text-gray-700">
                            {document.title}
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => loadDocument(document)}
                              className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => deleteDocument(document.id)}
                              className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <button
                onClick={() =>
                  setShowConfigurationsSection(!showConfigurationsSection)
                }
                className="flex w-full items-center justify-between rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-left transition-colors hover:bg-gray-50"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Saved Configurations
                </label>
                <span className="text-xs text-gray-500">
                  {showConfigurationsSection ? "−" : "+"}
                </span>
              </button>
              {showConfigurationsSection && (
                <div className="space-y-2 rounded-lg border-2 border-gray-300 bg-gray-50 p-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={saveConfigTitle}
                      onChange={(e) => setSaveConfigTitle(e.target.value)}
                      placeholder="Configuration name..."
                      className="flex-1 rounded-lg border-2 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveCurrentConfiguration();
                        }
                      }}
                    />
                    <button
                      onClick={saveCurrentConfiguration}
                      className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                  {savedConfigurations.length > 0 && (
                    <div className="max-h-48 space-y-2 overflow-y-auto">
                      {savedConfigurations.map((config) => (
                        <div
                          key={config.id}
                          className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-2"
                        >
                          <div className="flex-1 text-sm font-medium text-gray-700">
                            {config.title}
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => loadConfiguration(config)}
                              className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => deleteConfiguration(config.id)}
                              className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Image URLs
                </label>
                <button
                  onClick={addImageInput}
                  className="rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-green-700"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <ImageInput
                      value={url}
                      onChange={(newUrl) => updateImageUrl(index, newUrl)}
                    />
                    {imageUrls.length > 1 && (
                      <button
                        onClick={() => removeImageInput(index)}
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-800/50 text-xs font-medium text-white transition-colors hover:bg-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Background Color
              </label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="h-12 w-full cursor-pointer rounded-lg border-2 border-gray-300 shadow-md"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Image Size
                  </h3>
                  <button
                    onClick={() => {
                      if (!aspectRatioLocked) {
                        setLockedAspectRatio(imageWidth / imageHeight);
                      }
                      setAspectRatioLocked(!aspectRatioLocked);
                    }}
                    className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                      aspectRatioLocked
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                  >
                    {aspectRatioLocked ? "🔒 Locked" : "🔓 Unlocked"}
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-600">
                        {aspectRatioLocked ? "Size" : "Width"}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={imageWidth}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              const clampedVal = Math.max(
                                100,
                                Math.min(2000, val),
                              );
                              setImageWidth(clampedVal);
                              if (aspectRatioLocked) {
                                setImageHeight(
                                  Math.round(clampedVal / lockedAspectRatio),
                                );
                              }
                            }
                          }}
                          className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs text-gray-500">×</span>
                        <input
                          type="number"
                          value={imageHeight}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              const clampedVal = Math.max(
                                100,
                                Math.min(2000, val),
                              );
                              setImageHeight(clampedVal);
                              if (aspectRatioLocked) {
                                setImageWidth(
                                  Math.round(clampedVal * lockedAspectRatio),
                                );
                              }
                            }
                          }}
                          className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs text-gray-500">px</span>
                        <button
                          onClick={() => {
                            setImageWidth(600);
                            setImageHeight(400);
                            if (aspectRatioLocked) {
                              setLockedAspectRatio(600 / 400);
                            }
                          }}
                          className="rounded bg-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-400"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      value={imageWidth}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setImageWidth(val);
                        if (aspectRatioLocked) {
                          setImageHeight(Math.round(val / lockedAspectRatio));
                        }
                      }}
                      min="100"
                      max="2000"
                      step="10"
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                    />
                  </div>
                  {!aspectRatioLocked && (
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="text-xs font-medium text-gray-600">
                          Height
                        </label>
                      </div>
                      <input
                        type="range"
                        value={imageHeight}
                        onChange={(e) => setImageHeight(Number(e.target.value))}
                        min="100"
                        max="2000"
                        step="10"
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                      />
                    </div>
                  )}
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-600">
                        Translate X
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={translateX}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              setTranslateX(Math.max(-500, Math.min(500, val)));
                            }
                          }}
                          className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs text-gray-500">px</span>
                        <button
                          onClick={() => setTranslateX(0)}
                          className="rounded bg-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-400"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      value={translateX}
                      onChange={(e) => setTranslateX(Number(e.target.value))}
                      min="-500"
                      max="500"
                      step="5"
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-600">
                        Translate Y
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={translateY}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              setTranslateY(Math.max(-500, Math.min(500, val)));
                            }
                          }}
                          className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs text-gray-500">px</span>
                        <button
                          onClick={() => setTranslateY(0)}
                          className="rounded bg-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-400"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      value={translateY}
                      onChange={(e) => setTranslateY(Number(e.target.value))}
                      min="-500"
                      max="500"
                      step="5"
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-600">
                        Rotate
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={imageRotate}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              setImageRotate(
                                Math.max(-180, Math.min(180, val)),
                              );
                            }
                          }}
                          className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs text-gray-500">°</span>
                        <button
                          onClick={() => setImageRotate(0)}
                          className="rounded bg-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-400"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      value={imageRotate}
                      onChange={(e) => setImageRotate(Number(e.target.value))}
                      min="-180"
                      max="180"
                      step="1"
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-600">
                        Border Radius
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={borderRadius}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              setBorderRadius(Math.max(0, Math.min(100, val)));
                            }
                          }}
                          className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs text-gray-500">px</span>
                        <button
                          onClick={() => setBorderRadius(16)}
                          className="rounded bg-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-400"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      value={borderRadius}
                      onChange={(e) => setBorderRadius(Number(e.target.value))}
                      min="0"
                      max="100"
                      step="1"
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-600">
                        Shadow
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={shadow}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              setShadow(Math.max(0, Math.min(5, val)));
                            }
                          }}
                          className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                        />
                        <button
                          onClick={() => setShadow(2)}
                          className="rounded bg-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-400"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      value={shadow}
                      onChange={(e) => setShadow(Number(e.target.value))}
                      min="0"
                      max="5"
                      step="0.5"
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                    />
                  </div>
                </div>
              </div>
              {hasMultipleImages && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Fan Layout
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="text-xs font-medium text-gray-600">
                          Rotation
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={fanRotation}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (!isNaN(val)) {
                                setFanRotation(Math.max(0, Math.min(90, val)));
                              }
                            }}
                            className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                          />
                          <span className="text-xs text-gray-500">°</span>
                          <button
                            onClick={() => setFanRotation(30)}
                            className="rounded bg-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-400"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                      <input
                        type="range"
                        value={fanRotation}
                        onChange={(e) => setFanRotation(Number(e.target.value))}
                        min="0"
                        max="90"
                        step="1"
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                      />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="text-xs font-medium text-gray-600">
                          Spacing
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={fanSpacing}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (!isNaN(val)) {
                                setFanSpacing(Math.max(0, Math.min(1000, val)));
                              }
                            }}
                            className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                          />
                          <span className="text-xs text-gray-500">px</span>
                          <button
                            onClick={() => setFanSpacing(80)}
                            className="rounded bg-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-400"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                      <input
                        type="range"
                        value={fanSpacing}
                        onChange={(e) => setFanSpacing(Number(e.target.value))}
                        min="0"
                        max="1000"
                        step="10"
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                      />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="text-xs font-medium text-gray-600">
                          Vertical Height Difference
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={fanVerticalHeightDiff}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (!isNaN(val)) {
                                setFanVerticalHeightDiff(
                                  Math.max(-2, Math.min(2, val)),
                                );
                              }
                            }}
                            step="0.1"
                            className="w-16 rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none"
                          />
                          <button
                            onClick={() => setFanVerticalHeightDiff(0.3)}
                            className="rounded bg-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-400"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                      <input
                        type="range"
                        value={fanVerticalHeightDiff}
                        onChange={(e) =>
                          setFanVerticalHeightDiff(Number(e.target.value))
                        }
                        min="-2"
                        max="2"
                        step="0.1"
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {hasImages && (
              <div className="space-y-2 pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const title = window.prompt("Enter document name:");
                      if (title && title.trim()) {
                        const document = {
                          id: Date.now().toString(),
                          title: title.trim(),
                          imageUrls: [...imageUrls],
                          backgroundColor,
                          imageWidth,
                          imageHeight,
                          backgroundWidth,
                          borderRadius,
                          fanRotation,
                          fanSpacing,
                          fanVerticalHeightDiff,
                          translateX,
                          translateY,
                          imageRotate,
                        };
                        setSavedDocuments([...savedDocuments, document]);
                      }
                    }}
                    className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-green-700 hover:shadow-xl"
                  >
                    Save Document
                  </button>
                  <DownloadButton
                    cardRef={displayAreaRef}
                    title="image-card"
                    backgroundWidth={backgroundWidth}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        ref={displayAreaRef}
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor }}
      >
        {imageUrls.length > 0 ? (
          <div className="flex min-h-screen flex-col items-center justify-start px-8 pt-8">
            <ImageCard
              imageUrls={imageUrls}
              backgroundColor={backgroundColor}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              backgroundWidth={backgroundWidth}
              borderRadius={borderRadius}
              shadow={shadow}
              fanRotation={fanRotation}
              fanSpacing={fanSpacing}
              fanVerticalHeightDiff={fanVerticalHeightDiff}
              translateX={translateX}
              translateY={translateY}
              imageRotate={imageRotate}
              cardRef={cardRef}
            />
          </div>
        ) : (
          <div className="flex min-h-screen items-center justify-center px-8">
            <p className="text-lg text-gray-500">
              Enter an image URL to get started
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
