// frontend/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstances/axiosInstance';

const Navbar = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/users/Profile');
                setUsername(response.data.username);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <nav className="bg-blue-600 p-4 mb-5">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    <Link to={'/home'}>GameZone</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <FaUserCircle className="text-white text-2xl" />
                    <span className="text-white">{username ? username : 'Guest'}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
