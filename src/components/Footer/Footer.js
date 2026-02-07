import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-email-form">
        <input
          type="email"
          placeholder="Email address"
          className="footer-email-input"
        />
        <button className="footer-get-started-btn">
          Get Started
          <span className="arrow-icon">→</span>
        </button>
      </div>
      <div className="footer__content">
        <p className="footer__top-text">Questions? Call 1-800-000-0000</p>

        <div className="footer__links">
          <ul>
            <li>FAQ</li>
            <li>Investor Relations</li>
            <li>Privacy</li>
            <li>Speed Test</li>
          </ul>

          <ul>
            <li>Help Center</li>
            <li>Jobs</li>
            <li>Cookie Preferences</li>
            <li>Legal Notices</li>
          </ul>

          <ul>
            <li>Account</li>
            <li>Ways to Watch</li>
            <li>Corporate Information</li>
            <li>Only on Netflix</li>
          </ul>

          <ul>
            <li>Media Center</li>
            <li>Terms of Use</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="social-icon" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon className="social-icon" />
            </a>
          </div>
        </div>

        <p className="footer__bottom-text">
          Netflix Clone by Aragaw Sisay Gebeyehu © 2026 — Evangadi June 2025
          Batch
        </p>
      </div>
    </footer>
  );
}

export default Footer;


