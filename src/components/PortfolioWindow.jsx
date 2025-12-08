import { useEffect, useState } from "react";
import "../style/Portfolio.css";
import ScrollBlur from "./ScrollBlur";
import ScrollFade from "./ScrollFade";

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
            src="/Portfolio/back.png"
            onClick={() => handleTabClick("programming")}
          />
          <img
            src="/Portfolio/forward.png"
            onClick={() => handleTabClick("digitalart")}
          />
        </div>

        <div className="search-bar">
          <img src="/Portfolio/browsericon.png" className="search-bar-btn" /> <p>http://MineSpace.com/blog/fortugaliza</p>
        </div>

        <img src="/Portfolio/restart.png" className="search-bar-btn" />
        <img src="/Portfolio/question.png" className="search-bar-btn" />
      </div>

      <div className="browser-tab-wrapper">
        <button
          className={`browser-tab-btn ${activeTab === "programming" ? "active" : ""}`}
          onClick={() => handleTabClick("programming")}
        >
          <img src="/Portfolio/browsericon.png" />Programming
        </button>

        <button
          className={`browser-tab-btn ${activeTab === "digitalart" ? "active" : ""}`}
          onClick={() => handleTabClick("digitalart")}
        >
          <img src="/Portfolio/browsericon.png" />Digital Art
        </button>
      </div>

      <div className="portfolio-banner">
        <img src="/Portfolio/minespace.png" />
      </div>

      <div className="portfolio-area">

        <div className="portfolio-programming" id="programming">
          <h1>PROGRAMMING PROJECTS</h1>

          <div className="programming-image-card noteably">
            <img src="/Portfolio/portfolio-noteably.png" className="programming-image-bg" />
            <div className="programming-image-overlay">
              <h2 className="programming-image-title">NOTEably</h2>
              <p className="programming-image-caption">An adorable notes app that combines to-do lists, a customizable
                timer, a built-in calendar, and organized note management through
                folders.</p>
              <button className="programming-image-btn">Take me there</button>
            </div>
          </div>

          <ScrollFade delay={100}>
            <div className="programming-image-card">
              <img src="/Portfolio/portfolio-iskolair.png" className="programming-image-bg" />
              <div className="programming-image-overlay">
                <h2 className="programming-image-title">IskoLAIR</h2>
                <p className="programming-image-caption">iskoLAIR is an all-in-one platform for DOST scholars and staff,
                  designed to streamline progress tracking, assignment submissions,
                  announcements, and more.</p>
                <button className="programming-image-btn">Take me there</button>
              </div>
            </div>
          </ScrollFade>

          <ScrollFade delay={200}>
            <div className="programming-image-card">
              <img src="/Portfolio/portfolio-porcie.png" className="programming-image-bg" />
              <div className="programming-image-overlay porcie">
                <h2 className="programming-image-title">Porcie</h2>
                <p className="programming-image-caption">Porcie is a pixel-style game where you wake up in a basement
                  after a date with a seemingly cute girl.</p>
                <button className="programming-image-btn">Take me there</button>
              </div>
            </div>
          </ScrollFade>

        </div>

        <div className="portfolio-digitalart" id="digitalart">
          <div className="digitalart-blog">

            <h1>DIGITAL ARTWORKS</h1>

            <p>
              I create my illustrations using IbisPaint on a Samsung tablet. My artwork ranges in style from cute and
              soft to mature or horror-inspired themes. I frequently reference images from Pinterest, especially when
              drawing the female form, which I find both visually appealing and central to many of my compositions.
            </p>

            <p>
              My empty canvas begins with basic shapes, establishing the overall silhouette before moving into a rough
              sketch. I then refine this into a cleanup sketch followed by final linework. I primarily use textured
              brushes, as I prefer a jagged, organic look over smooth, polished lines.
            </p>

            <p>
              In terms of subject matter, my work often emphasizes femininity and sensuality. Even when illustrating
              male characters, I depict them through a softer, more feminine gaze rather than emphasizing traditionally
              “tough” features. While I frequently create fanart of characters I enjoy, producing original pieces allows
              me to express personal emotions and explore themes more freely.
            </p>

            <p>
              For rendering, I primarily use cel shading and apply shadows manually, though I also practice Chinese-style
              rendering and experiment with gradient maps to expand my technique. My color workflow usually begins with
              intentionally dull or grayish tones, which I later refine by adjusting contrast and saturation during
              final touches.
            </p>

            <p>
              I do not label my layers, it is time consuming to label layers. I enjoy drawing hair, fabric folds, and
              even hands despite the majority of artists who despise it. Conversely, I find feet and more complex angles
              challenging and less enjoyable.
            </p>

            <p>
              The time I spend on each illustration varies depending on complexity. Larger, more detailed pieces can
              take one to two full days, while average-sized works typically take about an hour to complete.
            </p>
          </div>

          <div className="digitalart-masonry">
            <img src="/Portfolio/art1.png" />
            <img src="/Portfolio/art2.png" />

            <img src="/Portfolio/art11.png" />
            <img src="/Portfolio/art5.png" />
            <img src="/Portfolio/art8.png" />

            <img src="/Portfolio/art10.png" />
            <img src="/Portfolio/art13.png" />
            <img src="/Portfolio/art9.png" />
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
