import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="border-b-2 border-stone-300">
      {/* Topbar  */}
      <Topbar/>
      {/* Navbar  */}
      <Navbar/>
      {/* Cart drawer */}
    </div>
  )
}

export default Header