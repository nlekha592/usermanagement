import React, { useState } from 'react';
import AdminComponent from './adminTable'; 
import './adminLogin.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showError,setShowError]=useState(false);

  const handleLoginClick = () => {
    if (username === 'admin' && password === 'admin') {
      setUserRole('admin');
      window.alert("Welcome Admin!!!!")
      navigate('/adminTable')
    } else{
      setShowError(true)
      return;
    }
  };

  return (
    <div>
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        className="input-field"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} required
      />
       {showError && username === '' && <p >Please enter your username.</p>}
      <input
        type="password"
        className="input-field"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} required
      />
       {showError && password === '' && <p  >Please enter your password.</p>}
      <button className="button" onClick={handleLoginClick}>Login</button>
     
  </div>
  <div >

      {isNewUser && (
        <div>
          <p className="error-message">Sorry, you are new to this platform.</p>
          <button className="button" onClick={() => setIsNewUser(false)}>Back</button>
         
        </div>
      )}
  
     
  
      {userRole === 'admin' && <AdminComponent />}
    </div>
    </div>
  );
      }  

export default LoginPage;