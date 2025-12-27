import { useRef, useState, useEffect } from "react";
import ScrollBlur from "../components/ScrollBlur";

export default function PortfolioUiUx() {
  const uiRef = useRef(null);
  const wireframeRef = useRef(null);
  const prototypeRef = useRef(null);
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
      <div id="uiux" className="portfolio-area">
        <div ref={contentRef} className="portfolio-scroll">

          <div ref={headingRef} className="portfolio-heading uiux">
            <h1>UI UX</h1>
          </div>

          <div className={`portfolio-nav uiux ${navSticky ? "sticky" : ""}`}>
            <span onClick={() => scrollTo(uiRef)}>UI</span>
            <span onClick={() => scrollTo(wireframeRef)}>Wireframing</span>
            <span onClick={() => scrollTo(prototypeRef)}>Prototyping</span>
          </div>

          <section ref={uiRef} className="portfolio-section ui">
            <div className="section-text uiux">
              <h2>UI Designs</h2>
              <p>
                These are UI/UX projects I created in Figma for my school projects.
                They include web, mobile, and game interfaces, focusing on clean
                layouts, visual consistency, and user-friendly flows.
              </p>
            </div>

            <div className="masonry-ui">
              <div className="image-tile">
                <img src="src/assets/uiux/uiux-uinoteably1.png" alt="UI noteably" />
              </div>
              <div className="image-tile">
                <img src="src/assets/uiux/uiux-uiiskolaur.png" alt="UI iskolair" />
              </div>

              <div className="image-tile">
                <img src="src/assets/uiux/uiux-uihotel.png" alt="UI inncebu" />
              </div>
              <div className="image-tile">
                <img src="src/assets/uiux/uiux-uiporcie.png" alt="UI porcie" />
              </div>
            </div>
          </section>

          <section ref={wireframeRef} className="portfolio-section wireframing">

            <div className="section-text wireframing">
              <h2>Wireframing</h2>
              <p>
                This section shows the wireframe for the mobile view of our Capstone
                Project. It highlights the structure, navigation flow, and content
                placement used as the foundation for the final design.
              </p>
            </div>

            <div className="image-row two">
              <div className="image-tile">
                <img src="src/assets/uiux/uiux-wfiskolair1.png" alt="WF isko" />
              </div>
              <div className="image-tile">
                <img src="src/assets/uiux/uiux-wfiskolair2.png" alt="WF isko" />
              </div>
            </div>
          </section>


          <section ref={prototypeRef} className="portfolio-section prototyping">
            <div className="section-text prototyping">
              <h2>Prototyping</h2>
              <p>
                A UI snippet and interactive prototype of NexiWrist, created for
                our Human–Computer Interaction course. This demonstrates how the
                interface responds to user actions and how the overall user flow
                works.
              </p>
            </div>

          <div className="image-tile prototyping">
            <img src="src/assets/uiux/uiux-prtynexi.png" alt="Prototyping" />
          </div>
          </section>

        </div>
      </div>

      <ScrollBlur position="bottom" height="200px" blur="25px" maskStart="100%" />
    </>
  );
}
