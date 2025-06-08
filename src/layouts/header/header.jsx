import { useState } from 'react';
import './header.scss';

const Header = ({ toggleSidebar }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header">
      <div className="left-section">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>
        <span className="logo">Coffee Mart</span>
      </div>

      <div className="right-section">
        <div className="profile-wrapper" onClick={() => setShowMenu(!showMenu)}>
          <img
            src="/profile.jpg" 
            alt="Profile"
            className="profile-img"
          />
          {showMenu && (
            <div className="dropdown">
              <div className="dropdown-item">Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
