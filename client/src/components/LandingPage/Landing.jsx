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
            <button className="btn2">Discover More</button>
        </div>
      </div>
      <div className="services" id="services">
        <h1>Our Services</h1>
      </div>
      <div className="services-container">
        <div style={{backgroundColor:'#f8f8f8' , width:"100%"}}>
  <div className="service-section">
    <img className="service-image" src="https://i.pinimg.com/564x/85/e9/af/85e9af635fae6aa657cd740b6e659f5d.jpg" alt="" />
    <p className="service-text">Effortless Case Management</p>
  </div>
    <p className="service-paragraph1">Simplify your legal practice with our intuitive platform. Seamlessly organize clients, cases, and tasks in one place, enhancing efficiency and streamlining your workload. Focus on what matters most - winning cases.</p>
    </div>
  <div className="service-section reverse">
    <img className="service-image" src="https://i.pinimg.com/564x/90/f1/1e/90f11ee4f16f997bf21b56607a85fffd.jpg" alt="" style={{height:380}} />
    <div>
    <p className="service-text" style={{marginTop:-160}}>Transparent Updates, Seamless Experience</p>
  </div>
    <p className="service-paragraph2">Create a transparent and engaging client experience with our update notifications. Keep your clients informed about case progress, important dates, and milestones. By fostering open communication, you build trust and loyalty, ensuring a seamless legal journey for your clients.</p>
  </div>
  <div style={{backgroundColor:'#f8f8f8' , width:"100%"}}>
  <div className="service-section">
    <img className="service-image" src="https://i.pinimg.com/564x/39/c7/a3/39c7a3d7a81ce484fb85ac8ba0ce5a06.jpg" alt="" />
    <p className="service-text">Optimized Workflow & Productivity</p>
  </div>
    <p className="service-paragraph3">Boost your productivity with our comprehensive task management features. From deadlines to documents, our platform ensures nothing slips through the cracks. Stay on top of your game, meet deadlines, and achieve success with ease. Your legal practice, supercharged.</p>
</div>
</div>
      <div className="team-name">
        <h1>Clients Feedback</h1>
      </div>
      <div>
      <div className="picture1">
        <img className="image1" src={do1}></img>
        <div className="para1">Justice is not just a goal; it's a way of life. In the pursuit of truth, I stand as a beacon of hope, advocating for fairness and equality. Together, we navigate the complexities of law, ensuring righteousness prevails</div>
      </div>
      </div>
    
      <div className="picture2">
        <img className="image2" src={do2}></img>
        <div className="para2">
        In the courtroom, I am the voice of the voiceless, a defender of truth and fairness. Every case is a journey, and I walk it with unwavering dedication, seeking justice, one client at a time 
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
