import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Xử lý khi nhấn nút gửi yêu cầu
    const handleForgotPassword = (e) => {
        e.preventDefault();

        if (!email) {
            setMessage('Vui lòng nhập email!');
            return;
        }

        // Giả lập xử lý quên mật khẩu
        console.log('Yêu cầu đặt lại mật khẩu cho:', email);
        setMessage('Yêu cầu đặt lại mật khẩu đã được gửi!');
        
        // Chuyển về trang đăng nhập sau vài giây
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black text-white">
            <div className="flex w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden shadow-2xl relative">
                <div 
                    className="flex-1 bg-cover bg-center opacity-20" 
                    style={{ backgroundImage: "url('https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fmih10uhu1464fx1kr0by.jpg')" }}
                ></div>
                <div className="flex-1 !p-12 bg-gray-900 text-left">
                    <h2 className="!mb-6 !text-4xl text-red-600 text-center">Quên mật khẩu</h2>
                    <form onSubmit={handleForgotPassword}>
                        <div className="!mb-4">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Email"
                                className="w-full !p-3 !mt-1 bg-gray-700 border border-gray-600 rounded-md text-white outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        {message && <p className="text-red-400 !mb-2 text-sm">{message}</p>}
                        <button 
                            type="submit" 
                            className="w-full !p-3 bg-gradient-to-r from-red-800 to-red-950 text-white rounded-lg text-lg cursor-pointer hover:from-red-600 hover:to-red-800 transition-all"
                        >
                            Gửi yêu cầu
                        </button>
                    </form>
                    <p className="text-center !mt-4">
                        Quay lại <NavLink to="/login" className="text-red-600 hover:underline">Đăng nhập</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;