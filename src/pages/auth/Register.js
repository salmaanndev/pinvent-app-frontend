import React, { useState } from 'react'
import styles from './auth.module.scss';
import { TiUserAddOutline } from 'react-icons/ti';
import Card from '../../components/card/Card';
import { toast } from 'react-toastify';
import { registerUser, validateEmail } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';


const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
}
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { name, email, password, password2 } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const register = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !password2) {
            return toast.error("All fields are required");
        }
        if (password.length < 6) {
            return toast.error("Password must be up to 6 characters");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid Email");
        }
        if (password !== password2) {
            return toast.error("Password Did not match");
        }
        
        const userData = {
            name, email, password
        }
        setIsLoading(true)
        try {
            const data = await registerUser(userData);
            console.log(data)
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate("/dashboard");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            
        }
    }

    return (
        <div className={`container ${styles.auth}`}>
            {isLoading && <Loader />}
            <Card>
                <div className={styles.form}>
                    <div className='--flex-center'>
                        <TiUserAddOutline size={35} color="#999" />
                    </div>
                    <h2>Register</h2>
                    <form onSubmit={register}>
                        <input type='text' onChange={handleInputChange} value={name} placeholder='Name' required name='name' />
                        <input type='email' onChange={handleInputChange} value={email} placeholder='Email' required name='email' />
                        <input type='password' onChange={handleInputChange} value={password} placeholder='Password' required name='password' />
                        <input type='password' onChange={handleInputChange} value={password2} placeholder='Confirm Password' required name='password2' />
                        <button type="submit" className='--btn --btn-primary --btn-block'>Register</button>
                    </form>
                    <span className={styles.register}>
                        <Link to="/">Home</Link>
                        <p>&nbsp; Already have an account? &nbsp;</p>
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Register
