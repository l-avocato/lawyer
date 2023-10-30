import React from "react";
import "../../components/Navbar/styles.css";
import facebook from "../../Assets/images/mfaco.png";
import instagram from "../../Assets/images/minsta.png";
import linkidin from "../../Assets/images/linko.png";

function Navbar() {
  return (
    <div id="navBar">
        <div className="topSection">
        <div className="logoContainer">
            L'Avocato
        </div>
        <div className="rightSection">
            <div className="navBarLinks">
                <span className="navBarLink">
                    <h3>HOMEPAGE</h3>
                </span>
                <span className="navBarLink">
                    <h3>ABOUTUS</h3>
                </span>
                <span className="navBarLink">
                    <h3>PRACTICE AREAS</h3>
                </span>
                <span className="navBarLink">
                    <h3>EXPERT TEAM</h3>
                </span>
                <span className="navBarLink">
                    <h3>CONTACT</h3>
                </span>

            </div>
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
        <div className="bottomSection">

        </div>
    </div>
  );
}

export default Navbar;