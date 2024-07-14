import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <p className="sidebarResultTitle">Results</p>
      <ul className="sidebarResults">
        <li>Cells detected : 6</li>
        <li>Detected % : 78%</li>
      </ul>
    </div>
  );
}

export default Sidebar;
