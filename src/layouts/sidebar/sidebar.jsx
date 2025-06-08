import { useState } from 'react';
import {
  MdDashboard,
  MdPerson,
  MdSettings,
} from 'react-icons/md';
import './sidebar.scss';

const Sidebar = ({ isOpen, isMobile, onClose, onItemClick }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <MdDashboard /> },
    { name: 'Profile', icon: <MdPerson /> },
    { name: 'Settings', icon: <MdSettings /> },
  ];

  const handleClick = (itemName) => {
    setActiveItem(itemName);
    onItemClick(itemName);
    if (isMobile) onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <nav>
          <ul>
            {menuItems.map(({ name, icon }) => (
              <li
                key={name}
                className={activeItem === name ? 'active' : ''}
                onClick={() => handleClick(name)}
              >
                <span className="icon">{icon}</span>
                <span className="label">{name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
