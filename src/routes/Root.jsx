import { Outlet } from "react-router-dom";
import Header from "../components/Header";

//component renders the header and the outlet
function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
