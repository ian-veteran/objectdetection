function PageNav() {
  return (
    <nav className="nav">
      <a href="/">
        <img
          src="microscope.png"
          alt="miroscope"
          style={{ width: "50px", height: "50px", background: "#fff",borderRadius: "50%",}}
        /><span className="title">Blank Scope</span>
      </a>
      <ul>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
