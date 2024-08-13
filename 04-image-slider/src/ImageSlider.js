import { useEffect, useReducer } from "react";

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "fill",
  display: "block",
};

const initialState = {
  status: "loading",
  data: [],
  curIndex: 0,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataResolved":
      return {
        ...state,
        data: action.payload,
        status: "ready",
      };

    case "dataRejected":
      return {
        ...state,
        error: action.payload,
        status: "error",
      };

    case "prevImg":
      return {
        ...state,
        curIndex:
          state.curIndex === 0 ? state.data.length - 1 : state.curIndex--,
      };

    case "nextImg":
      return {
        ...state,
        curIndex:
          state.curIndex === state.data.length - 1 ? 0 : state.curIndex++,
      };

    case "chooseImg":
      return { ...state, curIndex: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

function ImageSlider({
  width = "600",
  height = "400",
  imagesNum = 10,
  buttonSize = 4,
}) {
  const imageSliderStyle = {
    width: `${width}px`,
    height: `${height}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: `${width / 100}px`,
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 0 20px black",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const URL = `https://picsum.photos/v2/list?page=2&limit=${imagesNum}`;
    async function getData() {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Something went wrong with data fetching");

        const data = await res.json();
        if (!data || data.length === 0) throw new Error("Data not found");

        dispatch({ type: "dataResolved", payload: data });
      } catch (error) {
        dispatch({ type: "dataRejected", payload: error.message });
      }
    }
    getData();
  }, [imagesNum]);

  useEffect(() => {
    const handleKeyDown = function (e) {
      if (e.key === "ArrowLeft") dispatch({ type: "prevImg" });
      if (e.key === "ArrowRight") dispatch({ type: "nextImg" });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={imageSliderStyle}>
      {state.status === "loading" && <div>Loading data...</div>}
      {state.status === "error" && <div>{state.error}</div>}
      {state.status === "ready" && (
        <>
          <img
            style={imageStyle}
            src={state.data[state.curIndex].download_url}
            alt=""
          ></img>
          <ArrowButton
            direction="left"
            size={buttonSize}
            onClick={() => dispatch({ type: "prevImg" })}
          />
          <ArrowButton
            direction="right"
            size={buttonSize}
            onClick={() => dispatch({ type: "nextImg" })}
          />
          <PaginationDots
            dotsNum={state.data.length}
            size={buttonSize}
            curIndex={state.curIndex}
            dispatch={dispatch}
          />
        </>
      )}
    </div>
  );
}
export default ImageSlider;

function ArrowButton({ direction, size, onClick }) {
  const arrowButtonStyle = {
    position: "absolute",
    cursor: "pointer",
    left: direction === "left" && "5%",
    right: direction === "right" && "5%",
    fontSize: `${size * 6}px`,
    borderRadius: `${size * 0.5}px`,
    aspectRatio: 1,
    padding: `${size / 2}px ${size * 2}px`,
    border: "none",
    opacity: "0.75",
  };

  return (
    <button style={arrowButtonStyle} onClick={onClick}>
      {direction === "left" ? <>&larr;</> : <>&rarr;</>}
    </button>
  );
}

function PaginationDots({ dotsNum, size, curIndex, dispatch }) {
  const paginationStyle = {
    display: "flex",
    gap: `${size * 2}px`,
    position: "absolute",
    bottom: "5%",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const dotStyle = {
    width: `${size * 5}px`,
    aspectRatio: "1",
    backgroundColor: "white",
    opacity: "0.75",
    cursor: "pointer",
    borderRadius: `${size * 0.5}px`,
  };

  return (
    <div style={paginationStyle}>
      {Array.from({ length: dotsNum }, (_, i) => (
        <span
          key={i}
          style={
            curIndex !== i
              ? dotStyle
              : { ...dotStyle, backgroundColor: "black", opacity: "1" }
          }
          onClick={() => dispatch({ type: "chooseImg", payload: i })}
        ></span>
      ))}
    </div>
  );
}
