import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdHome,
  MdHistory,
  MdLoyalty,
} from 'react-icons/md';
import './sidebar.scss';

const Sidebar = ({ isOpen, isMobile, onClose }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/', icon: <MdHome /> },
    { name: 'History', path: '/history', icon: <MdHistory /> },
    { name: 'Help', path: '/help', icon: <MdLoyalty /> }, 
  ];

  const handleClick = (itemName, path) => {
    setActiveItem(itemName);
    navigate(path);
    if (isMobile) onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <nav>
          <ul>
            {menuItems.map(({ name, path, icon }) => (
              <li
                key={name}
                className={activeItem === name ? 'active' : ''}
                onClick={() => handleClick(name, path)}
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
