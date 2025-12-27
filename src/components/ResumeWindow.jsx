import { useState } from "react";

export default function ResumeWindow() {

  const [selectedTab, setSelectedTab] = useState("file");

  return (
    <div className="window-about-me">

      <div className="window-header-menu">
        <ul className="menu-list">
          <li
            className={selectedTab === "download" ? "active" : ""}
            onClick={() => window.open("https://acrobat.adobe.com/id/urn:aaid:sc:AP:ed77f3d1-c0df-4705-a3c9-d50e2661472e", "_blank")}
          >
            Pdf File
          </li>

          <li className="menu-unlist">Edit</li>
          <li className="menu-unlist">View</li>
          <li className="menu-unlist">Format</li>
        </ul>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="window-content-area">
        <img src="/Portfolio/resume.png" className="resume-img" />
      </div>
    </div>
  );
}
