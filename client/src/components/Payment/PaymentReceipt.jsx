import React from 'react';
import "./PaymentReceipt.css"

const PaymentReceipt = () => {
  return (
    <div className="payment-receipt">
      <h2>Hello Anna Walley,</h2>
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
      
       

        

        

        <h3>Quantity</h3>
        <p>1</p>

        <h3>Subtotal</h3>
        <p>$275.00</p>
        <h3>Description</h3>
        <p>
          Mira Theme Customization <br />
          Monthly Subscription <br />
          Additional Service
        </p>
        
       

        <h3>Amount</h3>
        <p>
          $150.00 <br />
          $25.00 <br />
          $100.00
        </p>
    
    </div>
  );
};

export default PaymentReceipt;
