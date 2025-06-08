import AuthLayout from '../auth';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout
      title="Register"
      onSubmit={handleSubmit}
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
    >
      <div className="form-group">
        <label>Full Name</label>
        <input type="text" placeholder="Enter your name" required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="Enter email" required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" placeholder="Enter password" required />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm password" required />
      </div>
      <button type="submit">Register</button>
    </AuthLayout>
  );
};

export default Register;
