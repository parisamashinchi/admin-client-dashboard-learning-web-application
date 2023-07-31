import React from "react";
import ImageLoader from "components/uiElements/imageLoader";
import ImagePreview from "components/imagePreview";
import { themeVar } from "theme/injectGlobal";

export function imageRender(src, alt, large = false) {
  const largeStyle = {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: themeVar.border,
    margin: 0,
  };
  const smallStyle = {
    width: 30,
    height: 30,
    objectFit: "cover",
    borderRadius: themeVar.border,
    margin: 0,
  };
  return (
    <ImagePreview
      style={large ? largeStyle : smallStyle}
      imageUrl={src}
      alt={alt}
    />
  );
}
