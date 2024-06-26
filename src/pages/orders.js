import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  FormHelperText,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';



const OrdersPage = () => {
  
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);    
  const [refresh,setRefresh]=useState([]);
  const navigate = useNavigate();

  const newformatdate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };



  const columns: GridColDef<(typeof rows)[number]>[] = [

    { 
      field: 'id', 
      headerName: 'Action', 
      width: 200, 
      renderCell: (params) => (
        <div>
          <Link to={`/edit/${params.value}`}>
            <button style={{ marginRight: '5px' }}>Edit</button>
          </Link>
          <button onClick={() => handleDelete(params.value)}>Delete</button>
        </div>
      ), 
    },
  
  
    {
      field: 'Date',
      headerName: 'Date',
      width: 150,
      editable: true,
    },
    
    {
      field: 'ProjectName',
      headerName: 'ProjectName',
      width: 150,
      editable: true,
    },
    {
      field: 'Language',
      headerName: 'Language',
      width: 110,
      editable: true,
    },
    {
      field: 'Fromtime',
      headerName: 'Fromtime',
      width: 110,
      editable: true,
    },
  
    {
      field: 'Totime',
      headerName: 'Totime',
      width: 110,
      editable: true,
    },
  
    {
      field: 'Totaltime',
      headerName: 'Totaltime',
      width: 110,
      editable: true,
    },
  
    {
      field: 'Reason',
      headerName: 'Reason',
      width: 110,
      editable: true,
    },
    
  
  ];


  const handleDelete = (id) => {
    
    console.log("Deleteid testing")
    console.log(id)

    Axios.post(`http://127.0.0.1:8000/api/deleteworkitem/${id}/`)
  .then(res => {     
     
    setRefresh("set")
    
  })  
  
  };
  
  
  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/api/getworkitem')
      .then(res => {
        const fetchedData = res.data;
        setData(fetchedData);
        console.log(fetchedData)
     
        const generatedRows = fetchedData.map((item, index) => ({
          id: item.id || index + 1,         
          Date: newformatdate(item.work_date || 'test'),
          ProjectName: item.work_projectname || 'test',
          Language: item.work_language || 'test',
          Fromtime: item.work_fromtime || 'test',
          Totime: item.work_totime || 'test',
          Totaltime: item.work_totaltime || 'test',
          Reason: item.work_reason || 'test'
        }));
               
        setRows(generatedRows);
        setRefresh("")
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [refresh]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  return (
    <>
      <Helmet>
        <title>
          Orders | Carpatin Free
        </title>
      </Helmet>
      <Box
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>            
            <div>
              <Card>

              <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
              
              </Card>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default OrdersPage;
