import React, { useEffect, useState } from "react";
import './confirmation.css';
import { useNavigate } from "react-router-dom";


function ConfirmationPage() {
  const [savedApplications, setSavedApplications] = useState([]);
  const API_BASE_URL = 'http://localhost:4000';
  const navigate = useNavigate(); 
  const handleBack=()=>{
  navigate('/');
}
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        setSavedApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }

    fetchData();
  }, []);

  const lastSavedApplication = savedApplications[savedApplications.length - 1];
  

  return (
    <div className="container">
    <h1>Your Details</h1>
    <p className="success-message">Your application has been submitted successfully!</p>
  
    {lastSavedApplication && (
      <div className="save">
        <p>Name: {lastSavedApplication.name}</p>
        <p>Gender: {lastSavedApplication.gender}</p>
        <p>Email: {lastSavedApplication.email}</p>
        <p>Skills: {lastSavedApplication.skills}</p>
        <p>Applied for: {lastSavedApplication.appliedfor}</p>
        <p>Resume: {lastSavedApplication.resume}</p>
        <p>Message: {lastSavedApplication.message}</p>
        <p>Status: {lastSavedApplication.status}</p>
      </div>
      
    )}
    <button onClick={handleBack}>Back</button>
  </div>
  
  );
}

export default ConfirmationPage;



