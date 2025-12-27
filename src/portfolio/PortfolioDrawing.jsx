import { useRef, useState, useEffect } from "react";
import ScrollBlur from "../components/ScrollBlur";

import draw1 from "../assets/drawing/drawing1.png";
import draw2 from "../assets/drawing/drawing2.png";
import draw3 from "../assets/drawing/drawing3.png";
import draw4 from "../assets/drawing/drawing4.png";
import draw5 from "../assets/drawing/drawing5.png";
import draw6 from "../assets/drawing/drawing6.png";
import draw7 from "../assets/drawing/drawing7.png";
import draw8 from "../assets/drawing/drawing8.png";
import draw9 from "../assets/drawing/drawing9.png";
import draw10 from "../assets/drawing/drawing10.png";
import draw11 from "../assets/drawing/drawing11.png";
import draw12 from "../assets/drawing/drawing12.png";
import draw13 from "../assets/drawing/drawing13.png";
import draw14 from "../assets/drawing/drawing14.png";
import draw15 from "../assets/drawing/drawing15.png";
import draw16 from "../assets/drawing/drawing16.png";
import draw17 from "../assets/drawing/drawing17.png";
import draw18 from "../assets/drawing/drawing18.png";
import draw19 from "../assets/drawing/drawing19.png";

export default function PortfolioDrawing() {
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  const [navSticky, setNavSticky] = useState(false);

  const scrollTo = (ref) => {
    setNavSticky(true);
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const container = contentRef.current;

    const onScroll = () => {
      const headingBottom =
        headingRef.current.getBoundingClientRect().bottom;

      setNavSticky(headingBottom <= 0);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div id="drawing" className="portfolio-area">
        <div ref={contentRef} className="portfolio-scroll">

          <div ref={headingRef} className="portfolio-heading drawing">
            <h1>Digital Artworks</h1>
          </div>

          <section className="portfolio-section drawing">
            <div className="section-text drawing">
              <h2>Drawings</h2>
              <p>
                I create my illustrations using IbisPaint on a Samsung tablet.
                My art style ranges from cute to sensual themes. My process usually
                starts with basic shapes and silhouettes, followed by rough sketches,
                linework, and rendering. I mainly use textured brushes because I
                prefer a jagged, organic look rather than perfectly smooth lines.
                Some of the works showcased are a mix of original pieces, fanart,
                and commissioned work.
              </p>
            </div>

            <div className="masonry-grid">
              
              <div className="masonry-drawing"><img src={draw1} /></div>
              <div className="masonry-drawing"><img src={draw3} /></div>
              <div className="masonry-drawing"><img src={draw11} /></div>
              <div className="masonry-drawing"><img src={draw4} /></div>
              <div className="masonry-drawing"><img src={draw14} /></div>
              <div className="masonry-drawing"><img src={draw2} /></div>
              <div className="masonry-drawing"><img src={draw5} /></div>
              <div className="masonry-drawing"><img src={draw9} /></div>
              <div className="masonry-drawing"><img src={draw8} /></div>
              <div className="masonry-drawing"><img src={draw10} /></div>
              <div className="masonry-drawing"><img src={draw12} /></div>
              <div className="masonry-drawing"><img src={draw13} /></div>
              <div className="masonry-drawing"><img src={draw6} /></div>
              <div className="masonry-drawing"><img src={draw15} /></div>
              <div className="masonry-drawing"><img src={draw16} /></div>
              <div className="masonry-drawing"><img src={draw17} /></div>
              <div className="masonry-drawing"><img src={draw18} /></div>
              <div className="masonry-drawing"><img src={draw7} /></div>
              <div className="masonry-drawing"><img src={draw19} /></div>

            </div>

          </section>
        </div>
      </div>

      <ScrollBlur position="bottom" height="200px" blur="25px" maskStart="100%" />
    </>
  );
}
