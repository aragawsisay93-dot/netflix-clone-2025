import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

import logo from "../../Assets/Images/netflix-logo.png";
import profilePic from "../../Assets/Images/Ag2014.png";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useNetflix } from "../../context/NetflixContext";

function Header() {
  const { user, logout } = useNetflix();

  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* Netflix solid header on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/search") setShowSearch(true);
  }, [location.pathname]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const doLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/signin");
  };

  return (
    <header className={`header ${scrolled ? "header--solid" : ""}`}>
      {/* LEFT */}
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Netflix Logo" className="logo" />
        </Link>

        {/* EQUAL-SPACING NAV */}
        <nav className="nav-left">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/">TV Shows</NavLink>
            </li>
            <li>
              <NavLink to="/">Movies</NavLink>
            </li>
            <li>
              <NavLink to="/">New & Popular</NavLink>
            </li>
            <li>
              <NavLink to="/mylist">My List</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {/* Search */}
        <div className={`search-wrap ${showSearch ? "open" : ""}`}>
          {showSearch && (
            <form onSubmit={submitSearch}>
              <input
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Titles, people, genres"
              />
            </form>
          )}
          <SearchIcon
            className="icon"
            onClick={() => setShowSearch((s) => !s)}
          />
        </div>

        <Link to="/mylist" className="icon-link">
          <ThumbUpAltOutlinedIcon className="icon" />
        </Link>

        <NotificationsIcon className="icon" />

        {/* PROFILE */}
        <div
          className="profile"
          onClick={() => setMenuOpen((m) => !m)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <img src={profilePic} alt="Profile" className="avatar" />
          <KeyboardArrowDownIcon className="icon small" />

          {menuOpen && (
            <div className="profile-menu">
              <div className="profile-row">
                <strong>{user?.email || "Aragaw Sisay"}</strong>
                <span className="profile-sub">Standard</span>
              </div>

              <Link to="/mylist" className="menu-item">
                My List
              </Link>
              <Link to="/search" className="menu-item">
                Search
              </Link>

              <button className="menu-item danger" onClick={doLogout}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
