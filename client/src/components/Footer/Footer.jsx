// import React from "react"
import "../../components/Footer/styles.css"
import facebook from "../../assets/images/mfaco.png";
import instagram from "../../assets/images/minsta.png";
import linkidin from "../../assets/images/linko.png";
import image from "../../assets/images/sol.png"


import "./styles.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row d-flex justify-content-between" >
          <div className="col-md-5">
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled">
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled">
          
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
            <h5 className="text-md-right">Contact Us</h5>
            <hr />
          </div>
            <form>
              <fieldset className="form-group">
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
              </fieldset>
              <fieldset className="form-group">
                <textarea className="form-control" id="exampleMessage" placeholder="Message"></textarea>
              </fieldset>
              <fieldset className="form-group text-xs-right">
                <button type="button" className="btn btn-secondary-outline btn-lg">Send</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
