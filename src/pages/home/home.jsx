import React, { useState } from 'react';
import Popup from '../../components/popup/popup';
import './home.scss';
import { useOutletContext } from 'react-router-dom';

const items = [
  { name: 'Latte', image: 'src/assets/latte.png', price: 600, points: 60 },
  { name: 'Cappuccino', image: 'src/assets/cappachino.png', price: 500, points: 50 },
  { name: 'Espresso', image: 'src/assets/expresso.png', price: 700, points: 70 },
  { name: 'Macchiato', image: 'src/assets/macchiato.png', price: 600, points: 60 },
];

const Home = () => {
  const { isSidebarOpen, setTotalPoints } = useOutletContext();

  const [selectedItem, setSelectedItem] = useState(null);
  const [messagePopup, setMessagePopup] = useState(null);

  const handleBuyClick = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmPurchase = () => {
    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (success) {
        setMessagePopup({
          type: 'success',
          text: `You successfully purchased ${selectedItem.name} for Rs. ${selectedItem.price.toFixed(
            2
          )}! You earned ${selectedItem.points} points.`,
        });
        console.log('Adding points:', selectedItem.points);
        setTotalPoints((prev) => {
          console.log('Previous points:', prev);
          return prev + selectedItem.points;
        });
      } else {
        setMessagePopup({
          type: 'fail',
          text: `Purchase failed for ${selectedItem.name}. Please try again later.`,
        });
      }

      setSelectedItem(null);
    }, 1000);
  };

  const closeMessagePopup = () => {
    setMessagePopup(null);
  };

  const closePurchasePopup = () => {
    setSelectedItem(null);
  };

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
                <button className="buy-button" onClick={() => handleBuyClick(item)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <Popup
          title="Confirm Purchase"
          onClose={closePurchasePopup}
          onConfirm={handleConfirmPurchase}
          confirmText="Confirm"
          cancelText="Cancel"
        >
          Are you sure you want to buy <strong>{selectedItem.name}</strong> for{' '}
          <strong>Rs. {selectedItem.price.toFixed(2)}</strong> and earn{' '}
          <strong>{selectedItem.points} points</strong>?
        </Popup>
      )}

      {messagePopup && (
        <Popup
          title={messagePopup.type === 'success' ? 'Success!' : 'Failed'}
          onClose={closeMessagePopup}
          confirmText="OK"
          cancelText={null}
          onConfirm={closeMessagePopup}
        >
          {messagePopup.text}
        </Popup>
      )}
    </div>
  );
};

export default Home;
