import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './approvedUser.css';

function ApprovedUser() {
  const location = useLocation();
  const { email } = location.state || {};
  const [userData, setUserData] = useState([]);
  const API_BASE_URL = 'http://localhost:4000';

  useEffect(() => {

    fetch(`${API_BASE_URL}/api/users/${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div>
      <h2 className="page-title">Approved User</h2>
      {email && (
        <div className="message-container">
          <p>Congratulations, you are logged in using this Email: {email}</p>
        </div>
      )}

      {userData && (
       <div>
       <h3 className='details'>Your Details</h3>
       <form className="form-container">
            <div>
              <label className="form-label">Name:</label>
              <input type="text" value={userData.name} readOnly className="form-input" />
            </div>
            <div>
              <label className="form-label">Email:</label>
              <input type="text" value={userData.email} readOnly className="form-input" />
            </div>
            <div>
              <label className="form-label">Gender:</label>
              <input type="text" value={userData.gender} readOnly className="form-input" />
            </div>
            <div>
              <label className="form-label">Skills:</label>
              <input type="text" value={userData.skills} readOnly className="form-input" />
            </div>
            <div>
              <label className="form-label">Applied For:</label>
              <input type="text" value={userData.appliedfor} readOnly className="form-input" />
            </div>
            <div>
              <label className="form-label">Message:</label>
              <input type="text" value={userData.message} readOnly className="form-input" />
            </div>
            <div>
              <label className="form-label">Status:</label>
              <input type="text" value={userData.status} readOnly className="form-input" />
            </div>

       </form>
     </div>
      )}
    </div>
  );
}

export default ApprovedUser;



       
     








