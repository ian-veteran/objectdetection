import { useState } from "react";
import UserNav from "../components/LoginSignup/UserNav";
import { ObjectDetector } from "../components/objectDetection";
import Sidebar from "../components/sidebar/Sidebar";

function AppLayout() {
  const [navChange, setNavChange] = useState("");
  return (
    <div className="app">
      <UserNav navChange={navChange} />
      <div className="objectmod">
        <ObjectDetector navChange={navChange} setNavChange={setNavChange} />
        <Sidebar />
      </div>
    </div>
  );
}

export default AppLayout;
