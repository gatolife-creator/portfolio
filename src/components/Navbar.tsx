import { Link } from "react-router-dom";
import { FaTwitter, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="fixed navbar bg-white/4 backdrop-blur-sm z-[9999] sm:h-[100px] h-[60px]">
      <div className="flex-1">
        <Link to="/" className="btn btn-lg btn-ghost normal-case text-3xl">
          GatoLife
        </Link>
      </div>
      <div className="flex-none sm:block hidden">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="btn btn-lg btn-ghost normal-case">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/works" className="btn btn-lg btn-ghost normal-case">
              WORKS
            </Link>
          </li>
          <li>
            <Link to="/blog" className="btn btn-lg btn-ghost normal-case">
              BLOG
            </Link>
          </li>
          <li>
            <Link
              to="https://twitter.com/gatolife81"
              target="_blank"
              className="btn btn-lg btn-circle btn-ghost"
            >
              <FaTwitter fontSize={24} />
            </Link>
          </li>
          <li>
            <Link
              to="https://github.com/gatolife-creator"
              target="_blank"
              className="btn btn-lg btn-circle btn-ghost"
            >
              <FaGithub fontSize={24} />
            </Link>
          </li>
        </ul>
      </div>
      <div className="sm:hidden block flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
