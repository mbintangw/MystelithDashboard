import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuBookOpen } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className='bg-Headline text-Main flex flex-col w-[250px] h-screen gap-20 items-center'>
      <div>
        <h1>Mystelith</h1>
      </div>

      <div>
        <Link to="/profile">
          <h1>profile</h1>
        </Link>
        <Link to="/login">
          <h1>Login/Register</h1>
        </Link>
      </div>

      <div className="flex flex-col gap-5 ">       
          <Link to="/" className="flex items-center gap-2">
            <LuBookOpen />
            Article feed
          </Link>
        
          <Link to="/settings" className="flex items-center gap-2">
            <IoSettingsOutline />
            Settings
          </Link>
      </div>
    </nav>
  )
}

export default Sidebar;
