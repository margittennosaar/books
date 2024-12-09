import { Outlet } from "react-router-dom";
import Header from "../components/Header";

// Content to be displayed here
function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
