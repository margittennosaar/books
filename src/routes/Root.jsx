import { Outlet } from "react-router-dom";
import Header from "../components/Header";

/**
 * The Root component serves as the main layout wrapper for the application.
 * It includes the Header component and renders nested routes using the Outlet component.
 */
function Root() {
  return (
    <>
      {/* The Header component, typically containing navigation links or branding */}
      <Header />

      {/* The Outlet component renders child routes defined in the routing configuration */}
      <Outlet />
    </>
  );
}

export default Root;
