import { Outlet } from "react-router-dom";
import Header from "../components/Header";

// Root component is the layout of the application
function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
