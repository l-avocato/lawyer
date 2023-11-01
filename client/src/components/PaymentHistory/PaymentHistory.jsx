import React from 'react';
import './PaymentHistory.css'; 
import { useNavigate } from 'react-router-dom';
import SidebarDash from '../SidebarDash/SidebarDash';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';


const PaymentHistory = () => {
  const navigate = useNavigate()
  const payments = [
    {
      date: '2023-10-15',
      clientName: 'Cherni dhia',
      amount: '$500',
      description: 'Consultation fee',
    },
    {
      date: '2023-09-28',
      clientName: 'leith ayadi',
      amount: '$750',
      description: 'Legal representation',
    },
    {
      date: '2023-06-28',
      clientName: 'balkis bey',
      amount: '$1750',
      description: 'Legal representation',
    },
    {
      date: '2022-09-28',
      clientName: 'aziz arfaoui',
      amount: '$950',
      description: 'divorce',
    },
    {
      date: '2023-05-08',
      clientName: 'mouhib ',
      amount: '$750',
      description: 'killing',
    }
  ];

  const handlePaymentClick = () => {
   
    navigate('/PaymentReceipt'); 
  };

  const headers = ['Date', 'Client', 'Amount', 'Description'];

  return (
      
    <div className='ALL-Cd'>
       
        <div className="payment-history-container">
        <NavbarDashboard/>
      <h2 className='word-class'>Payment History</h2>
      <table className="payment-history">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.date}</td>
              <td onClick={handlePaymentClick}>{payment.clientName}</td>
              <td>{payment.amount}</td>
              <td>{payment.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  
  );
};

export default PaymentHistory;

