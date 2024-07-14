import { FaBars, FaTimes } from "react-icons/fa"
import { useState } from "react"

function PageNav() {
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
      <ul className={menuOpen?"open":""} >
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
