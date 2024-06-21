import UserNav from "../components/LoginSignup/UserNav";
import { ObjectDetector } from "../components/objectDetection";

function AppLayout() {
    return (
        <div className="home">
            <UserNav />
            <ObjectDetector />
        </div>
    )
}

export default AppLayout