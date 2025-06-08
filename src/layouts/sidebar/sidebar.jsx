import './sidebar.scss';

const Sidebar = ({ isOpen, isMobile, onClose, onItemClick }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <nav>
          <ul>
            <li onClick={onItemClick}>Dashboard</li>
            <li onClick={onItemClick}>Profile</li>
            <li onClick={onItemClick}>Settings</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
