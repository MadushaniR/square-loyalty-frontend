import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdHome, MdHistory, MdLoyalty } from 'react-icons/md';
import './sidebar.scss';

const Sidebar = ({ isOpen, isMobile, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  const menuItems = [
    { name: 'Home', path: '/app/dashboard', icon: <MdHome /> },
    { name: 'History', path: '/app/history', icon: <MdHistory /> },
    { name: 'Help', path: '/app/help', icon: <MdLoyalty /> },
  ];

  useEffect(() => {
    const currentItem = menuItems.find(item => location.pathname.startsWith(item.path));
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);

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
