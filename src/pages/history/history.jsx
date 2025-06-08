import { useOutletContext } from 'react-router-dom';
import './history.scss';

const History = () => {
  const context = useOutletContext();
  const purchaseHistory = context?.purchaseHistory || [];
  const totalPoints = context?.totalPoints || 0;

  return (
    <div className="history-page">
      <h2>Purchase History</h2>
      {purchaseHistory.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <>
          <table className="history-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price (Rs)</th>
                <th>Points Earned</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.points}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-points">
            <strong>Total Points Earned:</strong> {totalPoints}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
