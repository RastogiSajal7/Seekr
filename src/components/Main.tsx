import { useState } from "react"
import Home from "./Home"
import Navbar from "./Navbar"
import Breaker from "./Breaker"

const Main = () => {

  const [search, setSearch] = useState("")

  return (
      <div className="">
        <Navbar setSearch={setSearch} />
        <Breaker />
        <Home search={search} />
      </div>
  )
}

export default Main
