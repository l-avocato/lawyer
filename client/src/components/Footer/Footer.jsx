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
          <div className="col-md-5">
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
          <div className="col-md-5">
            <div className="col-md-2">
              <h5 className="text-md-right" style={{fontSize:'26px'}}>Contact Us</h5>
              <hr />
            </div>
            <form style={{display:'flex', flexDirection:'column', gap:'2rem'}}>
              <fieldset className="form-group">
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
              </fieldset>
              <fieldset className="form-group">
                <textarea className="form-control" id="exampleMessage" placeholder="Message"></textarea>
              </fieldset>
              <fieldset className="form-group text-xs-right">
                <button type="button" style={{backgroundColor:'white', width:'80px', height:'35px' , borderRadius:'1rem'}}>Send</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
