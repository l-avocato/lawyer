import React from "react"
import "../../components/Footer/styles.css"
import facebook from "../../Assets/images/mfaco.png";
import instagram from "../../Assets/images/minsta.png";
import linkidin from "../../Assets/images/linko.png";

function Footer() {
  return (
    <div id = "footer">
        <div className="logo container logo ">
       Avocato
        </div>
        <div className="iconso">
          <div className="icons">
            <img img src = {facebook}/>
          </div>
          <div className="icons">
            <img src = {instagram}/>
          </div>
          <div className="icons">
          <img src = {linkidin}/>
          </div>
        </div>
    </div>
  )
}

export default Footer