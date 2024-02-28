import React from 'react';
import Navbar from './navbar';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <div className='lg:grid lg:grid-cols-12 layout'>
        <div className='col-span-3'>
            <Navbar />
        </div>
        
      <main className='col-span-9 grid"'>
        <Header />
        <div className='my-12 lg:px-20 px-6'>
        {/* Render children within the main content */}
        {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
