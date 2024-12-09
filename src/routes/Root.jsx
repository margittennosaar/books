import { Outlet } from "react-router-dom";
import Header from "../components/Header";

//this is to help with routing that contains subpages/ outlet that that contains the children
function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
