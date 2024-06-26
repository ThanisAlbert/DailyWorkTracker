import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const companySizeOptions = ['VBA', 'Python', 'React'];

const initialValues = {};

const validationSchema = Yup.object({
  companyName: Yup.string().max(255).required('Company name is required'),
  companySize: Yup.string().max(255).oneOf(companySizeOptions).required('Company size is required'),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  name: Yup.string().max(255).required('Name is required'),
  jobTitle: Yup.string().max(255).required('Job title is required')
});

function EditWorkItemPage() {
  const worksubmit = (e) => {
    e.preventDefault();

    Axios.post('http://127.0.0.1:8000/api/updateworkitem',{id:id,startDate:dayjs(startDate).format('YYYY-MM-DD'),projectname:projectname,language:language,fromtime:fromtime,totime:totime,totaltime:totaltime,reason:reason})
    .then(res => {           
      navigate('/orders');
    })   
  };

  const startDatevar = new Date();
  const startDateOnly = startDatevar.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState("");
  const [projectname, setProjectname] = useState("");
  const [language, setLanguage] = useState("");
  const [fromtime, setFromtime] = useState("");
  const [totime, setTotime] = useState("");
  const [totaltime, setTotaltime] = useState("");
  const [reason, setReason] = useState("");
  const [result, setResult] = useState("");
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

  const { id } = useParams();
  const [workItem, setWorkItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get(`http://127.0.0.1:8000/api/getsingleworkitem/${id}`)
      .then(res => {
        const data = res.data[0];
        setProjectname(data.work_projectname);
        setLanguage(data.work_language);
        setStartDate(dayjs(data.work_date));
        setFromtime(dayjs(data.work_fromtime, 'HH:mm A'));
        setTotime(dayjs(data.work_totime, 'HH:mm A'));
        setTotaltime(data.work_totaltime);
        setReason(data.work_reason);

        setWorkItem({
          projectName: data.work_projectname,
          language: data.work_language,
          startDate: dayjs(data.work_date),
          fromTime: dayjs(data.work_fromtime, 'HH:mm A'),
          toTime: dayjs(data.work_totime, 'HH:mm A'),
          totalTime: data.work_totaltime,
          reason: data.work_reason
        });

        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching work item data:", err);
        setError("Error fetching work item data");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!workItem) {
    return <div>No work item data available</div>;
  }

  return (
    <>
      <Helmet>
        <title>Daily Work Tracker</title>
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
              <Grid container spacing={3}>
                <Grid xs={2} md={2}></Grid>
                <Grid xs={12} md={8}>
                  <Card sx={{ padding: 5 }}>
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
                                onChange={(dte) => setStartDate(dayjs(dte))}
                              />
                            </DemoContainer>
                          </LocalizationProvider>

                          <TextField
                            label="ProjectName"
                            name="ProjectName"
                            onBlur={formik.handleBlur}
                            onChange={(e) => setProjectname(e.target.value)}
                            value={projectname}
                          />
                          <TextField
                            label="Language"
                            name="Language"
                            onBlur={formik.handleBlur}
                            select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                          >
                            {companySizeOptions.map((companySizeOption) => (
                              <MenuItem key={companySizeOption} value={companySizeOption}>
                                {companySizeOption}
                              </MenuItem>
                            ))}
                          </TextField>

                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker
                                label="FromTime"
                                value={fromtime}
                                onChange={(time) => setFromtime(time)}
                              />
                            </DemoContainer>
                          </LocalizationProvider>

                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker
                                label="ToTime"
                                value={totime}
                                onChange={(time) => setTotime(time)}
                              />
                            </DemoContainer>
                          </LocalizationProvider>

                          <TextField
                            label="TotalTime"
                            name="TotalTime"
                            onBlur={formik.handleBlur}
                            value={totaltime}
                            onChange={(e) => setTotaltime(e.target.value)}
                          />

                          <TextField
                            label="Reason"
                            name="Reason"
                            onBlur={formik.handleBlur}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                          />
                        </Stack>

                        {formik.errors.submit && (
                          <FormHelperText error sx={{ mt: 3 }}>
                            {formik.errors.submit}
                          </FormHelperText>
                        )}

                        <Box sx={{ mt: 3 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Button color="primary" size="large" type="submit" variant="contained">
                                Update
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
}

export default EditWorkItemPage;
