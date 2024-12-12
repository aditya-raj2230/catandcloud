import Logo from '../assets/images/Logo.avif';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <nav className="flex gap-2 text-lg font-semibold">
        <NavLink to="/" className="items-center scale-75 justify-center flex transition-transform hover:scale-100">
          <img src={Logo} alt="Cat and Cloud Logo" className="" />
        </NavLink>

<div className="gap-7 flex justify-evenly">
        <NavLink 
          to="/ourcoffees" 
          className={({ isActive }) => 
            `transition-all duration-200 relative ${
              isActive 
                ? 'text-gray-800 after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-Pink-300 after:bottom-0 after:left-0' 
                : 'text-gray-800 hover:text-blue-500 hover:after:content-[""]  hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-Pink-300 hover:after:bottom-0 hover:after:left-0 hover:after:scale-x-100 after:scale-x-0 after:transition-transform after:duration-200 '
            }`
          }
        >
          Our Coffees
        </NavLink>

        <NavLink 
          to="/coffeeclass" 
          className={({ isActive }) => 
            `transition-all duration-200 relative ${
              isActive 
                ? 'text-gray-800 after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-Pink-300 after:bottom-0 after:left-0' 
                : 'text-gray-800 hover:text-blue-500 hover:after:content-[""] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-Pink-300 hover:after:bottom-0 hover:after:left-0 hover:after:scale-x-100 after:scale-x-0 after:transition-transform after:duration-200'
            }`
          }
        >
          Coffee Classes
        </NavLink>

        </div>
      </nav>
    </header>
  )
}

export default Navbar;
