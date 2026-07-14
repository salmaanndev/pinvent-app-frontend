import React, { useState } from 'react'
import './ChangePassword.scss'
import Card from '../card/Card'
import { toast } from 'react-toastify'
import { changePassword } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
}

const ChangePassword = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const { oldPassword, password, password2 } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const changePass = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            return toast.error("New passwords do not match");
        }

        const formData = {
            oldPassword,
            password
        }

        const data = await changePassword(formData);
        toast.success(data);
        navigate("/profile");
    }

    return (
        <div className='change-password'>
            <Card cardClass="password-card">
                <h3>Change Password</h3>
                <form onSubmit={changePass} className='--form-control'>
                    <input type='password' onChange={handleInputChange} value={oldPassword} placeholder='Old Password' required name='oldPassword' />
                    <input type='password' onChange={handleInputChange} value={password} placeholder='New Password' required name='password' />
                    <input type='password' onChange={handleInputChange} value={password2} placeholder='Confirm Password' required name='password2' />
                    <button type="submit" className='--btn --btn-primary'>Change Password</button>
                </form>
            </Card>
        </div>
    )
}

export default ChangePassword
