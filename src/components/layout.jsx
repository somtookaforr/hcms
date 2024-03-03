import React from 'react';
import Navbar from './navbar';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <div className='lg:grid lg:grid-cols-12 layout'>
        <div className='col-span-3 overflow-y-hidden'>
            <Navbar />
        </div>
        
      <main className='col-span-9 overflow-y-auto h-screen'>
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
