import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Xử lý khi nhấn nút Đăng ký
    const handleRegister = (e) => {
        e.preventDefault();

        if (!displayName || !email || !password || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }

        console.log('Đăng ký với:', { displayName, email, password });
        setError('');
        navigate('/login');
    };

    return (
        <div className="flex justify-center items-center !min-h-screen bg-black text-white">
            <div className="flex w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden shadow-2xl relative">
                <div 
                    className="flex-1 bg-cover bg-center opacity-20" 
                    style={{ backgroundImage: "url('https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fmih10uhu1464fx1kr0by.jpg')" }}
                ></div>
                <div className="flex-1 !p-12 bg-gray-900 text-left">
                    <h2 className="!mb-3 text-2xl text-red-600 text-center">Đăng ký</h2>
                    <form onSubmit={handleRegister}>
                        <div className="!mb-2">
                            <input
                                type="text"
                                placeholder="Tên hiển thị"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                aria-label="Tên hiển thị"
                                className="w-full !p-3 bg-gray-700 border border-gray-600 rounded-md text-white outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="!mb-2">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Email"
                                className="w-full !p-3 !mt-1 bg-gray-700 border border-gray-600 rounded-md text-white outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="!mb-2">
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Mật khẩu"
                                className="w-full !p-3 !mt-1 bg-gray-700 border border-gray-600 rounded-md text-white outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <div className="!mb-2">
                            <input
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                aria-label="Xác nhận mật khẩu"
                                className="w-full !p-3 !mt-1 bg-gray-700 border border-gray-600 rounded-md text-white outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        {error && <p className="text-red-400 !mb-2 text-sm">{error}</p>}
                        <button 
                            type="submit" 
                            className="w-full !p-3 bg-gradient-to-r from-red-800 to-red-950 text-white rounded-lg text-lg cursor-pointer hover:from-red-600 hover:to-red-800 transition-all"
                        >
                            Đăng ký
                        </button>
                    </form>
                    <p className="text-center !mt-4">
                        Đã có tài khoản? <NavLink to="/login" className="text-red-600 hover:underline">Đăng nhập</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;