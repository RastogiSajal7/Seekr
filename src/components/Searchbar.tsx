import Avatar from "react-avatar"
import { auth } from "../firebase/setup"
import account from "../assets/account.png"
import PostPopup from "./PostPopup"
import { useState } from "react"
import { FaSearch } from "react-icons/fa";

type searchProp = {
  setSearch: any
}

const Searchbar = (props: searchProp) => {
  const [post, setPost] = useState(false)

  return (
    <div className="mb-2 rounded-2xl pb-8 bg-slate-700 pt-3 shadow-md">
      <div className="flex justify-around">
        <p className="w-24 text-4xl text-purple-500 font-mono cursor-pointer">Seekr</p>
        {auth?.currentUser?.emailVerified ? <Avatar round size="25" className="mt-0.5 ml-2 cursor-pointer" name={auth?.currentUser?.email ?? account} />
          : <Avatar round size="25" className="mt-0.5 ml-2 cursor-pointer" src={account} />}
      </div>
      <div className="flex justify-around mt-4 h-9 p-1 cursor-pointer">
        <h1 onClick={() => setPost(true)} className="bg-purple-500 rounded-full text-sm cursor-pointer text-white w-36 pl-6 ml-6 pt-1 h-7 ">Add question</h1>
        {post && <PostPopup setPost={setPost} />}
        <div className="flex gap-0 ">
        <input type="text" onChange={(e) => props?.setSearch(e.target.value)} placeholder="Search SeekR" className="ml-2 rounded-r-none outline-none rounded-2xl p-2 " />
        <p className="text-2xl p-1 rounded-r-2xl pr-3 bg-white text-black"><FaSearch /></p>
        </div>
      </div>
    </div>
  )
}

export default Searchbar;
