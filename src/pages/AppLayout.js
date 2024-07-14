import { useState } from "react";
import UserNav from "../components/LoginSignup/UserNav";
import { ObjectDetector } from "../components/objectDetection";
import Sidebar from "../components/sidebar/Sidebar";

function AppLayout() {
  const [navChange, setNavChange] = useState("");
  const [cellsCount, setCellsCount] = useState("");
  console.log("length of cells:", cellsCount);
  return (
    <div className="app">
      <UserNav navChange={navChange} />
      <div className="objectmod">
        <ObjectDetector
          navChange={navChange}
          setNavChange={setNavChange}
          setCellsCount={setCellsCount}
        />
        <Sidebar cellsCount={cellsCount} />
      </div>
    </div>
  );
}

export default AppLayout;
