import { FaBars, FaTimes } from "react-icons/fa"
import { useState } from "react"

function UserNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <a href="/">
        <img
          src="microscope.png"
          alt="miroscope"
          style={{
            width: "50px",
            height: "50px",
            background: "#fff",
            borderRadius: "50%",
          }}
        />
        <span className="title">Blank Scope</span>
      </a>
      <ul className={menuOpen?"open":""}>
        <li>
          <img
            src="icons8-folder-80.png"
            alt="folder"
            style={{
              width: "30px",
              height: "30px",
              background: "#fff",
              borderRadius: "50%",
            }}
          />
          <span className="title">Archives</span>
        </li>
        <li>
          <img
            src="video-camera.png"
            alt="micro"
            style={{
              width: "30px",
              height: "30px",
              background: "#fff",
              borderRadius: "50%",
            }}
          />
          <span className="title">Scan</span>
        </li>
        <li>
          <a href="/login">Logout</a>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
