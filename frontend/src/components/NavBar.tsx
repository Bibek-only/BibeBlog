
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    // <!-- component -->
    <nav className="bg-black  w-100 px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* <!-- Logo --> */}
        <NavLink
          to=""
          className="text-indigo-500 md:order-1 text-2xl font-bold"
        >
          BibeBlog
        </NavLink>
        <div className="text-gray-200 order-3 w-full md:w-auto md:order-2">
          <ul className="flex justify-between font-bold">
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="">Home</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="/create-blog">Create</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="/my-blog">My blog's</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <NavLink to="/account">About</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-400">
              <button>Logout</button>
            </li>
          </ul>
        </div>
        <div className="order-2 md:order-3">
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 font-bold">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
