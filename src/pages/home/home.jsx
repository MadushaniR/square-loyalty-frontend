import './home.scss';

const items = [
    {
        name: 'Latte',
        image: 'src/assets/latte.png',
        price: 600,
        points: 6,
    },
    {
        name: 'Cappuccino',
        image: 'src/assets/cappachino.png',
        price: 500,
        points: 5,
    },
    {
        name: 'Espresso',
        image: 'src/assets/expresso.png',
        price: 700,
        points: 7,
    },
    {
        name: 'Macchiato',
        image: 'src/assets/macchiato.png',
        price: 600,
        points: 6,
    },
];

const Home = ({ isSidebarOpen }) => {
    return (
        <div className="home-page">
            <div className="banner">
                <img src="src/assets/offers.png" alt="Loyalty Offer" />
            </div>

            <div className="item-section">
                <h2>Discover Your Next Favorite Brew</h2>
                <div className={`item-grid ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                    {items.map((item) => (
                        <div className="item-card" key={item.name}>
                            <img src={item.image} alt={item.name} />
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p>Rs. {item.price.toFixed(2)}</p>
                                <span>Earn {item.points} points</span>
                                <button className="buy-button">Buy Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
