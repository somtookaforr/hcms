import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu, IoHome, IoDesktopOutline, IoPersonCircleSharp, IoPeopleCircle } from 'react-icons/io5'
import { BsBuildings } from "react-icons/bs";


const Navbar = () => {
  function openNav() {
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("openNav").classList.add('hidden')
  }
  
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("openNav").classList.remove('hidden')
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const userType = localStorage.getItem("userType")
  const smallScreenWidth = window.innerWidth < 1024;

  return (
    <>
      <nav id='myNav' className={isSmallScreen ? 'overlay' : 'bg-blue-950 text-white py-8 shadow-xl lg:h-screen'}>
          <div className="grid grid-cols-2 my-8 py-6 px-6">
            <div className={smallScreenWidth ? 'text-white' : 'h-12 flex'}> 
              <BsBuildings size={50}/>  
              <p className='self-center font-bold text-3xl'>HCMS</p>          
            </div>
            <IoClose onClick={closeNav} size={30} className={isSmallScreen ? 'ml-auto cursor-pointer self-center text-white' : 'hidden'} />
          </div>
          <div className="overlay-content cursor-pointer">
            <div className="grid px-6 gap-y-10">
            <NavLink
              to="/index"
              onClick={smallScreenWidth ? closeNav : ''}
              className={'navItems flex'}
              > 
              <IoHome size={smallScreenWidth ? 30 : 22} className='self-center mr-1' />
              Index
            </NavLink>
            <NavLink
              to="/complaints"
              onClick={smallScreenWidth ? closeNav : ''}
              className={'navItems flex'}
              > 
              <IoDesktopOutline size={smallScreenWidth ? 30 : 22} className='self-center mr-1' />
              Complaints
              </NavLink>
              <NavLink
              to="/profile"
              onClick={smallScreenWidth ? closeNav : ''}
              className={'navItems flex'}
              > 
              <IoPersonCircleSharp size={smallScreenWidth ? 30 : 22} className='self-center mr-1' />
              Profile
              </NavLink>
              {userType == 1 ?
              <NavLink
              to="/users"
              onClick={smallScreenWidth ? closeNav : ''}
              className={'navItems flex'}
              > 
              <IoPeopleCircle size={smallScreenWidth ? 30 : 22} className='self-center mr-1' />
              Users
              </NavLink>
              : ''
              }
              </div>
          </div>
      </nav>

      <nav className={isSmallScreen ? '-mt-2 py-6 px-6' : 'hidden'}>
        <IoMenu onClick={openNav} size={30} className='ml-auto cursor-pointer self-center' id='openNav' />
      </nav>
    </>
  )
}

export default Navbar