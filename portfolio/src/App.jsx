import { useState, useEffect } from "react";
import DraggableWindow from "./components/DraggableWindow";
import "./App.css";
import "./index.css";

export default function App() {
  // windows array: { id, title, visible, minimized, pos }
  const [windows, setWindows] = useState([]);

  const defaultPos = { x: 100, y: 100 };

  const openWindow = ({ title, icon }) => {
    setWindows(prev => {
      const found = prev.find(w => w.title === title);

      if (found) {
        // restore if minimized or hidden
        return prev.map(w =>
          w.title === title
            ? { ...w, visible: true, minimized: false }
            : w
        );
      }

      // create new window
      return [
        ...prev,
        {
          id: Date.now(),
          title,
          icon,
          visible: true,
          minimized: false,
          pos: { ...defaultPos }
        }
      ];
    });
  };


  // toggle minimized (taskbar click)
  const toggleMinimize = (title) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.title === title ? { ...w, minimized: !w.minimized, visible: !w.minimized ? w.visible : true } : w
      )
    );
  };

  const closeWindow = (title) => {
    setWindows((prev) => prev.filter((w) => w.title !== title));
  };

  // update a window's position (called from DraggableWindow)
  const updateWindowPos = (title, newPos) => {
    setWindows((prev) => prev.map((w) => (w.title === title ? { ...w, pos: newPos } : w)));
  };

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      // Format time as HH:MM AM/PM
      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setTime(formatted);
    };

    updateClock(); // set initial time immediately
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const ICONS = {
    myComputer: { title: "My Computer", icon: "/mycomputer.png" },
    profilePic: { title: "Profile Pic", icon: "/imagelogo.png" },
    portfolio: { title: "Portfolio", icon: "/internetexplorer.png" },
    aboutMe: { title: "About Me", icon: "/notepad.png" },
  };


  return (
    <>
      <div className="body-wrapper">
        <div className="icon" onClick={() => openWindow({
          title: "My Computer",
          icon: "/mycomputer.png"
        })}>
          <img src="/mycomputer.png" />
          <p>My Computer</p>
        </div>

        <div className="icon" onClick={() => openWindow({
          title: "Profile Pic",
          icon: "/imagelogo.png"
        })}>
          <img src="/imagelogo.png" />
          <p>Profile Pic</p>
        </div>

        <div className="bottom-icons">
          <div className="icon" onClick={() => openWindow({
            title: "Portfolio",
            icon: "/internetexplorer.png"
          })}>
            <img src="/internetexplorer.png" />
            <p>Portfolio</p>
          </div>

          <div className="icon" onClick={() => openWindow({
            title: "About Me",
            icon: "/notepad.png"
          })}>
            <img src="/notepad.png" />
            <p>About Me</p>
          </div>
        </div>

        {/* Render draggable windows */}
        {windows.map((win) => (
          <DraggableWindow
            key={win.id}
            title={win.title}
            icon={win.icon}
            visible={win.visible}
            minimized={win.minimized}
            initialPos={win.pos}
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
            <div style={{ padding: 12 }}>
              <p>Content for {win.title}</p>
            </div>
          </DraggableWindow>
        ))}
      </div>

      {/* Footer / Start bar */}
      <footer>
        <div className="footer-tab-buttons">
          <button className="start-btn">
            <img src="/windowslogo.png" alt="Start" />
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

                    // 🔥 If minimized → restore + focus
                    if (w.minimized) {
                      return {
                        ...w,
                        minimized: false,
                        visible: true,
                        focused: Date.now(),
                      };
                    }

                    // 🔥 If already open → just bring to front
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
