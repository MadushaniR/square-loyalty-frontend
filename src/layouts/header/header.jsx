import { useState, useEffect } from 'react';
import './header.scss';

const Header = ({ toggleSidebar, totalPoints }) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    console.log('Header totalPoints:', totalPoints);
  }, [totalPoints]);

  return (
    <header className="header">
      <div className="left-section">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <span className="logo">Coffee Mart</span>
      </div>

      <div className="right-section">
        <span className="star-icon" title="Loyalty Points">⭐</span>
        <span className="points-display">Total Earn: {totalPoints}</span>
        <div className="profile-wrapper" onClick={() => setShowMenu(!showMenu)}>
          <div className="profile-letter">A</div>
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
