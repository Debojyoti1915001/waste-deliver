import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className="main-footer">
        <div className="container">
            <div className="logo">
                <img src="./images/fav.png" alt="shape" />
                <img src="./images/.png" alt="shape" />
            </div>
            <div className="row">
                {/*Col1*/}
                <div className="col">
                    <h4>Products</h4>
                    <ul className="list">
                        <li>Find Waste</li>
                        <li>Learn ML</li>
                        <li>Integrations</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className="col">
                    <h4>Company</h4>
                    <ul className="list">
                        <li>Our Services</li>
                        <li>Stories</li>
                        <li>For Cleaner</li>
                        <li>Referral Partners</li>
                        <li>Preffered Vendor</li>
                    </ul>
                </div>
                <div className="col">
                    <h4>Resources</h4>
                    <ul className="list">
                        <li>Members Guidelines</li>
                        <li>Press</li>
                        <li>FAQ</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className="col">
                    <h4>Quick Links</h4>
                    <ul className="list">
                        <li>Home</li>
                        <li>About</li>
                        <li>Features</li>
                        <li>Account</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
            <div className='black'>
               <hr/>
            </div>
            <div className="row">
                <p className="col-sm">
                    &copy;  All rights reserved by Codevengers,{new Date().getFullYear()}
                </p>
            </div>
            <div className="icon">
               <i class="fa-brands fa-facebook-f"></i>
               <i class="fa-brands fa-twitter"></i>
               <i class="fa-brands fa-linkedin"></i>
               <i class="fa-brands fa-instagram"></i>
            </div>
        </div>
    </div>
  )
}

export default Footer