import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='logo1' src={assets.logo1} alt="" srcset="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt reprehenderit quod deleniti fuga explicabo et, ratione rem mollitia sint officia tempore eos est, assumenda nobis fugiat qui quis dolores pariatur.</p>
                <div className="footer-social icons">
                    <img src={assets.facebook_icon} alt="" srcset="" />
                    <img src={assets.twitter_icon} alt="" srcset="" />
                    <img src={assets.linkedin_icon} alt="" srcset="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy and Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 7499174856</li>
                    <li>hkhairnar202@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 @ hkhairnar202@gmail.com. All Right Reserved.</p>
        
    </div>
  )
}

export default Footer