import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../components/popup/popup';
import './home.scss';
import latteImg from '../../assets/latte.png';
import cappuccinoImg from '../../assets/cappachino.png';
import espressoImg from '../../assets/expresso.png';
import macchiatoImg from '../../assets/macchiato.png';
import offerImg from '../../assets/offers.png';

const items = [
  { name: 'Latte', image: latteImg, price: 600, points: 60 },
  { name: 'Cappuccino', image: cappuccinoImg, price: 500, points: 50 },
  { name: 'Espresso', image: espressoImg, price: 700, points: 70 },
  { name: 'Macchiato', image: macchiatoImg, price: 600, points: 60 },
];

const MIN_REDEEM_POINTS = 200;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const navigate = useNavigate();
  const {
    isSidebarOpen,
    totalPoints,
    setTotalPoints,
    purchaseHistory,
    setPurchaseHistory,
    fetchBalance,
  } = useOutletContext();

  const [selectedItem, setSelectedItem] = useState(null);
  const [messagePopup, setMessagePopup] = useState(null);
  const [redeemPopup, setRedeemPopup] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const handleBuyClick = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedItem) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/earn`,
        {
          itemName: selectedItem.name,
          price: selectedItem.price,
          points: selectedItem.points,
        },
        axiosConfig
      );

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

      await fetchBalance();

      setPurchaseHistory((prev) => [...prev, newEntry]);
    } catch (error) {
      setMessagePopup({
        type: 'fail',
        text:
          error.response?.data?.error ||
          `Purchase failed for ${selectedItem.name}. Error: ${error.message}`,
      });
    }

    setSelectedItem(null);
  };

  const handleConfirmRedeem = async () => {
    if (!selectedItem) return;

    const pointsToRedeem = selectedItem.price;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/redeem`,
        {
          itemName: selectedItem.name,
          redeemPoints: pointsToRedeem,
          currentPoints: totalPoints,
        },
        axiosConfig
      );

      await fetchBalance();

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
    } catch (error) {
      setMessagePopup({
        type: 'fail',
        text:
          error.response?.data?.error ||
          `Redemption failed. Error: ${error.message}`,
      });
    }

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
        <img src={offerImg} alt="Loyalty Offer" />
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
