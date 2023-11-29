// import React from "react"
import "../../components/Footer/styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import image from "../../assets/images/sol.png";
import "./styles.css"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-md-5" style={{display:'flex',alignItems:'center',justifyContent:'center'}} >
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled">
                  {/* Your existing list items */}
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled">
                  {/* Your existing list items */}
                </ul>
              </div>
            </div>
            
            <ul className="nav">
              <li className="nav-item"><a href="" className="nav-link pl-0"><FontAwesomeIcon icon={faFacebook} /></a></li>
              <li className="nav-item"><a href="" className="nav-link"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li className="nav-item"><a href="" className="nav-link"><FontAwesomeIcon icon={faGithub} /></a></li>
              <li className="nav-item"><a href="" className="nav-link"><FontAwesomeIcon icon={faInstagram} /></a></li>
            </ul>
           
            <br />
          </div>
          <div className="col-md-5" >
            <div className="col-md-2">
              <h5 className="text-md-right" style={{fontSize:'26px',color:'white'}}>Contact Us</h5>
              <hr />
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'1rem',width:'100%',alignItems:'center',justifyContent:'center' }}>
              <fieldset className="form-group">
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" style={{width:'100%'}} />
              </fieldset>
              <fieldset className="form-group">
                <textarea className="form-control" id="exampleMessage" placeholder="Message" style={{width:'100%'}}></textarea>
              </fieldset>
              <fieldset className="form-group text-xs-right">
                <button className="submit"  type="button" style={{backgroundColor:'white', width:'80px', height:'35px' , borderRadius:'1rem'}}>Send</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
