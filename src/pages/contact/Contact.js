import React, { useState } from 'react'
import Card from '../../components/card/Card';
import './Contact.scss'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import { GoLocation } from "react-icons/go";
import { toast } from 'react-toastify';
import axios from 'axios';

const Contact = () => {

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const data = {
        subject,
        message
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/contactus`, data);
            setSubject("");
            setMessage("");
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div className='contact'>
        <h3 className='--mt'>Contact Us</h3>
        <div className='section'>
            <form onSubmit={sendEmail}>
                <Card cardClass='card'>
                    <label>Subject</label>
                    <input type='text' placeholder='Subject' name="subject" value={subject} onChange={(e)=>setSubject(e.target.value)} required />
                    <label>Subject</label>
                    <textarea placeholder='Message' cols="30" rows="10" name="message" value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
                    <button type='submit' className='--btn --btn-primary'>Send Message</button>
                </Card>
            </form>
            <div className='details'>
                <Card cardClass="card2">
                    <h3>Our Contact Information</h3>
                    <p>Fill the form or contact us via other channels listed below</p>
                    <div className='icons'>
                        <span>
                            <FaPhoneAlt />
                            <p>+92 3134808881</p>
                        </span>
                        <span>
                            <FaEnvelope />
                            <p>salmaann.dev@gmail.com</p>
                        </span>
                        <span>
                            <GoLocation />
                            <p>Lahore, Pakistan</p>
                        </span>
                        <span>
                            <FaTwitter />
                            <p>@salmanahmad</p>
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default Contact
