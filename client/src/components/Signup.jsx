import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Signup() {
  // State variables to store email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook to enable navigation
  const navigate = useNavigate();

  // Function to handle signup form submission
  const signup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      console.log(email, password); // Log email and password to console

      // Make a POST request to the register endpoint with email and password data
      Axios.defaults.withCredentials = true;
      const res = await Axios.post("http://127.0.0.1:8000/api/v1/register", {
        email: email,
        password: password,
      });

      // If the request is successful (status code 201), log success message and navigate to login page
      if (res.status === 201) {
        console.log(res);
        console.log("sign up success");
        navigate("/login"); // Navigate to login page
      } else {
        throw Error("Sign up fail"); // Throw error if signup fails
      }
    } catch (error) {
      console.log(error.message); // Log error message to console
    }
  };

  return (
    <div className="bg-cover bg-[url('https://cdn.evbstatic.com/s3-build/perm_001/b28e77/django/images/auth0/background-hero-image-compressed.jpg')] bg-opacity-50 flex items-center justify-center h-screen bg-zinc-100 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl mb-8 text-black">Create an account</h1>
        <form onSubmit={signup}> {/* Form submission handled by signup function */}
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
              className="shadow appearance-none border-black rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            {/* Password input field */}
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
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
        <div className="mt-5 flex justify-start">
          {/* Link to login page */}
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 mx-2">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
