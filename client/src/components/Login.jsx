import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('https://game-app-api-chi.vercel.app/api/users/login', formData);
            localStorage.setItem('token', res.data.token);
            
            console.log(res.data);
            // Redirect to the home page
            navigate('/home');
        } catch (error) {
            setError('Invalid credentials');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Login</h2>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                    className="mb-4 w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="mb-4 w-full p-2 border border-gray-300 rounded"
                />
                {loading ? (
                    <div className="w-full text-center text-blue-500">Loading...</div>
                ) : (
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                )}
                {error && <div className="mt-4 text-center text-red-500">{error}</div>}



                <p className='mt-3'>Don't have accout? <Link to={'/register' } className='text-blue-700 hover:underline'>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
