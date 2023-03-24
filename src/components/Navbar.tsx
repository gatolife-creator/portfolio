import { Link } from "react-router-dom";
import { FaTwitter, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="fixed navbar bg-white/4 backdrop-blur-sm z-[9999] h-[100px]">
      <div className="flex-1">
        <Link to="/" className="btn btn-lg btn-ghost normal-case text-3xl">
          GatoLife
        </Link>
      </div>
      <div className="flex-none">
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
    </nav>
  );
};

export default Navbar;
