import "./sidebar.css";

function Sidebar({ cellsCount }) {
  return (
    <div className="sidebar">
      <p className="sidebarResultTitle">Results</p>
      <ul className="sidebarResults">
        <li>Cells detected : {cellsCount} </li>
      </ul>
    </div>
  );
}

export default Sidebar;
