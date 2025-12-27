import { useRef, useState, useEffect } from "react";
import ScrollBlur from "../components/ScrollBlur";

export default function PortfolioFrontend() {
  const iskolairRef = useRef(null);
  const noteablyRef = useRef(null);
  const porcieRef = useRef(null);
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
      <div id="programming" className="portfolio-area">
        <div ref={contentRef} className="portfolio-scroll">

          <div ref={headingRef} className="portfolio-heading frontend">
            <h1>Programming Projects</h1>
          </div>

          <div className={`portfolio-nav frontend ${navSticky ? "sticky" : ""}`}>
            <span onClick={() => scrollTo(iskolairRef)}>IskoLAIR</span>
            <span onClick={() => scrollTo(noteablyRef)}>NOTEably</span>
            <span onClick={() => scrollTo(porcieRef)}>Porcie</span>
          </div>

          <section ref={iskolairRef} className="portfolio-section iskolair">

            <div className="section-text frontend">
              <h2>IskoLAIR</h2>

              <i>JavaScript, Vite, MySQL, Springboot, Java</i>

              <p>
                iskoLAIR is an all-in-one platform for DOST scholars and staff.
                It streamlines progress tracking, assignment submissions, announcements,
                and other academic processes. I handled the scholar side of the frontend
                development and UI/UX design of the application.
              </p>
              
              <button className="frontend-btn glow-isko">Take Me There</button>

            </div>

            <div className="image-column frontend">
              <div className="image-tile frontend">
                <img src="src/assets/frontend/portfolio-isko1.png" />
              </div>
              <div className="image-tile frontend">
                <img src="src/assets/frontend/portfolio-isko2.png" />
              </div>
              <div className="image-tile frontend">
                <img src="src/assets/frontend/portfolio-isko3.png" />
              </div>
            </div>
          </section>

          <section ref={noteablyRef} className="portfolio-section noteably">

            <div className="section-text frontend">
              <h2>NOTEably</h2>

              <i>JavaScript, React, MySQL, Springboot, Java</i>

              <p>
                An adorable productivity app that combines to-do lists, a customizable
                timer, a built-in calendar, and organized note management through
                folders. I handled the frontend, UI/UX design, and backend development
                of the application.
              </p>

              <button className="frontend-btn glow-note">Take Me There</button>

            </div>

            <div className="image-column frontend">
              <div className="image-tile frontend">
                <img src="src/assets/frontend/portfolio-note1.png" />
              </div>
              <div className="image-tile frontend">
                <img src="src/assets/frontend/portfolio-note2.png" />
              </div>
              <div className="image-tile frontend">
                <img src="src/assets/frontend/portfolio-note3.png" />
              </div>
            </div>

          </section>

          <section ref={porcieRef} className="portfolio-section porcie">

            <div className="section-text frontend">
              <h2>Porcie</h2>

              <i>Java and MySQL</i>

              <p>
                Porcie is a pixel-style game where you go on a date with a cute
                girl... but things are not what they seem. I handled the UI,
                character designs, game assets, and storyline of the game.
              </p>

              <button className="frontend-btn glow-porc">Take Me There</button>

            </div>

            <div className="image-column frontend">
              <div className="image-tile frontend">
                <img src="src/assets/frontend/portfolio-porcie.png" />
              </div>
              <div className="image-tile frontend">
                <img src="src/assets/frontend/portfolio-porcie2.png" />
              </div>
              <div className="image-tile frontend">
                <img src="src/assets/frontend/portfolio-porcie3.png" />
              </div>
            </div>
          </section>

        </div>
      </div>

      <ScrollBlur position="bottom" height="200px" blur="25px" maskStart="100%" />
    </>
  );
}
