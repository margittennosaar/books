import { Outlet } from "react-router-dom";
import Header from "../components/Header";

// Root component represents the root layout of the application
function Root() {
  return (
    <div>
      {/* Include the Header component at the top of the layout */}
      <Header />
      {/* Outlet component is used to render child routes within the layout */}
      <Outlet />
    </div>
  );
}

export default Root;
