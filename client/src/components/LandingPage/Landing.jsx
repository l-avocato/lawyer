import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../components/LandingPage/styles.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";
import client from "../../Assets/images/client.png";

function Landing() {
  useEffect(() => {
    AOS.init({
      once: true, // Set once: true to trigger animations only once
      offset: 200, // Adjust the offset value as needed
    });
  }, []);

  return (
    <div className="big-container">
      <Navbar />
      <div className="right-section" data-aos="fade-right">
        <img className="client-image" src={client} alt="Client" />
      </div>
      <div className="left-section" data-aos="fade-left">
        <h1 className="heading-text">Level up your law firm with Avocato</h1>
      </div>
      <div className="section-container">
        {/* Add your other sections here */}
      </div>
      <Footer />
    </div>
  );
}

export default Landing;

{
  /* <div className="company">
        <div className="avocato-logo">
          <div className="big-title">L'Avocato</div>
        </div>
        <div className="photo"></div>
      </div>
      <div className="law-image"></div>
      <div className="Profile-pic">
        <div className="Profile-desc">
          One of the first duties of a lawyer is to engage in a candid and
          honest conversation with the client about the case, the law, and the
          possible outcomes.
        </div>
      </div>
      <div className="grey-background"></div>
      <div className="section-container">
        <div className="section-one">
          <div className="law-icon1"></div>
          <div className="btn1">
            <button>EXPLORE</button>
          </div>
        </div>
        <div className="section-two">
          <div className="law-icon2"></div>
          <div className="btn1">
            <button>EXPLORE</button>
          </div>
        </div>
        <div className="section-three">
          <div className="law-icon3"></div>
          <div className="btn1">
            <button>EXPLORE</button>
          </div>
        </div>
        <div className="section-fore">
          <div className="law-icon4"></div>
          <div className="btn1">
            <button>EXPLORE</button>
          </div>
        </div>
      </div>
      <div className="expert-team">expert team</div>
      <div className="prof1">²
        <div className="prof1-desc">
          With a sharp legal mind and a passion for justice, Lawyer 1 is known
          for their unwavering dedication to clients. Their expertise in
          criminal law and impeccable courtroom skills make them a formidable
          advocate for those seeking justice.
        </div>
      </div>
      <div className="prof2">
        <div className="prof2-desc">
          A compassionate family lawyer, Lawyer 2 s pecializes in resolving
          intricate disputes with empathy and professionalism. Their vast
          experience in matrimonial law and commitment to finding peaceful{" "}
        </div>
      </div>
      <div className="grey-background-two"></div>
      <div className="title">
        About Us 
          <div className="desc">
          </div>
        </div> */
}
