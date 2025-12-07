import { useEffect, useState } from "react";
import "../style/Portfolio.css";
import ScrollBlur from "../components/ScrollBlur";

export default function PortfolioWindow() {
  const [activeTab, setActiveTab] = useState("programming");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    scrollToSection(tabId);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // inside PortfolioWindow component (React)
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
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <>
      <div className="window-header-menu portfolio">
        <div className="back-forward-btn">
          <img
            src="/back.png"
            onClick={() => handleTabClick("programming")}
          />
          <img
            src="/forward.png"
            onClick={() => handleTabClick("digitalart")}
          />
        </div>

        <div className="search-bar">
          <img src="/browsericon.png" className="search-bar-btn" /> <p>http://MineSpace.com/fortugaliza</p>
        </div>

        <img src="/restart.png" className="search-bar-btn" />
        <img src="/question.png" className="search-bar-btn" />
      </div>

      <div className="browser-tab-wrapper">
        <button
          className={`browser-tab-btn ${activeTab === "programming" ? "active" : ""}`}
          onClick={() => handleTabClick("programming")}
        >
          <img src="/browsericon.png" />Programming
        </button>

        <button
          className={`browser-tab-btn ${activeTab === "digitalart" ? "active" : ""}`}
          onClick={() => handleTabClick("digitalart")}
        >
          <img src="/browsericon.png" />Digital Art
        </button>
      </div>

      <div className="portfolio-banner">
        <img src="/minespace.png" />
      </div>

      <div className="portfolio-area">

        <div className="portfolio-programming" id="programming">
          <h1>PROGRAMMING PROJECTS</h1>

          <div className="programming-image-card">
            <img src="/portfolio-noteably.png" className="programming-image-bg" />
            <div className="programming-image-overlay">
              <h2 className="programming-image-title">NOTEably</h2>
              <p className="programming-image-caption">This is a short caption describing the project.</p>
              <button className="programming-image-btn">View More</button>
            </div>
          </div>

          <div className="programming-image-card">
            <img src="/portfolio-iskolair.png" className="programming-image-bg" />
            <div className="programming-image-overlay">
              <h2 className="programming-image-title">IskoLAIR</h2>
              <p className="programming-image-caption">This is a short caption describing the project.</p>
              <button className="programming-image-btn">View More</button>
            </div>
          </div>

          <div className="programming-image-card">
            <img src="/portfolio-porcie.png" className="programming-image-bg" />
            <div className="programming-image-overlay">
              <h2 className="programming-image-title">Porcie</h2>
              <p className="programming-image-caption">This is a short caption describing the project.</p>
              <button className="programming-image-btn">View More</button>
            </div>
          </div>
        </div>

        <div className="portfolio-digitalart" id="digitalart">
          <div className="digitalart-blog">
            <h1>DIGITAL ARTWORKS</h1>
            <p>Description here...</p>
          </div>

          <div className="digitalart-masonry">
            <img src="/art1.png" />
            <img src="/art2.png" />

            <img src="/art11.png" />
            <img src="/art5.png" />
            <img src="/art8.png" />

            <img src="/art10.png" />
            <img src="/art13.png" />
            <img src="/art9.png" />
          </div>
        </div>

        <ScrollBlur
          position="bottom"
          height="200px"
          blur="25px"
          maskStart="100%"
        />

      </div>

    </>
  );
}
