import React from 'react';
import './PaymentHistory.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';
import SidebarDash from '../SidebarDash/SidebarDash';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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
    // <div className='ALL-Cd'>
    //    <SidebarDash/>
    //     <div className="payment-history-container">
    //   <h2 className='word-class'>Payment History</h2>
    //   <table className="payment-history">
    //     <thead>
    //       <tr>
    //         {headers.map((header, index) => (
    //           <th key={index}>{header}</th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {payments.map((payment, index) => (
    //         <tr key={index}>
    //           <td>{payment.date}</td>
    //           <td onClick={handlePaymentClick}>{payment.clientName}</td>
    //           <td>{payment.amount}</td>
    //           <td>{payment.description}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    // </div>
    <div style={{display:"flex"}}>  
      {/* <NavbarDashboard /> */}
      <SidebarDash/>
    <div style={{display: 'flex',justifyContent:'center',flexDirection:"column"}}>
    <div style={{display: 'flex',justifyContent:'center',flexDirection:"column"}}>
    <div style={{width:"160px", height:"90px" , backgroundColor:"grey" ,marginLeft:'40%' , marginTop:'3%',borderRadius:'5%'}}> <p style={{marginLeft:'4%'}}>Total Earning</p></div>
    <div style={{width:"170px", height:"90px" , backgroundColor:"grey",marginLeft:'60%' ,marginBottom:'-10%' , borderRadius:'5%'}}> <p style={{marginLeft:'4%'}}>Pending</p></div>
    </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "11rem", marginLeft: "15rem" }}>

        <Box sx={{ height: 400, width: '80%', marginLeft: "15rem" }}>
          <DataGrid
            rows={ rows}
            columns={ columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            onRowClick={handlePaymentClick}
          />
        </Box>
      </div>
      </div>
    </div>


  );
};

export default PaymentHistory;

