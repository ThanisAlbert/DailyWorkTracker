import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Link, Stack,Button } from '@mui/material';
import { Logo } from 'src/components/logo';
import redserv from '../../images/Redserv.png'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

const StyledGridItem = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const TOP_NAV_HEIGHT = 64;

export const TopNav = () => (
  <Box
    component="header"
    sx={{
      backgroundColor: '#2D7233',
      color: 'common.white',
      position: 'fixed',
      width: '100%',
      zIndex: (theme) => theme.zIndex.appBar
    }}
  >
    <Stack
      direction="row"
      sx={{
        minHeight: 80,
        px: 2
      }}
    >   
       
       <Grid container  spacing={0.5}>
         <Grid item xs={10} style={{ marginTop: '15px' }} >           
             <img src={redserv} style={{ width: '120px',height:'50px' }} ></img>                  
         </Grid>

         <Grid item xs={2}  style={{ }}>
              <Box sx={{marginLeft:'50px', marginTop:'20px'}} >
              <Button variant="contained" color="success">Logout</Button>
              </Box>
         </Grid>
       </Grid>
    

    </Stack>

  </Box>
);
