import { useRef, useState, useEffect } from "react";
import ScrollBlur from "../components/ScrollBlur";

import logocoffee from "../assets/graphics/graphics-logocoffee.png";
import logocall from "../assets/graphics/graphics-logocal.png";
import logonote from "../assets/graphics/graphics-logonote.png";
import logoporc from "../assets/graphics/graphics-logoporc.png";

export default function PortfolioGraphic() {
  const logoRef = useRef(null);
  const miscRef = useRef(null);
  const posterRef = useRef(null);
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
      <div id="graphics" className="portfolio-area">
        <div ref={contentRef} className="portfolio-scroll">

          <div ref={headingRef} className="portfolio-heading graphics">
            <h1>Graphic Designs</h1>
          </div>

          <div className={`portfolio-nav graphics ${navSticky ? "sticky" : ""}`}>
            <span onClick={() => scrollTo(logoRef)}>Logos</span>
            <span onClick={() => scrollTo(miscRef)}>Misc</span>
            <span onClick={() => scrollTo(posterRef)}>Posters</span>
          </div>

          <section ref={logoRef} className="portfolio-section logos">
            <div className="section-text logos">
              <h2>Logos</h2>
              <p>
                These are logos I designed for my programming projects. I often
                handle playful and cute styles, but I also create clean and modern
                logos depending on the project’s tone and branding needs.
              </p>
            </div>

            <div className="image-row logos">
              <div className="image-tile logos">
                <img src={logocoffee} />
              </div>

              <div className="image-tile logos">
                <img src={logocall} />
              </div>
              <div className="image-tile logos">
                <img src={logonote} />
              </div>

              <div className="image-tile logos">
                <img src={logoporc} />
              </div>
            </div>
          </section>

          <section ref={miscRef} className="portfolio-section misc">
            <div className="section-text misc">
              <h2>Miscellaneous</h2>
              <p>
                These showcase my experience with sprites, mascots, and simple
                UI animations.
              </p>

              <p>
                Porcie, a walking sprite for our Java game project.
                WOF, a tween-animated mascot for our IT Business project EVTA,
                designed as an educational assistant for PWD users.
                And a frame-by-frame animated mascot for NOTEably that reacts to the
                password hide/unhide button
              </p>
            </div>

            <div className="image-row misc">
              <div className="image-tile misc hover-swap">
                <img className="static-img" src="src/assets/graphics/graphics-graphicsporc.png" />
                <img className="hover-gif" src="src/assets/graphics/graphics-g1.gif" />
              </div>

              <div className="image-tile misc hover-swap">
                <img className="static-img" src="src/assets/graphics/graphics-graphicswof.png" />
                <img className="hover-gif" src="src/assets/graphics/graphics-g2.gif" />
              </div>

              <div className="image-tile misc hover-swap">
                <img className="static-img" src="src/assets/graphics/graphics-graphicsnote.png" />
                <img className="hover-gif" src="src/assets/graphics/graphics-g3.gif" />
              </div>
            </div>

          </section>

          <section ref={posterRef} className="portfolio-section poster">
            <div className="section-text poster">
              <h2>Posters</h2>
              <p>
                Two of these posters were made for my Philosophy course, while the
                last one was created to promote and exhibit our Capstone Project.
              </p>
            </div>

            <div className="image-row poster">
              <div className="image-tile poster">
                <img src="src/assets/graphics/graphics-poster1.png" />
              </div>

              <div className="image-tile poster">
                <img src="src/assets/graphics/graphics-poster2.png" />
              </div>

              <div className="image-tile poster">
                <img src="src/assets/graphics/graphics-poster3.png" />
              </div>
            </div>
          </section>

        </div>
      </div>

      <ScrollBlur position="bottom" height="200px" blur="25px" maskStart="100%" />
    </>
  );
}
