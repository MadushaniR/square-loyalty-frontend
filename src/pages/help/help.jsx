import './help.scss';

const Help = () => {
  return (
    <div className="help-page">
      <h2>Help & FAQ</h2>

      <section className="help-section">
        <h3>What is the Coffee Loyalty Program?</h3>
        <p>
          Our loyalty program rewards you with points for every coffee you purchase. You can redeem these points
          for free items once you accumulate enough.
        </p>
      </section>

      <section className="help-section">
        <h3>How do I earn points?</h3>
        <p>
          For every item you buy, you earn points based on its price. For example, a Rs. 600 coffee gives you 60 points.
        </p>
      </section>

      <section className="help-section">
        <h3>How do I redeem points?</h3>
        <p>
          If you have enough points, you can redeem them for any eligible item. Just click "Get Using Points" under a
          product.
        </p>
      </section>

      <section className="help-section">
        <h3>Where can I see my history?</h3>
        <p>
          Go to the <strong>History</strong> page in the sidebar to see your full purchase and redeem history, along with total points earned.
        </p>
      </section>

    
    </div>
  );
};

export default Help;
