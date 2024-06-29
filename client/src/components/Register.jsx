// src/components/Register.jsx

import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://game-app-api-chi.vercel.app/api/users/register', formData);
            toast.success('Account created successfully!', {
                position: "top-right"
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === "User already exists") {
                toast.error('User already exists with this email.', {
                    position: "top-center",
                    autoClose: 3000
                });
            } else {
                toast.error('Something went wrong. Please try again.', {
                    position: "top-right"
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Register</h2>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    onChange={handleChange} 
                    className="mb-4 w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    className="mb-4 w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    className="mb-4 w-full p-2 border border-gray-300 rounded"
                    required
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Register
                </button>
                <p className='mt-4'>Already have an account? <Link to={'/login'} className='text-blue-700 hover:underline'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
