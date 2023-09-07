import React from 'react';
import {useEffect,useState} from "react";
import './adminTable.css';

function Admin() {
 
  const [savedApplications, setSavedApplications] = useState([]);
  const API_BASE_URL = 'http://localhost:4000'; 

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
 
  const handleApprove = async (_id, email) => {
    const API_BASE_URL = 'http://localhost:4000';
  
    try {
      
      const response = await fetch(`${API_BASE_URL}/api/update-user/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ status: "Approved"}),
        
      });
      
      console.log(response);
      console.log("id:", _id);
      console.log("email",email);
  
      if (!response.ok) {
        throw new Error('Failed to approve application');
      }
  
      
      const responseData = await response.json();
      window.alert('user approved successfully');
      console.log('User approval successful:', responseData);
      
    } catch (error) {
      console.error('Error handling approval:', error);
    }
  };
  
  
  const handleRejected = async (_id, email) => {
    const API_BASE_URL = 'http://localhost:4000';
  
    try {
      
      const response = await fetch(`${API_BASE_URL}/api/update-user/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ status: "rejected"}),
      });
      console.log(response);
      console.log("id:", _id);
      console.log("email",email);
  
      if (!response.ok) {
        throw new Error('Failed to reject application');
      }
  
      
      const responseData = await response.json();
      window.alert('user rejected');
      console.log('User rejected successful:', responseData);
      
    } catch (error) {
      console.error('Error handling removed:', error);
    }
  };
  

 return (
    <div>
       <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Nationality</th>
          <th>Skill</th>
          <th>Applied For</th>
          <th>Resume</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
         {savedApplications.map((application) => (
             <tr key={application._id}>
             <td>{application.name}</td>
             <td>{application.email}</td>
             <td>{application.gender}</td>
             <td>{application.nationality}</td>
             <td>{application.skills.join(',')}</td>

             <td>{application.appliedfor}</td>

              <td>{application.resume}</td>

             <td>{application.message}</td>
             <td>
                <button onClick={() => handleApprove(application._id, application.email)}>Approve</button>
                <button onClick={() => handleRejected(application._id, application.email)}>Reject</button>
              </td>
             </tr>
             
             ))}
        </tbody>
      </table>
    </div>

  )}

export default Admin;
