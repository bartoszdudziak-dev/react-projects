import { useState } from "react";

export default function StarRating({
  maxRating = 10,
  defaultRating = 0,
  size = "40",
  gap = "1",
  fillColor = "#FFEA00",
  strokeColor = "#000000",
  strokeWidth = "1",
  desctription = true,
  className = "",
}) {
  const starRatingStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: `${size / 1.5}px`,
    gap: `${gap * 3}px`,
    color: fillColor,
  };

  const starsContainerStyle = {
    display: "flex",
    gap: `${gap}px`,
  };

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = function (newRating) {
    setRating(newRating !== rating ? newRating : 0);
  };

  return (
    <div style={starRatingStyle} className={className}>
      <div style={starsContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            size={size}
            fillColor={fillColor}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            isFill={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onEnter={() => setTempRating(i + 1)}
            onLeave={() => setTempRating(0)}
          />
        ))}
      </div>
      {desctription && tempRating ? (
        <span>{tempRating}</span>
      ) : (
        rating > 0 && <span>{rating}</span>
      )}
    </div>
  );
}

function Star({
  size,
  strokeColor,
  strokeWidth,
  fillColor,
  onRate,
  isFill,
  onEnter,
  onLeave,
}) {
  return (
    <span
      style={{ cursor: "pointer" }}
      onClick={onRate}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isFill ? fillColor : "none"}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-star"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    </span>
  );
}
