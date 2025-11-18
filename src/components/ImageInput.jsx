"use client";

export default function ImageInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter image URL..."
      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm shadow-lg transition-colors focus:border-blue-500 focus:outline-none"
    />
  );
}
