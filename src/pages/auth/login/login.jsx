import AuthLayout from '../auth';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout
      title="Login"
      onSubmit={handleSubmit}
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
    >
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="Enter email" required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" placeholder="Enter password" required />
      </div>
      <button type="submit">Login</button>
    </AuthLayout>
  );
};

export default Login;
