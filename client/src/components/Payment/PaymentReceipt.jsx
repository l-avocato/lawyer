import React from 'react';
import "./PaymentReceipt.css"

const PaymentReceipt = () => {
  return (
    
    <div className="payment-receipt">
      <img src="https://cdn.discordapp.com/attachments/1166413458225508538/1168559628272013392/Design_sans_titre.png?ex=655234f6&is=653fbff6&hm=a3d9acaaa6e5a900253b63c523d1ad3bcafffc3878da0ff1d27234fc73ec3d22&" alt="lavocato" className='img-logo'/>
      <h2 className='hello'>Hello Anna Walley,</h2>
      <p>This is the receipt for a payment of $268.85 (USD) you made to Mira.</p>
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
          Anna Walley <br />
          4183 Forest Avenue <br />
          New York City, 10011 <br />
          USA <br />
          anna@walley.com
        </p>
        </div>

        <div className='descriptionn'>
        <h3>Payment To</h3>
        <p>
          Mira LLC <br />
          354 Roy Alley <br />
          Denver, 80202 <br />
          USA <br />
          info@mira.com
        </p>
        </div>
        <hr />
        <h3 className='descript'>Description</h3>
        <p className='mira-des'>
           <br />
          Monthly Subscription <br />
         
          Additional Service
        </p>
        <h3 className='quantity'>Quantity</h3>
        <h3 className='amount'>Amount</h3>
        <hr />
        <h3 className='SUB'>Subtotal</h3>
        <p>$275.00</p>
        

        <p className='pay'>
          $150.00 <br />
          $25.00 <br />
          $100.00
        </p>
    
    </div>
  );
};

export default PaymentReceipt;
