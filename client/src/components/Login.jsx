import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slice";

export default function Login() {
  // State variables to store email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux hooks to dispatch actions and select state
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Hook to enable navigation
  const navigate = useNavigate();

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(email, password); // Log email and password to console

    try {
      // Make a POST request to the login endpoint with email and password data
      const res = await Axios.post("http://127.0.0.1:8000/api/v1/login", {
        email: email,
        password: password,
      });

      // If the request is successful (status code 200), update user state and navigate to home page
      if (res.status === 200) {
        console.log(res.data); // Log response data to console
        dispatch(setUser(res.data.id)); // Dispatch setUser action with user ID
        navigate("/"); // Navigate to home page
      }
    } catch (error) {
      // If an error occurs, log the error message to console
      console.log("error occured:", error.message);
    }

    // Reset email and password fields after form submission
    setEmail("");
    setPassword("");
  };

  // Effect hook to log user state changes
  useEffect(() => console.log("logged in ", user), [user]);

  return (
    <div className="bg-cover bg-[url('https://cdn.evbstatic.com/s3-build/perm_001/b28e77/django/images/auth0/background-hero-image-compressed.jpg')] flex items-center justify-center h-screen bg-zinc-100 ">
      <div className="bg-white  p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl  mb-8 text-black ">Log In</h1>
        <form onSubmit={login}>
          {" "}
          {/* Form submission handled by login function */}
          <div className="mb-4">
            {/* Email input field */}
            <label
              htmlFor="email"
              className="block text-black text-sm font-semibold mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border-black rounded w-full py-2 px-3 text-zinc-700  leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            {/* Password input field */}
            <label
              htmlFor="password"
              className="block  text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            {/* Submit button */}
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
        {/* Link to register page */}
        <button className="mt-5 flex justify-start">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 mx-2">
            Sign up
          </Link>
        </button>
      </div>
    </div>
  );
}
