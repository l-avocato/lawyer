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
    field: 'fullname',
    headerName: 'Full name',
    width: 150,
    editable: true,
  },
 {
    field: 'email',
    headerName: 'Email',
    width: 230,
 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
 
];

const rows = [
  { id: 1, fullname: 'cherni dhia', email: 'chernidhia@gmail.com', age: 35 },
  { id: 2, fullname: 'haykel ksiksi', email: 'haykelksiksi@gmail.com', age: 42 },
  { id: 3, fullname: 'layla snousi', email: 'laylasnousi@gmail.com', age: 45 },
  { id: 4, fullname: 'Sarra ghrioui', email: 'Sarraghrioui@gmail.com', age: 16 },
  { id: 5, fullname: 'Tarek jdidi', email: 'Tarekjdidi@gmail.com', age: 48 },
  { id: 6, fullname: 'Mohamed mousa', email:'Mohamedmousa@gmail.com', age: 150 },
  { id: 7, fullname: 'Cyrin arfaoui', email: 'Cyrinarfaoui@gmail.com', age: 44 },
  { id: 8, fullname: 'Firas aabess', email: 'Firasaabess@gmail.com', age: 36 },
  { id: 9, fullname: 'Rawen chamsi', email: 'Rawenchamsi@gmail.com', age: 65 },
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
    <div style={{display:"flex" ,}}>  
      <NavbarDashboard />
      
    <div style={{display: 'flex',justifyContent:'center',flexDirection:"column" }}>
    {/* <div style={{display: 'flex',justifyContent:'center',flexDirection:"column"}}>
    
    </div> */}
    
      <div style={{ display: 'flex', alignItems: 'center', marginTop: "12em",marginLeft:'-50%'  }}>

        <Box sx={{ marginTop:'2rem', height: 400, width: '150%', display: 'flex'  }}>
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

