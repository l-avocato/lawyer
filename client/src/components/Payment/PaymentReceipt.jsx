import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PaymentReceipt.css';
import SidebarDash from '../SidebarDash/SidebarDash';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';

const PaymentReceipt = () => {
const [payment, setPayments] = useState()
const location = useLocation()
const data = location.state.data

  const getOnePayment = async(id)=>{
    try {
      const res = await axios.get(`http://localhost:1128/api/payment/getPaymentId/${id}`)
      setPayments(res.data)
      
    } catch (error) {
      console.log(error);
    }
  }
useEffect(()=>{
getOnePayment(data.id)
},[])
const handlePrint = () => {
  window.print();
};

console.log("this is the payment",payment);
// console.log("this is the data", route);
  return (
    <div>
      <NavbarDashboard />
      <div className="payment-receipt">
      
      <div className='img-logo'>
      <img src="https://cdn.discordapp.com/attachments/1166413458225508538/1168559628272013392/Design_sans_titre.png?ex=655234f6&is=653fbff6&hm=a3d9acaaa6e5a900253b63c523d1ad3bcafffc3878da0ff1d27234fc73ec3d22&" alt="lavocato"  className='newcomp'/>

      </div>
      <div className='allll'>
      <h2 className='hello'>Hello {data.fullName}</h2>
      <p className='para'>This is the receipt for a payment of $268.85 (USD) </p>
      <div className='dateP'>
        <h3>Payment Date</h3>
        <p>January 2, 2023 - 03:45 pm</p>
      </div>
      <div className='payNo'>
        <h3>Payment No.</h3>
        <p>741037024</p>
      </div>
      <hr />

      <div className='recDetail'>
        <h3>Client</h3>
        <p>
         {data.email}
        </p>
      </div>

      <div className='descriptionn'>
      <h3>Payment To</h3>
  {data.lawyer ? (
    <p>
      {data.lawyer?.id} <br />
    </p>
    ) : (
      <p>Lawyer information not available</p>
      )}
      </div>
    
      
     
      
      {/* <h3 className='amount'>{data.lawyer.amount}</h3> */}
      
      </div>
      
      <div className="button-container">
          <button className="print-button"  onClick={handlePrint} >Print</button>
          <button className="update-button" >Update</button>
        </div>
      
    </div>
    </div>
  
    
  );
};

export default PaymentReceipt;

