import Searchbar from './Searchbar';
import appDev from '../assets/appDev.png';
import webDev from '../assets/webDev.png';
import networking from '../assets/networking.png';
import algorithm from '../assets/algorithm.png';
import {motion} from 'framer-motion';

type MenuProp = {
  setMenu: any,
  search: any
}

const categories = [
  { category: 'Website Development', image: webDev },
  { category: 'App Development', image: appDev },
  { category: 'Data Structures', image: algorithm },
  { category: 'Networking', image: networking },
]

const Categories = (props: MenuProp) => {
  return (
    <div className="m-2 ">
      <Searchbar setSearch={props.setMenu}/>
      <div className=" bg-slate-700 rounded-2xl pl-5 pt-5 text-sm pr-5">
        {categories.map((data: any, index: number) => (
          <motion.div key={index}
          whileHover={{scale: 1.2}}
          className="border-white border-2 p-3 rounded-3xl mb-4">
            <div className="category flex gap-2" onClick={() => props?.setMenu(data.category)}>
            <img src={data.image} alt={data.category} className='h-8' />
            <h1 className="ml-3 ">{data.category}</h1>
          </div>
          </motion.div>
        ))}

        <hr className="mt-3" />
        <h1 className="mt-3 text-gray-400 text-sm">About . Careers . </h1>
        <h1 className="text-gray-400 text-sm">Terms . Policies .</h1>
        <h1 className="text-gray-400 text-sm">Acceptable use</h1>
        <br />
      </div>
    </div>
  )
}

export default Categories;
