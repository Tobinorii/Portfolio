import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function AboutMeWindow() {

  const [selectedTab, setSelectedTab] = useState("file");

  return (
    <div className="window-about-me">

      <div className="window-header-menu">
        <ul className="menu-list">
          <li
            className={selectedTab === "file" ? "active" : ""}
            onClick={() => setSelectedTab("file")}
          >
            File
          </li>

          <li
            className={selectedTab === "skills" ? "active" : ""}
            onClick={() => setSelectedTab("skills")}
          >
            Skills
          </li>

          <li
            className={selectedTab === "contacts" ? "active" : ""}
            onClick={() => setSelectedTab("contacts")}
          >
            Contacts
          </li>
          <li className="menu-unlist">Edit</li>
          <li className="menu-unlist">View</li>
        </ul>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="window-content-area">

        {selectedTab === "file" && (
          <div style={{padding: '0 15px'}}>
            <h3>Introduction</h3>
            <p>Hi! I’m Laura Alexia Jane Fortugaliza, a BSIT student at
              Cebu Institute of Technology – University with a love for
              both art and code. JavaScript is my comfort zone, but I’ve
              also gained experience with C, Java, PHP, and database
              systems like Postgres and MySQL.</p>
            <p>Digital art, graphic design, animation, and wireframing
              are some of the creative tools I enjoy using. Blending
              those with frontend development and UI/UX allows me to
              enjoy the work I do.</p>
          </div>
        )}

        {selectedTab === "skills" && (
          <div style={{padding: '0 15px'}}>
            <h3>Technical</h3>
            <ul>
              {/* <li>C</li> */}
              <li>Java</li>
              <li>Javascript</li>
              <li>Frontend Web Development</li>
              <li>UI/UX</li>
              <li>Wireframing</li>
            </ul>
            <h3>Design</h3>
            <ul>
              <li>Digital Arts</li>
              <li>Graphic Design</li>
              <li>Pixel Art</li>
            </ul>
          </div>
        )}

        {selectedTab === "contacts" && (
          <div style={{padding: '0 15px'}}>
            <h3>Contact Me</h3>
            <p>laura.fortugaliza@gmail.com</p>
            <p>+63 928 715 8037</p>
            <p>------------------------------</p>
            <div className="contact-icons">
              <a href="https://github.com/Tobinorii" target="_blank" rel="noopener noreferrer" className="github-icon">
                <GitHubIcon />
              </a>
              <a href="https://www.linkedin.com/in/laura-alexia-jane-fortugaliza-95aa27382/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
