import React from "react";
import "../../components/Navbar/styles.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();

  return (
    <div id="navBar">
      <div className="topSection">

        <div className="rightSection">
          <div className="navBarLinks">
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>
                Services
                <i className="fa fa-angle-down"></i>
                <ul>
                  <li>Graphic Design</li>
                  <li>Website Design</li>
                  <li>Python Programming</li>
                  <li>PHP Programming</li>
                </ul>
              </li>
              <li>
                Contact
                <i className="fa fa-angle-down"></i>
                <ul>
                  <li>
                    CSS <span>12 Available</span>
                  </li>
                  <li>
                    HTML <span>9 Available</span>
                  </li>
                  <li>
                    Jade <span>3 Available</span>
                  </li>
                  <li>
                    Javascript <span>21 Available</span>
                  </li>
                  <li>
                    Design <span>37 Available</span>
                  </li>
                </ul>
              </li>
              <li onClick={  ()=>navigate("/Signin") 
}>   Login </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Navbar;
