import React from "react";
import '../loggedinBanner/style.css'
import { Link } from "react-router-dom";

const LoggedInBanner = () => {


    return (
        <>
            <section className="nav-undernav-holds-banner">
                <div className="nav-undernav-banner">
                    <p className="undernav-text">Start tracking your progress! <Link to={'/'} className="clickhereLink">Click Here!</Link></p>
                </div>
            </section>
        </>
    )
}

export default LoggedInBanner;