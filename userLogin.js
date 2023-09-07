import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userLogin.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError,setShowError]=useState(false);
  const API_BASE_URL = 'http://localhost:4000';
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/userLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
      
        localStorage.setItem('authToken', data.authToken);
        window.alert("WELCOME");
            navigate('/approvedUser', { state: { email } }); 
      } else {
        setShowError(true);
        window.alert(" OOPS!! Try Again!!!")
        return
      }
      
    } catch (error) {
      console.error('An error occurred:', error);
      window.alert('An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
              {showError && email === '' && <p className='error-message' >Please enter your email.</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
              {showError && password === '' && <p className='error-message'>Please enter your password.</p>}
      </div>
      <button onClick={handleLogin}>Login</button>
      
      
    </div>
  );
}

export default Login;
