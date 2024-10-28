import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../footer/style.css'
import TCW from '../../assets/logo/The Climbing Wall-TCW-WORDS.png';

const Footer = () => {
    

    return (
        <>
            <footer className="hold-everything-footer">
                <section className="holds-contact-info">
                    <div className="holds-logo-footer">
                        <img alt='logo2' src={TCW} className='footer-logo'></img>
                        <p className="footer-smallersubtext">2022 All Rights Reserved</p>
                    </div>

                    <div className="footer-contact">
                        <p className="footer-subtext">Have Questions?</p>
                        <p className="footer-smallsubtext">TheClimbingWall@gmail.com</p>
                    </div>
                </section>
            </footer>
        </>
    )
}

export default Footer;