import React from "react";
import "./styles.css";
import facebook from "../../Assets/images/mfaco.png";
import instagram from "../../Assets/images/minsta.png";
import linkidin from "../../Assets/images/linko.png";

function Navbar() {
  return (
    <div id="navBar">
      <div className="topSection">
        {/* <div className="logoContainer">L'Avocato</div> */}
        <div className="rightSection">
          <div className="navBarLinks"></div>
          <div className="navBarIcons">
            <div className="icon">
              <img className="facebookIcon" src={facebook} alt="" />
            </div>
            <div className="icon">
              <img className="instagramIcon" src={instagram} alt="" />
            </div>
            <div className="icon">
              <img className="linkidinIcon" src={linkidin} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bottomSection"></div> */}
    </div>
  );
}

export default Navbar;
