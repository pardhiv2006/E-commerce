import React from 'react';
import './Footer.css';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col">
                    <h4 className="footer-title">ABOUT</h4>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">First Mart Stories</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4 className="footer-title">HELP</h4>
                    <ul>
                        <li><a href="#">Payments</a></li>
                        <li><a href="#">Shipping</a></li>
                        <li><a href="#">Cancellation & Returns</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Report Infringement</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4 className="footer-title">CONSUMER POLICY</h4>
                    <ul>
                        <li><a href="#">Cancellation & Returns</a></li>
                        <li><a href="#">Terms Of Use</a></li>
                        <li><a href="#">Security</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Sitemap</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4 className="footer-title">SOCIAL</h4>
                    <div className="footer-social-links">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                    </div>
                </div>
                <div className="footer-col footer-contact-col">
                    <h4 className="footer-title">Mail Us:</h4>
                    <p>First Mart Private Limited,<br />
                        Buildings Alyssa, Begonia &<br />
                        Clove Embassy Tech Village,<br />
                        Outer Ring Road, Devarabeesanahalli Village,<br />
                        Bengaluru, 560103,<br />
                        Karnataka, India</p>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container footer-bottom-content">
                    <span>&copy; 2024 First Mart. All rights reserved.</span>
                    <div className="footer-payments">
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454da.svg" alt="Payments" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
