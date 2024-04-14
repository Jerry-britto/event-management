import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import Axios from "axios";
import {useDispatch,useSelector} from "react-redux"
import { setUser } from "../store/slice";
export default function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const login = async(e)=>{
    e.preventDefault();
    console.log(email,password)
    try {
      Axios.defaults.withCredentials = true
      const res = await Axios.post("http://127.0.0.1:8000/api/v1/login",{"email":email,"password":password})
      if(res.status === 200){
        console.log(res.data)
        dispatch(setUser(res.data.id))
        navigate("/")
      }
    } catch (error) {
      console.log('error occured:',error.message)
    }
    setEmail(""),
    setPassword("")
  }
  useEffect(()=>console.log("logged in ",user),[user])
  return (
    <div className="bg-cover bg-[url('https://cdn.evbstatic.com/s3-build/perm_001/b28e77/django/images/auth0/background-hero-image-compressed.jpg')] flex items-center justify-center h-screen bg-zinc-100 ">
      <div className="bg-white  p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl  mb-8 text-black ">
          Log In
        </h1>
        <form onSubmit={login}>
          <div className="mb-4">
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
              onChange={(e)=>setEmail(e.target.value)}
              className="shadow appearance-none border-black rounded w-full py-2 px-3 text-zinc-700  leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
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
              onChange={(e)=>setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
        <button className="mt-5 flex justify-start">
            Don't have an account? <Link to="/register" className="text-blue-700 mx-2">Sign up</Link>
        </button>
      </div>
    </div>
  );
}
