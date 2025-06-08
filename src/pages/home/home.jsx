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

const MIN_REDEEM_POINTS = 200;

const Home = () => {
  const {
    isSidebarOpen,
    totalPoints,
    setTotalPoints,
    purchaseHistory,
    setPurchaseHistory
  } = useOutletContext();

  const [selectedItem, setSelectedItem] = useState(null);
  const [messagePopup, setMessagePopup] = useState(null);
  const [redeemPopup, setRedeemPopup] = useState(false);

  const handleBuyClick = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmPurchase = () => {
    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (success) {
        const newEntry = {
          name: selectedItem.name,
          price: selectedItem.price,
          points: selectedItem.points,
          time: new Date().toLocaleString(),
        };

        setMessagePopup({
          type: 'success',
          text: `You successfully purchased ${selectedItem.name} for Rs. ${selectedItem.price.toFixed(
            2
          )}! You earned ${selectedItem.points} points.`,
        });

        setTotalPoints((prev) => prev + selectedItem.points);
        setPurchaseHistory((prev) => [...prev, newEntry]);
      } else {
        setMessagePopup({
          type: 'fail',
          text: `Purchase failed for ${selectedItem.name}. Please try again later.`,
        });
      }

      setSelectedItem(null);
    }, 1000);
  };

  const handleConfirmRedeem = () => {
    if (!selectedItem) return;

    const pointsToRedeem = selectedItem.price;

    if (pointsToRedeem > totalPoints) {
      setMessagePopup({
        type: 'fail',
        text: `You don't have enough points to redeem this item.`,
      });
      setRedeemPopup(false);
      setSelectedItem(null);
      return;
    }

    setTotalPoints((prev) => prev - pointsToRedeem);

    const newEntry = {
      name: selectedItem.name,
      price: 0,
      points: 0,
      redeemedPoints: pointsToRedeem,
      time: new Date().toLocaleString(),
    };

    setPurchaseHistory((prev) => [...prev, newEntry]);

    setMessagePopup({
      type: 'success',
      text: `You have successfully redeemed ${pointsToRedeem} points for ${selectedItem.name}!`,
    });

    setRedeemPopup(false);
    setSelectedItem(null);
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
          {items.map((item) => {
            const canRedeem = totalPoints >= item.price && item.price >= MIN_REDEEM_POINTS;
            return (
              <div className="item-card" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price.toFixed(2)}</p>
                  <span>Earn {item.points} points</span>

                  <button className="buy-button" onClick={() => handleBuyClick(item)}>
                    Buy Now
                  </button>

                  {canRedeem && (
                    <button
                      className="redeem-points-button"
                      onClick={() => {
                        setSelectedItem(item);
                        setRedeemPopup(true);
                      }}
                    >
                      Get Using Points
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedItem && !redeemPopup && (
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

      {redeemPopup && selectedItem && (
        <Popup
          title="Redeem Points"
          onClose={() => {
            setRedeemPopup(false);
            setSelectedItem(null);
          }}
          onConfirm={handleConfirmRedeem}
          confirmText="Redeem"
          cancelText="Cancel"
        >
          Redeem <strong>{selectedItem.name}</strong> for <strong>{selectedItem.price}</strong> points?
        </Popup>
      )}

      {messagePopup && (
        <Popup
          title={messagePopup.type === 'success' ? 'Success' : 'Error'}
          onClose={closeMessagePopup}
          onConfirm={closeMessagePopup}
          confirmText="OK"
          cancelText={null}
        >
          {messagePopup.text}
        </Popup>
      )}
    </div>
  );
};

export default Home;
