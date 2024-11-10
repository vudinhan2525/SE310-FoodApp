import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name,setName]=useState('Dashboard');

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* Page Wrapper Start */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Start */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setName={setName} />
        {/* Sidebar End */}

        {/* Content Area Start */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header Start */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} name={name} />
          {/* Header End */}

          {/* Main Content Start */}
          <main className='flex-1 bg-[#f5f7fa]'>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10  flex-1">
              {children}
            </div>
          </main>
          {/* Main Content End */}
        </div>
        {/* Content Area End */}
      </div>
      {/* Page Wrapper End */}
    </div>
  );
};

export default AdminLayout;
