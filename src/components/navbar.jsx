import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5'

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

 

  return (
    <>
      <nav id='myNav' className={isSmallScreen ? 'overlay' : 'lg:grid bg-blue-600 text-white py-8'}>
          <div className="grid grid-cols-2 my-8 py-6 px-6">
              <NavLink
              to="/"
              > 
            <img src={''} alt="HCMS" className='h-12' />              
            </NavLink>
            <IoClose onClick={closeNav} size={30} className={isSmallScreen ? 'ml-auto cursor-pointer self-center text-white' : 'hidden'} />
          </div>
          <div className="overlay-content cursor-pointer">
            <div className="grid px-6 gap-y-10">
            <NavLink
              to="/index"
              onClick={closeNav}
              > 
              Index
            </NavLink>
            <NavLink
              to="/complaints"
              onClick={closeNav}
              > 
              View Complaints
              </NavLink>
              <NavLink
              to="/profile"
              onClick={closeNav}
              > 
              Profile
              </NavLink>
              <NavLink
              to="/feedback"
              onClick={closeNav}
              > 
              Submit Feedback
              </NavLink>
              </div>
          </div>
      </nav>

      <nav className={isSmallScreen ? 'grid grid-cols-2 -mt-2 py-6 px-6' : 'hidden'}>
        <img src={''} alt="HCMS" className='h-12' />
        <IoMenu onClick={openNav} size={30} className='ml-auto cursor-pointer self-center' id='openNav' />
      </nav>
    </>
  )
}

export default Navbar