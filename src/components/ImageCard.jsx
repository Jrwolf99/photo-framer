"use client";

export default function ImageCard({
  imageUrls,
  backgroundColor,
  imageWidth,
  imageHeight,
  backgroundWidth,
  borderRadius,
  shadow = 2,
  fanRotation = 30,
  fanSpacing = 80,
  fanVerticalHeightDiff = 0.3,
  translateX = 0,
  translateY = 0,
  imageRotate = 0,
  cardRef,
}) {
  if (imageUrls.length === 0) return null;

  const getFanStyle = (index, total) => {
    const padding = 16;
    const contentWidth = backgroundWidth - padding * 2;
    const contentHeight = backgroundWidth - padding * 2;

    if (total === 1) {
      return {
        position: "absolute",
        left: `${padding + contentWidth / 2}px`,
        top: `${padding + contentHeight / 2}px`,
        transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) rotate(${imageRotate}deg)`,
        zIndex: 1,
      };
    }

    const maxRotation = fanRotation;
    const rotationStep = (maxRotation * 2) / (total - 1);
    const rotation = -maxRotation + rotationStep * index;

    const centerX = padding + contentWidth / 2 + translateX;
    const centerY = padding + contentHeight / 2 + translateY;
    const offsetX = (index - (total - 1) / 2) * fanSpacing;
    const offsetY =
      Math.abs(index - (total - 1) / 2) *
      (fanSpacing * fanVerticalHeightDiff * 4);

    return {
      position: "absolute",
      left: `${centerX}px`,
      top: `${centerY}px`,
      transform: `translate(-50%, -50%) rotate(${rotation + imageRotate}deg) translate(${offsetX}px, ${offsetY}px)`,
      transformOrigin: "center center",
      zIndex: total - index,
    };
  };

  return (
    <div
      ref={cardRef}
      className="relative mx-auto p-4"
      style={{
        width: `${backgroundWidth}px`,
      }}
    >
      {imageUrls.map((imageUrl, index) => {
        const isEmpty = !imageUrl || imageUrl.trim() === "";
        return (
          <div
            key={index}
            className="overflow-hidden"
            style={{
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
              borderRadius: `${borderRadius}px`,
              boxShadow: `0 ${shadow * 4}px ${shadow * 6}px -${shadow}px rgba(0, 0, 0, 0.3), 0 ${shadow * 2}px ${shadow * 4}px -${shadow}px rgba(0, 0, 0, 0.2)`,
              ...getFanStyle(index, imageUrls.length),
            }}
          >
            {isEmpty ? (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <div className="text-center text-gray-400">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-xs">No image</p>
                </div>
              </div>
            ) : (
              <img
                src={imageUrl}
                alt={`Framed image ${index + 1}`}
                className="h-full w-full object-cover object-top"
                style={{ objectFit: "cover", objectPosition: "top" }}
                onError={(e) => {
                  if (e.target.crossOrigin) {
                    e.target.crossOrigin = null;
                    e.target.src = imageUrl;
                    return;
                  }
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EInvalid Image URL%3C/text%3E%3C/svg%3E";
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
