import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";
import client from "../../assets/images/client.png";
import do1 from "../../assets/images/expert1.png";
import do2 from "../../assets/images/expert2.png";

function Landing() {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 200,
    });
  }, []);

  return (
    <div className="big-container">
      <Navbar />
      <div className="yellow-background">
        <div className="right-section" data-aos="fade-right">
          <img className="client-image" src={client} alt="Client" />
        </div>
        <div className="left-section" data-aos="fade-left">
          <h1 className="heading-text">Level up your law work with Avocato</h1>
          <div>
            <button className="btn2">Discover More</button>
          </div>
        </div>
      </div>
      <div className="services">
        <h1>our services</h1>
      </div>
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
      <div className="team-name">
        <h1>clients feedback</h1>
      </div>
      <div className="picture1">
        <img className="image1" src={do1}></img>
        <div className="para1">Justice is not just a goal; it's a way of life. In the pursuit of truth, I stand as a beacon of hope, advocating for fairness and equality. Together, we navigate the complexities of law, ensuring righteousness prevails</div>
      </div>
      <div className="picture2">
        <img className="image2" src={do2}></img>
        <div className="para2">
        n the courtroom, I am the voice of the voiceless, a defender of truth and fairness. Every case is a journey, and I walk it with unwavering dedication, seeking justice, one client at a time 
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
