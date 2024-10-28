import React from "react";
import Banner from '../components/banner/index';
import Footer from '../components/footer/index';

const Info = () => {


  return (
    <>
      <Banner />
      <section className="info-holds-all">
        <div className="info-background-pic-text">
          <div className="banner-h-width">
            <h1 className="logo-text">The Climbing Wall</h1>
          </div>

          {/* <img alt='logo' src={ClimbingImage}></img> */}
          <div className=" banner-p-width">
            <p className="logo-subtext" style={{ textAlign: 'center' }}>
              Whether you're at the crag or in the gym logging your progress
              is an important step to climbing!
            </p>
          </div>
        </div>

        <section className="holds-whats-different-info">
          <div className="info-holds-moreinfo">
            <h1 className="part3-text" style={{ textAlign: 'center' }}><b>What makes us different than the other climbing apps?</b></h1>
            <p className="part3-subtext" style={{ textAlign: 'center' }}>We've all been there. Wanting to get better and trying your hardest to do that.
              One big and important step to getting better is logging your sends and projects. As you train and improve you can see your strengths and weaknesses.
              Along with what does and doesn't work for you.
            </p>
          </div>

          <div className="info-holds-moreinfo">
            <p className="part3-subtext" style={{ textAlign: 'center' }}>
              Other apps only "track" sessions and attempts and not individual sends. <b>That's where we come in!</b> Our app allows the user
              to track not only sessions but also indiviudal sends so you can truly keep a close eye on all those hard sends!  </p>
          </div>
        </section>


        {/* <button className="info-signup-button">Sign Up!</button> */}

        <section className="info-holds-3part-page-info">
          <div className="info-info-part">
            <h1 className="part3-text" style={{ textAlign: 'center' }}>Things to come</h1>
            <p className="part3-subtext" style={{ textAlign: 'center' }}>Currently this is only a web app. However in the unforseen future we plan on making this a full on mobile app.</p>
          </div>

          <div className="info-info-part">
            <h1 className="part3-text" style={{ textAlign: 'center' }}>We are The Climbing Wall</h1>
            <p className="part3-subtext" style={{ textAlign: 'center' }}>Made by climbers who share the same passion for the sport as you do!</p>
          </div>

          <div className="info-info-part">
            <h1 className="part3-text" style={{ textAlign: 'center' }}>Log some sends</h1>
            <p className="part3-subtext" style={{ textAlign: 'center' }}>Track your progress in various different ways! Including sends and projects but also with climbing and training sessions!</p>
          </div>
        </section>
      </section>
      <Footer />
    </>
  )
}

export default Info;