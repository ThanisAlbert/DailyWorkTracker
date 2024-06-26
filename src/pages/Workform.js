import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Axios from 'axios';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Margin } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';


const companySizeOptions = ['VBA', 'Python', 'React'];

const initialValues = {
  
};

const validationSchema = Yup.object({
  companyName: Yup
    .string()
    .max(255)
    .required('Company name is required'),
  companySize: Yup
    .string()
    .max(255)
    .oneOf(companySizeOptions)
    .required('Company size is required'),
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  name: Yup
    .string()
    .max(255)
    .required('Name is required'),
  jobTitle: Yup
    .string()
    .max(255)
    .required('Job title is required')
});

const Workform = () => {

  const startDatevar = new Date()
  const startDateOnly = startDatevar.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(null);
  const [projectname, setProjectname]=useState("");
  const [language, setLanguage]=useState("")
  const [fromtime,setFromtime]=useState("")
  const [totime,setTotime]=useState("")
  const [totaltime,setTotaltime]=useState("")
  const [reason, setReason]=useState("")
  const [result,setResult]=useState("")
  const navigate = useNavigate();
  const [formattedDate, setFormattedDate] = useState('');
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      helpers.setStatus({ success: true });
      helpers.setSubmitting(false);
    }
  });


  const handleDateChange = (date) => {
    setStartDate(date);
    if (date) {
      const formatted = dayjs(date).format('DD/MM/YYYY');
      setFormattedDate(formatted);
    } else {
      setFormattedDate('');
    }
  };


  const worksubmit=(e)=>{

    e.preventDefault();  
    console.log(startDate)

    Axios.post('http://127.0.0.1:8000/api/processworkitem', {"startDate":formattedDate,"projectname":projectname,"language":language,"fromtime":fromtime,"totime":totime,"totaltime":totaltime,"reason":reason}, {
            timeout: 10000 
        })
        .then(res => {           
          console.log(res)
          setResult("DataSavedSuccessfully!!")
          navigate('orders');
        })  
  }


const test= (fromtime) =>{

console.log("fromtimetest")

  }

  return (
    <>
      <Helmet>
        <title>
          Daily Work Tracker
        </title>
      </Helmet>
      <Box
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={2}
                  md={2}
                >
                  
                </Grid>
                <Grid
                  xs={12}
                  md={8}
                >
                  <Card sx={{ padding:5 }}>
                    <form onSubmit={worksubmit}>
                    
                      <Box sx={{ maxWidth: 420 }}>
                        <Stack spacing={3}>
 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          name="datePicker"
          id="datePicker"
          label="Date"
          format="DD/MM/YYYY"
          value={startDate}
          onChange={handleDateChange}
        />
      </DemoContainer>
      </LocalizationProvider>
         

                           <TextField                          
                            label="ProjectName"
                            name="ProjectName"
                            onBlur={formik.handleBlur} 
                            onChange={(e)=>setProjectname(e.target.value)}                        
                            value={formik.values.name}
                          />
                          <TextField                          
                            label="Language"
                            name="Language"
                            onBlur={formik.handleBlur}  
                            select
                            value={formik.values.companySize} 
                            onChange={(e)=>setLanguage(e.target.value)}                   
                          >
                          {companySizeOptions.map((companySizeOption) => (
                              <MenuItem
                                key={companySizeOption}
                                value={companySizeOption}
                              >
                                {companySizeOption}
                              </MenuItem>
                            ))}


                          </TextField>
                        
                          
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['TimePicker']}>
                           <TimePicker  label="FromTime" onChange={(e)=>setFromtime(e)} />
                          </DemoContainer>
                          </LocalizationProvider>


                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['TimePicker']}>
                           <TimePicker   label="ToTime" onChange={(e)=>setTotime(e)} />
                          </DemoContainer>
                          </LocalizationProvider>


                          <TextField                          
                            label="TotalTime"
                            name="TotalTime"
                            onBlur={formik.handleBlur}                      
                            value={formik.values.companyName}
                            onChange={(e)=>setTotaltime(e.target.value)}
                          />  

                           <TextField                          
                            label="Reason"
                            name="Reason"
                            onBlur={formik.handleBlur}                      
                            value={formik.values.companyName}
                            onChange={(e)=>setReason(e.target.value)} 
                          />                     
                        
                        </Stack>

                        {formik.errors.submit && (
                          <FormHelperText
                            error
                            sx={{ mt: 3 }}
                          >
                            {formik.errors.submit}
                          </FormHelperText>
                        )}

                        <Box sx={{ mt: 3 }}>
                            
                           <Grid container spacing={2}>
                              <Grid item xs={4}>
                                <Button
                                color="primary"
                                size="large"
                                type="submit"
                                variant="contained"
                                >
                                Save 
                                </Button>
                              </Grid>
                              <Grid item xs={4} sx={{ marginTop: '10px' }}>
                                <Typography>{result}</Typography>
                              </Grid>

                            </Grid>

                        </Box>
                      </Box>
                    </form>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Workform;
