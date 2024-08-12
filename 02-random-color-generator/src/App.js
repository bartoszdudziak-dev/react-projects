import { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateHexColor() {
  //prettier-ignore
  const hexCharatcers = ["0","1","2","3","4","5","6","7","8","9", "A", "B","C","D", "E", "F"]
  let hexColor = "#";

  for (let i = 0; i < 6; i++) {
    hexColor += hexCharatcers[getRandomInt(hexCharatcers.length)];
  }
  return hexColor;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

function generateRgbColor() {
  const red = getRandomInt(256);
  const green = getRandomInt(256);
  const blue = getRandomInt(256);

  return `rgb(${red}, ${green}, ${blue})`;
}

function App() {
  const [colorType, setColorType] = useState("hex");
  const [color, setColor] = useState("#000000");
  const [isCopied, setIsCopied] = useState(false);

  const handleChangeColorType = function (type) {
    if (type === colorType) return;
    setIsCopied(false);
    setColorType(type);
    setColor(type === "hex" ? "#000000" : "rgba(0, 0, 0)");
  };

  const handleGenerateColor = function () {
    setColor(() =>
      colorType === "hex" ? generateHexColor() : generateRgbColor()
    );
    setIsCopied(false);
  };

  const handleCopyToClipboard = function (text) {
    copyToClipboard(text);
    setIsCopied(true);
  };

  return (
    <div className="app">
      <div className="buttons">
        <button
          className={`btn ${colorType === "rgb" ? "active" : ""}`}
          onClick={() => handleChangeColorType("rgb")}
          disabled={colorType === "rgb"}
        >
          RGB
        </button>
        <button className="btn" onClick={handleGenerateColor}>
          Generate
        </button>
        <button
          className={`btn ${colorType === "hex" ? "active" : ""}`}
          onClick={() => handleChangeColorType("hex")}
          disabled={colorType === "hex"}
        >
          HEX
        </button>
      </div>
      <div
        className="colorPreview"
        style={{ backgroundColor: color }}
        onClick={() => {
          handleCopyToClipboard(color);
        }}
      >
        <span className="tooltip">
          {isCopied ? "Copied!" : "Click to copy"}
        </span>
      </div>
      <p className="colorCode">{color}</p>
    </div>
  );
}

export default App;
