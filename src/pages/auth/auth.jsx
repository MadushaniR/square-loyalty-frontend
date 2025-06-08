import './auth.scss';

const AuthLayout = ({ title, onSubmit, children, footerText, footerLink, footerLinkText }) => {
  return (
    <div className="auth-container">
      <div className="auth-form-section">
        <div className="form-wrapper">
          <h2>{title}</h2>
          <form onSubmit={onSubmit}>{children}</form>
          <div className="auth-footer">
            {footerText} <a href={footerLink}>{footerLinkText}</a>
          </div>
        </div>
      </div>
      <div className="auth-image-section">
        <img src="src/assets/low-poly-background_53876-66427.avif" alt="Illustration" />
      </div>
    </div>
  );
};

export default AuthLayout;
