import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";

function UserForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        email: '',
        nationality: '',
        skills: [],
        appliedfor: '',
        resume: '',
        message: '',
    });
    const [showError, setShowError] = useState(false);
    const [savedApplications, setSavedApplications] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const API_BASE_URL = 'http://localhost:4000';
    const [resumeFileName, setResumeFileName] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleGenderChange = (e) => {
        const genderValue = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            gender: genderValue,
        }));
    };

    const handleDropdownChange = (e) => {
        const selectedOptionValue = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            nationality: selectedOptionValue,
        }));
    };


    const handleSkillsChange = (e) => {
        const skillValue = e.target.value;
        const isChecked = e.target.checked;

        setFormData((prevData) => {
            if (isChecked) {
                return {
                    ...prevData,
                    skills: [...prevData.skills, skillValue]
                };
            } else {
                return {
                    ...prevData,
                    skills: prevData.skills.filter((skill) => skill !== skillValue),
                };
            }
        });
    };

    const handleAppliedForChange = (e) => {
        const appliedForValue = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            appliedfor: appliedForValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleSave = async () => {
        if (
            formData.name === '' ||
            formData.email === '' ||
            formData.gender === '' ||
            formData.nationality === '' ||
            formData.skills.join(',') === '' ||
            formData.appliedfor === '' ||
            formData.resume === '' ||
            formData.message === ''
        ) {
            setShowError(true);
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('nationality', formData.nationality);
            formDataToSend.append('skills', formData.skills.join(','));
            formDataToSend.append('appliedfor', formData.appliedfor);
            formDataToSend.append('resume', formData.resume);
            formDataToSend.append('message', formData.message);
            formDataToSend.append('status', 'pending');

            console.log('Data to be saved:', formDataToSend);

            const response = await fetch(`${API_BASE_URL}/api/users`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Failed to save application');
            }

            const savedApplication = await response.json();

            setSavedApplications([...savedApplications, savedApplication]);
            setResumeFileName('');

            setFormData({
                name: '',
                gender: '',
                email: '',
                nationality: '',
                skills: '',
                appliedfor: '',
                resume: '',
                message: '',
            });

            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 7000);


            navigate('/confirmationPage');



        } catch (error) {
            console.log('Error saving application:', error);
        }
    };


    const handleReset = () => {
        setFormData({
            name: '',
            gender: '',
            email: '',
            nationality: '',
            skills: '',
            appliedfor: '',
            resume: '',
            message: '',
        });
    };

    return (
        <div className="App">
            <h1>Application Form</h1>
            <form className="form" onSubmit={handleSubmit} action="../../post" method="post">

                <div className='fullname'>
                    <label htmlFor="name">Full Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    {showError && formData.name === '' && <p className="error">Please enter your name.</p>}
                </div>

                <div className='gender'>
                    <label htmlFor="gender" required>Gender:</label>
                    <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleGenderChange}
                    /> Male
                    <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleGenderChange}
                    /> Female
                    <input type="radio" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleGenderChange}
                    /> Others
                    {showError && formData.gender === '' && <p className="error">Please enter your Gender.</p>}
                </div>

                <div className='email'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    />
                    {showError && formData.email === '' && <p className="error">Please enter your Email.</p>}
                </div>

                <div className='nationality'>
                    <label>
                        Nationality:
                        <select name="nationality" value={formData.selectedOption} onChange={handleDropdownChange} >
                            <option value="Indian">Indian</option>
                            <option value="Other">Other </option>
                            <option value="foreigner">foreigner </option>
                        </select>
                    </label>
                    {showError && formData.nationality === '' && <p className="error">Please enter your Nationality.</p>}
                </div>

                <div className='skills'>
                    <label htmlFor="skills">Skills:</label>
                    <input type="checkbox" name="skills" value="React" checked={formData.skills.includes('React')} onChange={handleSkillsChange} /> React
                    <input type="checkbox" name="skills" value="ASP.Net" checked={formData.skills.includes('ASP.Net')} onChange={handleSkillsChange} /> ASP.Net
                    <input type="checkbox" name="skills" value="MVC" checked={formData.skills.includes('MVC')} onChange={handleSkillsChange} /> MVC

                    {showError && formData.skills.length === 0 && (
                        <p className="error">Please select at least one skill.</p>
                    )}
                </div>

                <div className='appliedfor'>
                    <label htmlFor="appliedfor">Applied For:</label>
                    <input type="radio" name="appliedfor" value="trainee" checked={formData.appliedfor === 'trainee'} onChange={handleAppliedForChange}
                    /> Trainee
                    <input type="radio" name="appliedfor" value="software engineer" checked={formData.appliedfor === 'software engineer'} onChange={handleAppliedForChange}
                    /> Software Engineer
                    <input type="radio" name="appliedfor" value="QA analyst" checked={formData.appliedfor === 'QA analyst'} onChange={handleAppliedForChange}
                    /> QA Analyst

                    {showError && formData.appliedfor === '' && <p className="error">Please Select your area .</p>}
                </div>
                <div className='upload'>
                    <label htmlFor="resume">Upload Resume:</label>
                    <input
                        type="file"
                        onChange={(e) => {
                            setResumeFileName(e.target.files[0].name);
                            setFormData((prevData) => ({
                                ...prevData,
                                resume: e.target.files[0],
                            }));
                        }}
                    />

                    {resumeFileName && <p>Selected Resume: {resumeFileName}</p>}

                    {showError && (!formData.resume || !resumeFileName) && (
                        <p className="error">Uploaded File is Required.</p>
                    )}
                </div>

                <div className='message'>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                    />

                    {showError && formData.message === '' && <p className="error">Please Type Something About you.</p>}
                </div>

                <button type="submit" onClick={handleSave}>Save</button>

                <button type="button" onClick={handleReset}>Reset</button>
            </form>
            {showSuccessMessage && <p className="success-message">Application saved successfully!</p>}
        </div>
    );
}

export default UserForm;

