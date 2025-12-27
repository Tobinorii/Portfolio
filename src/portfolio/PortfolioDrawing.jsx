import { useRef, useState, useEffect } from "react";
import ScrollBlur from "../components/ScrollBlur";

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
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing1.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing3.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing11.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing4.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing14.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing2.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing5.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing9.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing8.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing10.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing12.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing13.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing6.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing15.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing16.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing17.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing18.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing7.png" /></div>
              <div className="masonry-drawing"><img src="src/assets/drawing/drawing19.png" /></div>
            </div>

          </section>
        </div>
      </div>

      <ScrollBlur position="bottom" height="200px" blur="25px" maskStart="100%" />
    </>
  );
}
