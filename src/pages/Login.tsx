import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  setError('');

  if (!email.trim() || !password.trim()) {
    setError('Please enter both email and password.');
    return;
  }

  const validEmail = 'admin@lendsqr.com';
  const validPassword = 'admin123';

  if (email === validEmail && password === validPassword) {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  } else {
    setError('Invalid email or password. Try again.');
  }
};

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand">
          <img src="/logo.svg" alt="Lendsqr logo" />
          <p>Empowering financial access for everyone</p>
        </div>
        <img
          className="illustration"
          src="/login-illustration.svg"
          alt="Login visual"
        />
      </div>

      <div className="login-right">
        <h2>Welcome!</h2>
        <p>Enter details to login.</p>

        <form onSubmit={handleLogin}>
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-input-wrapper" style={{ position: 'relative' }}>
  <input
    type={showPassword ? 'text' : 'password'}
    placeholder="Password"
    value={password}
  onChange={(e) => setPassword(e.target.value)}
    className="password-input"
  />
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="show-password-btn"
    style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#545F7D',
      cursor: 'pointer',
    }}
  >
    {showPassword ? 'Hide' : 'Show'}
  </button>
</div>


          <div className="form-options">
           
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
