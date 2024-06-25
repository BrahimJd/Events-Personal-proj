import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
        <a href="index.html">
          <img
            src="https://www.flaticon.com/svg/vstatic/svg/3055/3055713.svg?token=exp=1619002586~hmac=0e3f0c0a7e9d2f0b7b6b1b1b1b3
            0b7b6b1b1b1b3"
            alt="logo"
            className="w-10 h-10"
          />
        </a>
        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>
      </div>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
        id="menu"
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
            <li>
              <Link
                to="/"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/news" className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                News
              </Link>
            </li>
            <li>
              <a
                href="#about"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <Link
          to="/create-event"
          className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 cursor-pointer"
        >
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">
            Create Event
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
