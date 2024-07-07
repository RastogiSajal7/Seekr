import { useState } from "react"
import Categories from "./Categories"
import Feed from "./Feed";

const Home = () => {

  const [menu,setMenu] = useState("");
  const [search, setSearch] = useState('');

  return (
    <>
    <div className="w-screen grid grid-cols-7 ">
        <div className="col-span-2">
        <Categories setMenu={setMenu} search={search}/>
        </div>
        <div className="col-span-4">
          <Feed menu={menu} search={search}/>
        </div>
    </div>
    </>
  )
}

export default Home;