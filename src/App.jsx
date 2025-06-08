import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './layouts/header/header';
import Sidebar from './layouts/sidebar/sidebar';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log('App totalPoints:', totalPoints);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => isMobile && setSidebarOpen(false);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} totalPoints={totalPoints} />
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onClose={toggleSidebar}
        onItemClick={closeSidebar}
      />
      {sidebarOpen && isMobile && <div className="backdrop" onClick={closeSidebar} />}
      <main className={`main-content ${sidebarOpen && !isMobile ? 'with-sidebar' : ''}`}>
        <Outlet context={{ isSidebarOpen: sidebarOpen, setTotalPoints }} />
      </main>
    </>
  );
}

export default App;
