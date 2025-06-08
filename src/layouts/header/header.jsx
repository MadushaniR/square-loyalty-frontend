import './header.scss';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>
      <h1 className="logo">My App</h1>
    </header>
  );
};

export default Header;
