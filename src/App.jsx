import { useState, useEffect } from "react";
import DraggableWindow from "./components/DraggableWindow";
import "./App.css";
import "./index.css";

import ProfilePicWindow from "./components/ProfilePicWindow";
import AboutMeWindow from "./components/AboutMeWindow";
import PortfolioWindow from "./components/PortfolioWindow";

import Background from "/Portfolio/tempwallpaper.jpg";

export default function App() {
  // windows array: { id, title, visible, minimized, pos, fullscreen, width, height }
  const [windows, setWindows] = useState([]);

  const defaultPos = { x: 100, y: 100 };

  const openWindow = ({ title, icon, width, height, fullscreen = false }) => {
    setWindows(prev => {
      const found = prev.find(w => w.title === title);

      if (found) {
        return prev.map(w =>
          w.title === title
            ? { ...w, visible: true, minimized: false, fullscreen: fullscreen || w.fullscreen }
            : w
        );
      }

      return [
        ...prev,
        {
          id: Date.now(),
          title,
          icon,
          visible: true,
          minimized: false,
          fullscreen: !!fullscreen,
          width: width ?? 400,
          height: height ?? 300,
          pos: fullscreen
          ? { x: 0, y: 0 }
          : getCenteredPos(width ?? 400, height ?? 300),
        }
      ];
    });
  };

  const getCenteredPos = (width, height) => {
    const x = (window.innerWidth - width) / 2;
    const y = (window.innerHeight - height) / 2;
    return { x, y };
  };

  const closeWindow = (title) => {
    setWindows((prev) => prev.filter((w) => w.title !== title));
  };

  const updateWindowPos = (title, newPos) => {
    setWindows((prev) => prev.map((w) => (w.title === title ? { ...w, pos: newPos } : w)));
  };

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="body-wrapper" style={{ backgroundImage: `url(${Background})` }}>
        {/* <div className="icon" onClick={() => openWindow({
          title: "My Computer",
          icon: "/mycomputer.png"
        })}>
          <img src="/mycomputer.png" />
          <p>My Computer</p>
        </div> */}

        <div className="icon" onClick={() => openWindow({
          title: "Browser",
          icon: "/Portfolio/internetexplorer.png",
          fullscreen: true
        })}>
          <img src="/Portfolio/internetexplorer.png" />
          <p>Browser</p>
        </div>

        <div className="bottom-icons">
          <div className="icon" onClick={() =>
            openWindow({
              title: "About Me",
              icon: "/Portfolio/notepad.png",
              width: 400,
              height: 400
            })
          }>
            <img src="/Portfolio/notepad.png" />
            <p>About Me</p>
          </div>

          <div className="icon" onClick={() =>
            openWindow({
              title: "Profile Pic",
              icon: "/Portfolio/imagelogo.png",
              width: 250,
              height: 365
            })
          }>
            <img src="/Portfolio/imagelogo.png" />
            <p>Profile Pic</p>
          </div>
        </div>

        {windows.map((win) => {
          const footerEl = typeof document !== "undefined" ? document.querySelector("footer") : null;
          const footerH = footerEl ? footerEl.getBoundingClientRect().height : 0;

          const winWidth = win.fullscreen ? window.innerWidth : (win.width || 400);
          const winHeight = win.fullscreen ? (window.innerHeight - footerH) : (win.height || 300);

          return (
            <DraggableWindow
              key={win.id}
              title={win.title}
              icon={win.icon}
              visible={win.visible}
              minimized={win.minimized}
              initialPos={win.pos}
              width={winWidth}
              height={winHeight}
              draggable={!win.fullscreen}
              onPosChange={(newPos) => updateWindowPos(win.title, newPos)}
              onMinimize={() =>
                setWindows((prev) => prev.map((w) => (w.title === win.title ? { ...w, minimized: true } : w)))
              }
              onClose={() => closeWindow(win.title)}
              onFocus={() => {
                setWindows(prev =>
                  prev.map(w =>
                    w.title === win.title ? { ...w, focused: Date.now() } : w
                  )
                );
              }}
            >
              {win.title === "About Me" && <AboutMeWindow />}
              {win.title === "Profile Pic" && <ProfilePicWindow />}
              {win.title === "Browser" && <PortfolioWindow />}
            </DraggableWindow>
          );
        })}
      </div>


      <footer>
        <div className="footer-tab-buttons">
          <button className="start-btn">
            <img src="/Portfolio/windowslogo.png" alt="Start" />
            <p>start</p>
          </button>

          {windows.map((win) => (
            <button
              key={win.id}
              className="taskbar-tab"
              onClick={() =>
                setWindows(prev =>
                  prev.map(w => {
                    if (w.title !== win.title) return w;

                    if (w.minimized) {
                      return {
                        ...w,
                        minimized: false,
                        visible: true,
                        focused: Date.now(),
                      };
                    }

                    return {
                      ...w,
                      visible: true,
                      focused: Date.now(),
                    };
                  })
                )
              }
            >
              {win.title}
            </button>
          ))}

          <div className="timer-tab">
            <p>{time}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
