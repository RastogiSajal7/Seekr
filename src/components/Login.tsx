import google from "../assets/google.png"
import facebook from "../assets/facebook.png"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, facebookProvider, googleProvider } from "../firebase/setup"
import { useState } from "react"
import EmailSignup from "./EmailSignup"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

  const [emailSignup,setEmailSignup] = useState(false)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const googleSignin = async() =>{
    try{
      await  signInWithPopup(auth,googleProvider)
      setTimeout(()=>{
        auth?.currentUser !== null && navigate("/home")
      },2000)
      auth?.currentUser !== null && toast.success("LoggedIn succesfully")
    }catch(err){
      console.error(err)
      toast("Wrong Credentials")
    }
  }

  const facebookSignin = async() =>{
    try{
      await signInWithPopup(auth,facebookProvider)
      setTimeout(()=>{
        auth?.currentUser !== null && navigate("/home")
      },2000)
      auth?.currentUser !== null && toast("LoggedIn succesfully")
    }catch(err){
      console.error(err)
      toast("Wrong Credentials")
    }
  }
  

  const login = async() =>{
    try{
     const data = await signInWithEmailAndPassword(auth,email,password)
     setTimeout(()=>{
      data?.user?.emailVerified && navigate("/home")
     },2000)
     data?.user?.emailVerified && toast.success("LoggedIn succesfully")
    }catch(err){
      console.error(err)
      toast("Wrong Credentials")
    }
  }
  

  return (
    <>
    <ToastContainer autoClose={3000}/>
      <div className="bg-white h-11/12 w-7/12 rounded-sm p-8">
        
        <div className="flex mt-10">
        <div>
        <div onClick={googleSignin} className="cursor-pointer flex p-3 border border-spacing-1 items-center w-80 rounded-sm mt-5">
            <img src={google} className="w-5 h-5 ml-2"/>
            <h1 className="ml-7">Continue with Google</h1>
        </div>
        <div onClick={facebookSignin} className="cursor-pointer  flex p-3 border border-spacing-1 items-center w-80 rounded-sm mt-2">
            <img src={facebook} className="w-5 h-5 ml-2 rounded-full"/>
            <h1 className="ml-7">Continue with Facebook</h1>
        </div>
        <h1 className="text-zinc-400 text-sm w-72">By continuing you indicate that you agree to our
        <span className="text-cyan-700"> Terms of Service</span> and <span  className="text-cyan-700">Privacy Policy.</span></h1>
        <h1 onClick={()=>setEmailSignup(true)} className="text-center text-sm bg-slate-800 font-semibold text-white mt-3 hover:bg-gray-100 rounded-full cursor-pointer p-1">Sign up with email</h1>
        </div>
        <div className="ml-16">
           <h1>Login</h1>
           <hr className="w-72 mt-3"/>
           <h1 className="mt-4 font-semibold text-sm">Email</h1>
           <input onChange={(e)=> setEmail(e.target.value)} placeholder="Your Email" className="border border-spacing-1 p-2 w-72 mt-2"/>
           <h1 className="mt-4 font-bold text-sm">Password</h1>
           <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Your Password" className="border border-spacing-1 p-2 w-72 mt-2"/>
           <div className="flex mt-4">
           <h1 className="text-zinc-400 text-sm mt-2 hover:underline cursor-pointer">Forgot password?</h1>
           <button onClick={login} className="bg-slate-800 text-white p-2 w-20 ml-24 rounded-lg">Login</button>
           </div>
        </div>
        </div>
      </div> 
      {emailSignup ? <EmailSignup setEmailSignup={setEmailSignup}/> : ""}
    </>
   
  )
}

export default Signup
