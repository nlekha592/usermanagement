import React from 'react';
import { Routes, Route,  } from "react-router-dom";
import UserForm from './pages/userForm';
import AdminTable from './pages/adminTable';
import ConfirmationPage from './pages/confirmationPage';
import LoginPage from './pages/adminLogin';
import UserLogin from './pages/userLogin';
import UserProfile from './pages/approvedUser';

function App() {

  return (
    <Routes>
    <Route path="/" element={<UserForm/>} />
    <Route path='/adminTable' element={ <AdminTable />}   />
    <Route path='/adminLogin' element={<LoginPage/>}/>
    <Route path='/userLogin' element={<UserLogin/>}/>
    <Route path="/confirmationPage" element={<ConfirmationPage/>} />
    <Route path='/approvedUser' element={ <UserProfile />}/>
   </Routes>
  );
}

export default App;
