import { useState, useEffect } from "react";
import DraggableWindow from "./components/DraggableWindow";
import "./App.css";
import "./index.css";

import AboutMeWindow from "./components/AboutMeWindow";
import ResumeWindow from "./components/ResumeWindow";
import PortfolioUiUx from "./portfolio/PortfolioUiUx";
import PortfolioFrontend from "./portfolio/PortfolioFrontend";
import PortfolioDrawing from "./portfolio/PortfolioDrawing";
import PortfolioGraphic from "./portfolio/PortfolioGraphic";
import PortfolioWindow from "./components/PortfolioWindow";

export default function App() {
  // windows array: { id, title, visible, minimized, pos, fullscreen, width, height }
  const [windows, setWindows] = useState([]);

  const [startOpen, setStartOpen] = useState(false);
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".start-btn") && !e.target.closest(".start-menu")) {
        setStartOpen(false);
      }
    };

    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  const PORTFOLIO_TABS = {
    "UI/UX": {
      id: "uiux",
      label: "UI / UX",
      component: PortfolioUiUx,
    },
    "Programming": {
      id: "programming",
      label: "Programming",
      component: PortfolioFrontend,
    },
    "Digital Art": {
      id: "digitalart",
      label: "Digital Art",
      component: PortfolioDrawing,
    },
    "Graphics": {
      id: "graphics",
      label: "Graphics",
      component: PortfolioGraphic,
    },
  };

  const openPortfolioTab = (tabTitle) => {
    setWindows(prev => {
      const existing = prev.find(w => w.type === "portfolio");

      if (existing) {
        return prev.map(w =>
          w.type === "portfolio"
            ? {
              ...w,
              visible: true,
              minimized: false,
              focused: Date.now(),
              tabs: [...new Set([...w.tabs, tabTitle])],
              activeTab: tabTitle,
            }
            : w
        );
      }

      return [
        ...prev,
        {
          id: Date.now(),
          type: "portfolio",
          title: "Browser - Portfolio",
          icon: "/Portfolio/internetexplorer.png",
          visible: true,
          minimized: false,
          fullscreen: true,
          tabs: [tabTitle],
          activeTab: tabTitle,
          pos: {
            x: window.innerWidth * 0.2, // position pa left
            y: 0,
          },
        },
      ];
    });
  };

  const openWindow = ({ title, icon, width, height }) => {
    setWindows(prev => {
      const existing = prev.find(w => w.title === title);

      if (existing) {
        return prev.map(w =>
          w.title === title
            ? {
              ...w,
              visible: true,
              minimized: false,
              focused: Date.now(),
            }
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
          fullscreen: false,
          width: width ?? 400,
          height: height ?? 300,
          pos: getCenteredPos(width ?? 400, height ?? 300),
        },
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

  const PORTFOLIO_TITLES = [
    "UI/UX",
    "Programming",
    "Digital Art",
    "Graphics",
  ];

  const getFooterTitle = (title) =>
    PORTFOLIO_TITLES.includes(title)
      ? "Browser - Portfolio"
      : title;

  return (
    <>
      <div className="body-wrapper">
        <div className="icon" onClick={() => openPortfolioTab("UI/UX")}>
          <img src="/Portfolio/iconuiux.png" />
          <p>UI/UX</p>
        </div>

        <div className="icon" onClick={() => openPortfolioTab("Programming")}>
          <img src="/Portfolio/iconfrontend.png" />
          <p>Programming</p>
        </div>

        <div className="mid-icons">
          <div className="icon" onClick={() => openPortfolioTab("Digital Art")}>
            <img src="/Portfolio/icondrawing.png" />
            <p>Digital Art</p>
          </div>

          <div className="icon" onClick={() =>
            openWindow({
              title: "Notepad",
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
              title: "Resume",
              icon: "/Portfolio/docu.png",
              width: 450,
              height: 600
            })
          }>
            <img src="/Portfolio/docu.png" />
            <p>Resume</p>
          </div>

        </div>

        <div className="bottom-icons">
          <div className="icon" onClick={() => openPortfolioTab("Graphics")}>
            <img src="/Portfolio/icongraphics.png" />
            <p>Graphics</p>
          </div>
        </div>

        {windows.map((win) => {
          const footerEl = document.querySelector("footer");
          const footerH = footerEl ? footerEl.getBoundingClientRect().height : 0;

          const winWidth = win.fullscreen ? window.innerWidth : (win.width || 400);
          const winHeight = win.fullscreen
            ? window.innerHeight - footerH
            : (win.height || 300);

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
                setWindows(prev =>
                  prev.map(w =>
                    w.id === win.id ? { ...w, minimized: true } : w
                  )
                )
              }
              onClose={() => closeWindow(win.title)}
              onFocus={() =>
                setWindows(prev =>
                  prev.map(w =>
                    w.id === win.id ? { ...w, focused: Date.now() } : w
                  )
                )
              }
            >
              {win.title === "Notepad" && <AboutMeWindow />}

              {win.title === "Resume" && <ResumeWindow />}

              {win.type === "portfolio" && (
                <PortfolioWindow
                  tabs={win.tabs.map(title => ({
                    id: PORTFOLIO_TABS[title].id,
                    label: PORTFOLIO_TABS[title].label,
                  }))}
                  defaultTab={PORTFOLIO_TABS[win.activeTab]?.id}
                  onCloseTab={(tabId) => {
                    setWindows(prev =>
                      prev.map(w => {
                        if (w.id !== win.id) return w;

                        // convert tabId -> title
                        const closedTitle = Object.keys(PORTFOLIO_TABS)
                          .find(key => PORTFOLIO_TABS[key].id === tabId);

                        const currentIndex = w.tabs.indexOf(closedTitle);
                        const newTabs = w.tabs.filter(t => t !== closedTitle);

                        let newActiveTab = w.activeTab;

                        // if the closed tab was active
                        if (w.activeTab === closedTitle) {
                          if (currentIndex > 0) {
                            // switch to tab on the LEFT
                            newActiveTab = newTabs[currentIndex - 1];
                          } else {
                            // otherwise switch to the FIRST remaining tab
                            newActiveTab = newTabs[0] || null;
                          }
                        }

                        return {
                          ...w,
                          tabs: newTabs,
                          activeTab: newActiveTab,
                        };
                      })
                    );
                  }}

                >
                  {(activeTab) => {
                    const entry = Object.values(PORTFOLIO_TABS)
                      .find(t => t.id === activeTab);

                    const Component = entry?.component;
                    return Component ? <Component /> : null;
                  }}
                </PortfolioWindow>
              )}
            </DraggableWindow>
          );
        })}

      </div>

      <footer>
        <div className="footer-tab-buttons">
          <button
            className="start-btn"
            onClick={() => setStartOpen(prev => !prev)}
          >
            <img src="/Portfolio/windowslogo.png" alt="Start" />
            <p>start</p>
          </button>

          {startOpen && (
            <div className="start-menu">
              <div className="start-menu-header">
                <img src="/Portfolio/profile.jpg" />
                <p>
                  Laura Alexia Jane L. Fortugaliza
                </p>
              </div>

              <div className="start-menu-wrapper">
                <div className="start-menu-content left">
                  <p>web still a WIP! :P</p>
                </div>
                <div className="start-menu-content right">
                  
                </div>
              </div>

            </div>
          )}

          {windows.map((win) => (
            <button
              key={win.id}
              className="taskbar-tab"
              onClick={() =>
                setWindows((prev) =>
                  prev.map((w) => {
                    if (w.id !== win.id) return w;

                    return {
                      ...w,
                      minimized: false,
                      visible: true,
                      focused: Date.now(),
                    };
                  })
                )
              }
            >
              {win.icon && (
                <img
                  src={win.icon}
                  alt={win.title}
                  className="taskbar-tab-icon"
                />
              )}

              <span className="taskbar-tab-title">
                {getFooterTitle(win.title)}
              </span>
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