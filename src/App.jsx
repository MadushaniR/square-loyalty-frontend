import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './layouts/header/header';
import Sidebar from './layouts/sidebar/sidebar';
import useWindowSize from './hooks/useWindowSize';
import usePoints from './hooks/usePoints';

function App() {
  const isMobile = useWindowSize();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { totalPoints, setTotalPoints, fetchBalance } = usePoints();
  const [purchaseHistory, setPurchaseHistory] = useState([]);

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
        <Outlet context={{
          isSidebarOpen: sidebarOpen,
          totalPoints,
          setTotalPoints,
          fetchBalance,
          purchaseHistory,
          setPurchaseHistory, 
        }} />
      </main>
    </>
  );
}

export default App;
