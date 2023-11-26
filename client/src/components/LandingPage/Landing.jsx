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
      <div className="yellow-background" data-aos="fade-up">
  <div className="right-section" data-aos="fade-right">
    <img className="client-image" src='https://t4.ftcdn.net/jpg/00/33/75/49/360_F_33754931_YDYltttnsR8GSDDEcnATvuLzmLtQ6zKU.jpg' alt="Client" />
  </div>
  <div className="left-section" data-aos="fade-left">
    <h1 className="heading-text">"Empower your practice, elevate your efficiency. Embrace the future of legal organization with our revolutionary app  where every case finds its perfect place."</h1>
  </div>
  <div style={{display:'flex',justifyContent:'flex-end',width:'100%',flexDirection:'column',height:'100%',alignItems:'flex-end',padding:'1rem'}} >
  <img className="client-image" src='https://t4.ftcdn.net/jpg/00/33/75/49/360_F_33754931_YDYltttnsR8GSDDEcnATvuLzmLtQ6zKU.jpg' alt="Client" />
  </div>
</div>
      <div className="services" id="services"  >
        <h1 >Our Services</h1>
      </div>
      <div className="services-container">
        <div  className="header" style={{ width:"100%" , display:'flex',height:'60vh', alignItems:'center',justifyContent:'center',gap:'3rem',backgroundColor:'#f8f8f8'}}>
    <div className="service-section">
    <img className="service-image" src="https://i.pinimg.com/564x/85/e9/af/85e9af635fae6aa657cd740b6e659f5d.jpg" alt="" />
  </div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:'60%'}} >
    <p className="service-text">Effortless Case Management</p>
    <p className="service-paragraph1">Simplify your legal practice with our intuitive platform. Seamlessly organize clients, cases, and tasks in one place, enhancing efficiency and streamlining your workload. Focus on what matters most - winning cases.</p>

    </div>
     </div>
  <div className="service-section reverse" >
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'60%'}} >
    <p className="service-text" >Transparent Updates, Seamless Experience</p>
    <p className="service-paragraph2">Create a transparent and engaging client experience with our update notifications. Keep your clients informed about case progress, important dates, and milestones. By fostering open communication, you build trust and loyalty, ensuring a seamless legal journey for your clients.</p>
  </div>
  <div className="service-section">
  <img className="service-image" src="https://i.pinimg.com/564x/90/f1/1e/90f11ee4f16f997bf21b56607a85fffd.jpg" alt="" style={{height:380}} />

  </div>
  </div>
  <div  className="header" style={{ width:"100%" , display:'flex',height:'60vh', alignItems:'center',justifyContent:'center',gap:'3rem',backgroundColor:'#f8f8f8'}}>
    <div className="service-section">
    <img className="service-image" src="https://i.pinimg.com/564x/39/c7/a3/39c7a3d7a81ce484fb85ac8ba0ce5a06.jpg" alt="" />
  </div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:'60%'}} >
    <p className="service-text">Optimized Workflow & Productivity</p>
    <p className="service-paragraph1">Boost your productivity with our comprehensive task management features. From deadlines to documents, our platform ensures nothing slips through the cracks. Stay on top of your game, meet deadlines, and achieve success with ease. Your legal practice, supercharged.</p>

    </div>
     </div>
  {/* <div style={{backgroundColor:'#f8f8f8' , width:"100%"}}>
  <div className="service-section">
    <img className="service-image" src="https://i.pinimg.com/564x/39/c7/a3/39c7a3d7a81ce484fb85ac8ba0ce5a06.jpg" alt="" />
    <p className="service-text">Optimized Workflow & Productivity</p>
  </div>
    <p className="service-paragraph3">Boost your productivity with our comprehensive task management features. From deadlines to documents, our platform ensures nothing slips through the cracks. Stay on top of your game, meet deadlines, and achieve success with ease. Your legal practice, supercharged.</p>
</div> */}
</div>
<div className="team-name">
        <h1>Clients Feedback</h1>
      </div>
      <div style={{display:'flex'}}>    
         <div style={{display:'flex', flexDirection:'column', gap:'2rem', justifyContent:'center', alignItems:'center'}}> <img style={{width:'350px', height:'350px', }} src={do1}></img>
         <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'60%'}} ><p style={{fontSize:'20px'}}> Justice is not just a goal; it's a way of life. In the pursuit of truth, I stand as a beacon of hope, advocating for fairness and equality. Together, we navigate the complexities of law, ensuring righteousness prevails </p></div>
      </div>
        <div style={{display:'flex', flexDirection:'column', gap:'2rem', justifyContent:'center', alignItems:'center'}}>
          <img  style={{width:'350px', height:'350px'}} src={do2}></img>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'60%'}} ><p style={{fontSize:'20px'}}>In the courtroom, I am the voice of the voiceless, a defender of truth and fairness. Every case is a journey,and I walk it with unwavering dedication, seeking justice</p></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
