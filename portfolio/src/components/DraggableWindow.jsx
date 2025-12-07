import { useRef, useState, useEffect } from "react";
import "../style/DraggableWindow.css";

// global z-index
let highestZ = 10;

export default function DraggableWindow({
  title = "Window",
  icon = null,
  visible = true,
  minimized = false,
  initialPos = { x: 100, y: 100 },
  width = 100,         // default width
  height = 300,        // default height
  onPosChange = () => { },
  onMinimize = () => { },
  onClose = () => { },
  onFocus = () => { },
  children,
  // draggable = true,
}) {

  const winRef = useRef(null);

  // local position state (initialized from prop)
  const [pos, setPos] = useState(() => ({ ...initialPos }));

  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // z-index state
  const [zIndex, setZIndex] = useState(() => {
    highestZ++;
    return highestZ;
  });

  // If parent updates initialPos (e.g. when opening a closed window),
  // update local pos (but avoid overwriting while dragging).
  useEffect(() => {
    if (!dragging) {
      setPos({ ...initialPos });
    }
  }, [initialPos, dragging]);

  const bringToFront = () => {
    highestZ++;
    setZIndex(highestZ);
  };

  const startDrag = (e) => {
    // if (!draggable) return;
    bringToFront();
    e.preventDefault();
    const rect = winRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDragging(true);
  };

  // compute footer height if present
  const getFooterHeight = () => {
    const footer = document.querySelector("footer");
    return footer ? footer.getBoundingClientRect().height : 0;
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e) => {
      const winEl = winRef.current;
      if (!winEl) return;

      const viewportW = document.documentElement.clientWidth;
      const viewportH = document.documentElement.clientHeight;
      const footerH = getFooterHeight();

      const winW = winEl.offsetWidth;
      const winH = winEl.offsetHeight;

      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      newX = clamp(newX, 0, viewportW - winW);
      newY = clamp(newY, 0, viewportH - footerH - winH);

      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setDragging(false);
      // report final position to parent
      onPosChange(pos);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, offset, pos]); // include pos so onPosChange uses latest

  // Do not render when not visible OR minimized
  if (!visible || minimized) return null;

  return (
    <div
      ref={winRef}
      className="draggable-window"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        position: "fixed",
        zIndex: zIndex,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onMouseDown={() => {
        bringToFront();
        onFocus && onFocus();
      }}

    >
      <div
        className="window-header"
        onMouseDown={startDrag}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const rect = winRef.current.getBoundingClientRect();
          setOffset({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
          });
          setDragging(true);
          bringToFront();
        }}
      >
      <div className="window-icon-title">
        {icon && <img className="window-icon" src={icon} alt={title} />}
        <p className="title-text">{title}</p>
      </div>

        <div className="window-action-buttons">
          <button
            className="minimize-btn"
            onClick={(ev) => {
              ev.stopPropagation();
              onMinimize();
            }}
          >
            <img src="/minimize.png" alt="Minimize" />
          </button>

          {/* <button className="maximize-btn">
            <img src="/maximize.png" alt="Maximize" />
          </button> */}

          {/* close */}
          <button
            className="close-btn"
            onClick={(ev) => {
              ev.stopPropagation();
              onClose();
            }}
          >
            <img src="/exit.png" alt="Exit" />
          </button>
        </div>
      </div>

      <div className="window-content">
        {children}
      </div>
    </div>
  );
}
