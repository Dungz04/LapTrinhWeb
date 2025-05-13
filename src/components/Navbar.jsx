import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_title.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 50);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const headerClass = useMemo(
        () => `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-black/50'
            }`,
        [isScrolled]
    );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            alert('Vui lòng nhập từ khóa tìm kiếm!');
            return;
        }
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        setSearchQuery('');
        if (isMenuOpen) toggleMenu();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header className={headerClass}>
            <div className="flex flex-wrap justify-between items-center !px-6 !py-2">
                {/* Logo */}
                <NavLink to="/" className="h-11">
                    <img src={logo} alt="Logo title" className="h-full" />
                </NavLink>

                {/* Hamburger icon */}
                <div className="block lg:hidden text-white text-2xl cursor-pointer" onClick={toggleMenu}>
                    <i className={isMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
                </div>

                {/* Nav */}
                <ul
                    className={`$ {isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row w-full lg:w-auto lg:items-center bg-black/90 lg:bg-transparent !mt-2 lg:mt-0  font-medium text-sm lg:text-base text-white `}
                >
                    <li className="!px-4 !py-2 lg:py-0">
                        <NavLink to="/" className={({ isActive }) => isActive ? '!text-red-600' : ''} onClick={toggleMenu}>
                            <i className="fa-solid fa-house !mr-2"></i>Trang chủ
                        </NavLink>
                    </li>
                    <li className="!px-4 !py-2 lg:py-0">
                        <NavLink to="/phim-moi" className={({ isActive }) => isActive ? '!text-red-600' : ''} onClick={toggleMenu}>
                            Phim mới
                        </NavLink>
                    </li>
                    <li className="!px-4 !py-2 lg:py-0">
                        <NavLink to="/phim-bo" className={({ isActive }) => isActive ? '!text-red-600' : ''} onClick={toggleMenu}>
                            Phim bộ
                        </NavLink>
                    </li>
                    <li className="!px-4 !py-2 lg:py-0">
                        <NavLink to="/phim-le" className={({ isActive }) => isActive ? '!text-red-600' : ''} onClick={toggleMenu}>
                            Phim lẻ
                        </NavLink>
                    </li>
                </ul>

                {/* Search */}
                <div className="relative flex items-center bg-white/10 hover:bg-white/20 transition rounded !px-3 !py-1 h-9 w-48 lg:w-60">
                    <i className="fa-solid fa-magnifying-glass text-white !mr-2 cursor-pointer" onClick={handleSearch}></i>
                    <input
                        type="text"
                        placeholder="Search"
                        aria-label="Tìm kiếm phim"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        className="bg-transparent text-white outline-none w-full placeholder-white/70 text-sm"
                    />
                </div>

                {/* Login */}
                <div className="!ml-4 !mt-2 lg:mt-0">
                    <NavLink
                        to="/login"
                        className="bg-red-600 hover:bg-red-800 text-white font-bold !py-2 !px-4 rounded transition-all"
                    >
                        Đăng nhập
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Navbar;