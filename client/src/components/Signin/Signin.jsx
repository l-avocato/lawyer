import React ,{ useState }from 'react'
import "./Signin.css"
import { app } from '../../firebaseconfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
      <div className="sign-in-container">
    <div className="sign-in-form">
      <h2>Sign In</h2>
      <form className='form-config'>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Your email" 
           onChange={(e) => {
             setEmail(e.target.value);
           }}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Your password"
           onChange={(e) => {
            setPassword(e.target.value);
          }} />
        </div>
        <button className="sign-in-button" type="submit" onClick={handleSubmit}>
          Sign In
        </button>
        <p>You don't have an account<a href="/Signup" className='moving-signUp'>Sign up</a></p>
      </form>
    </div>
  </div>
  
  )
}

export default Signin








