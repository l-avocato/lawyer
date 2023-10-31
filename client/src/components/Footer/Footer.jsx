import React from "react"
import "../../components/Footer/styles.css"
import facebook from "../../assets/images/mfaco.png";
import instagram from "../../assets/images/minsta.png";
import linkidin from "../../assets/images/linko.png";
import image from "../../assets/images/sol.png"
<<<<<<< HEAD
=======


>>>>>>> 18142442f5243aee886bce8e93770b9b06225f53
function Footer() {
  return (
    <div id = "footer">
      <div className="footer-case">
        </div>
        <div className="logo container logo ">
       L'Avocato
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