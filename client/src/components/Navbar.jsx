import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { setUser } from "../store/slice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector(state=>state.user)
  const navigate = useNavigate()
  const logout = async()=>{
    try {
      Axios.defaults.withCredentials = true
      const res = await Axios.post("http://127.0.0.1:8000/api/v1/logout");
      console.log(res);
      if(res.status === 200){
        console.log("logged out")
        useDispatch(setUser(null))
        navigate("/login")
      }
    } catch (error) {
      console.log("could not logout");
    }
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <NavLink
            to="/"
            className="text-orange-500 text-xl font-bold md:text-2xl"
          >
            eventbrite
          </NavLink>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`items-center ${isMenuOpen ? "block" : "hidden"} md:flex`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <NavLink
              to="/"
              className="cursor-pointer text-sm hover:rounded-3xl hover:bg-gray-100 px-3 py-2 md:mx-4 md:my-0"
            >
              All Events
            </NavLink>
            {user!=null?
              <NavLink
                to="/my-events"
                className="my-1 cursor-pointer text-sm text-black hover:rounded-3xl hover:bg-gray-100 px-3 py-2 md:mx-4 md:my-0"
              >
                Your Events
              </NavLink>:""
            }
          </div>
         <div className="flex justify-center md:block">
            {
              <div>
                { user!=null?<div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center space-x-2 hover:bg-slate-200 p-2 rounded-full focus:outline-none"
                  >
                    <img
                      src="https://placehold.co/32x32"
                      alt="User"
                      className="rounded-full"
                    />
                    <span className="hidden md:inline">
                      brittojerry1@gmail.com
                    </span>
                    <svg
                      className={`fill-current h-4 w-4 transform ${
                        open ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.95 7.05a.5.5 0 01.7 0L10 10.29l3.35-3.24a.5.5 0 11.7.7l-4 3.88a.5.5 0 01-.7 0l-4-3.88a.5.5 0 010-.7z" />
                    </svg>
                  </button>
                  {open && (
                    <div
                      onClick={() => setOpen(false)}
                      className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
                    >
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 focus:outline-none"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div> :
                  <div>
                <NavLink
                  to="/login"
                  className="relative text-sm text-black hover:rounded-3xl hover:bg-gray-100 py-2 px-4 md:mx-2 my-1 mx-2"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/register"
                  className="relative text-sm text-black hover:rounded-3xl hover:bg-gray-100 py-2 px-4 rounded md:mx-2 my-1"
                >
                  Sign Up
                </NavLink>
                </div>}
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
