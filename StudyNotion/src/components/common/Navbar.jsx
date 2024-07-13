import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropDown from "../core/auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

const Menu = () => {
  const { token } = useSelector(state => state.auth);
  return (
    <>
      <p className="m-[1rem]">
        <Link to="/">Home</Link>
      </p>
      <p className="m-[1rem]">
        <Link to="/catalog/web-development">Catalog</Link>
      </p>
      <p className="m-[1rem]">
        <Link to="/about">About Us</Link>
      </p>

      <p className="m-[1rem]">
        <Link to="/contact">Contact Us</Link>
      </p>
      <p className="m-[1rem]">
        <Link to="/dashboard/profile">My Profile</Link>
      </p>
      <p className="m-[1rem] ">
        <Link to="/dashboard/cart" className="flex gap-4 items-center">
          <AiOutlineShoppingCart />
          {/* <div>Go to Cart</div> */}
        </Link>
      </p>
      <div className="flex gap-x-1 justify-center items-center">
        {token === null && (
          <Link to="/login">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
              Log in
            </button>
          </Link>
        )}
        {token === null && (
          <Link to="/signup">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
              Sign up
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

function Navbar() {
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ToggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  // console.log("sub links", subLinks)

  const matchRoute = route => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}>
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 h-6 w-6 translate-y-[-10%] rotate-45 rounded bg-richblack-5 "></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}>
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
        <div className="mr-4 md:hidden">
          {ToggleMenu ? (
            <RiCloseLine
              color="#fff"
              size={"27px"}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <AiOutlineMenu
              fontSize={24}
              fill="#AFB2BF"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {ToggleMenu && (
            <div className="flex flex-col justify-end text-start p-[1rem] absolute top-[40px] right-[0px] mt-[1rem] mr-[1rem] min-w-[180px] text-white shadow-[0 0 5 rgba(0, 0, 0, 0.2)] bg-richblack-800 z-10 rounded-lg scale-up-center">
              <Menu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
