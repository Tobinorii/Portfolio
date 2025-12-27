import { useEffect, useState } from "react";
import "../style/Portfolio.css";

export default function PortfolioWindow({
  tabs = [],
  defaultTab,
  onCloseTab,
  children
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    scrollToSection(tabId);
  };

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const TAB_URLS = {
    uiux: "ui_ux/",
    programming: "programming_projects/",
    digitalart: "digital_art/",
    graphics: "graphic_designs/",
  };

  const TAB_ICONS = {
    uiux: "/Portfolio/iconuiux.png",
    programming: "/Portfolio/iconfrontend.png",
    digitalart: "/Portfolio/icondrawing.png",
    graphics: "/Portfolio/icongraphics.png",
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const update = () => {
      const headerH = document.querySelector('.window-header-menu.portfolio')?.offsetHeight || 0;
      const tabsH = document.querySelector('.browser-tab-wrapper')?.offsetHeight || 0;
      const bannerH = document.querySelector('.portfolio-banner')?.offsetHeight || 0;
      const total = headerH + tabsH + bannerH;
      const el = document.querySelector('.portfolio-area');
      if (el) el.style.height = `calc(100vh - ${total}px - 80px)`;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      {/* HEADER */}
      <div className="window-header-menu portfolio">
        <div className="back-forward-btn">
          <img src="/Portfolio/back.png" />
          <img src="/Portfolio/forward.png" />
        </div>

        <div className="search-bar">
          <img
            src={TAB_ICONS[activeTab] || "/Portfolio/browsericon.png"}
            className="search-bar-btn"
          />
          <p>
            http://Portfolio.com/Fortugaliza/
            {TAB_URLS[activeTab] || ""}
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="browser-tab-wrapper">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`browser-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <img src={TAB_ICONS[tab.id] || "/Portfolio/browsericon.png"} />
            <span className="browser-tab-label">{tab.label}</span>
            {/* {tabs.length > 1 && (
              <span
                className="browser-tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
              >
                ×
              </span>
            )} */}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="portfolio-area">
        {typeof children === "function"
          ? children(activeTab)
          : children}
      </div>
    </>
  );
}
