import { useState } from "react"
import Categories from "./Categories"
import Rightbar from "./Rightbar"

type searchProp = {
  search:any
}

const Home = (props:searchProp) => {

  const [menu,setMenu] = useState("")

  return (
    <div className="w-screen grid grid-cols-7 ">
        <div className="col-span-2">
        <Categories setMenu={setMenu}/>
        </div>
        <div className="col-span-4">
          <Rightbar search={props?.search} menu={menu}/>
        </div>
    </div>
  )
}

export default Home;