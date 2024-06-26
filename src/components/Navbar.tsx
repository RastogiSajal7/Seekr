import Avatar from "react-avatar"
import { auth } from "../firebase/setup"
import account from "../assets/account.png"
import PostPopup from "./PostPopup"
import { useState } from "react"
import { MdHomeFilled } from "react-icons/md";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { BsClipboard2Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

type searchProp = {
  setSearch:any
}

const NavItems = [
  {label: 'Home', icon: <MdHomeFilled/>},
  {label: 'Discover', icon: <RiCompassDiscoverFill/>},
  {label: 'Clipboard', icon: <BsClipboard2Fill/>},
  {label: 'Edit', icon: <FaEdit/>},

]

const Navbar = (props:searchProp) => {

  const [post,setPost] = useState(false)


  return (
    <div className="flex bg-neutral-800 pl-20 pt-3 shadow-md h-14 w-screen">
      <p className="w-24 text-4xl font-bold text-purple-500 cursor-pointer">SeekR</p>
      {NavItems.map((data: any, index: number)=>(
        <p className="ml-8 self-end mb-2 text-3xl" key={index}>{data.icon}</p>
      ))}
      <div className="flex h-9 ml-10 w-72 p-1 cursor-pointer">
        <input onChange={(e)=> props?.setSearch(e.target.value)} placeholder="Search SeekR" className="ml-2 outline-none rounded-2xl p-2"/>
        <p className="text-2xl mt-1 ml-3"><FaSearch/></p>
      </div>
      <h1 className="text-sm border border-spacing-1 rounded-full p-2 ml-5 h-9">Try SeekR+</h1>
      {auth?.currentUser?.emailVerified ? <Avatar round size="25" className="mt-0.5 ml-2 cursor-pointer" name={auth?.currentUser?.email ?? account}/>
      : <Avatar round size="25" className="mt-0.5 ml-2 cursor-pointer" src={account}/>}
      <h1 onClick={()=> setPost(true)} className="bg-purple-500 rounded-full text-sm cursor-pointer text-white w-36 pl-6 ml-6 pt-2 h-9">Add question</h1>
      {post && <PostPopup setPost={setPost}/>}
    </div>
  )
}

export default Navbar
