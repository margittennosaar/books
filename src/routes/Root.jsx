import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root() {  //define a function for the root
  return (
    <>
      <Header /> {/* used the header component */}
      <Outlet /> {/* used the outlet component */}
    </>
  );
}

export default Root;
