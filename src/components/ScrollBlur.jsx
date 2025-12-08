import "../style/ScrollBlur.css";

export default function ScrollBluR({
  height = "50px",      // visible height of the overlay
  blur = "5px",         // backdrop blur strength
  maskStart = "5%",     // where the fade becomes fully solid
  position = "bottom",   // "top" or "bottom"
}) {
  return (
    <div
      className="local-blur-wrapper"
      data-pos={position}
      style={{
        "--blur-height": height,
        "--blur-size": blur,
        "--mask-start": maskStart,
      }}
    >
      <div className="local-blur" />
    </div>
  );
}
