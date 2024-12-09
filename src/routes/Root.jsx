import { Outlet } from "react-router-dom";
import Header from "../components/Header";

// Allows the Header to be displayed on all pages
function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
