import React from "react";
import { Typography, Container, AppBar, CssBaseline, Toolbar, Box } from '@material-ui/core';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { height } from "@material-ui/system";

export const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `${url}`,
    data: body,
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });

const Select = () => {

  const navigate = useNavigate();
  function clickMe(check) {
    makeNav(check);
  }

  function makeNav(check) {
    check ? navigate("../maphome", { replace: true }) : navigate("../datetimefilterNasa", { replace: true });
  }



  const LogUserOut = () => {
    axiosApiCall(`${process.env.REACT_APP_API_GTW}/auth/ms1/logout`, "GET")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" style={{ background: '#990000' }}>
        <Toolbar>
          <WbSunnyTwoToneIcon style={{ marginRight: '20px' }} />
          <Typography variant="h5">Welcome to Epsilon</Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} style={{ marginLeft: '1000px' }} >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                style={{ marginTop: "10px", background: "#0066CC" }}
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() => LogUserOut()}
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>


      <Container component="main" maxWidth="md" sx={{ marginTop: 8 }} >
        <CssBaseline />
        <Typography variant="h5" align="center" color="textPrimary" gutterBottom sx={{ fontStyle: 'italic' }}>
          Please select a data source for Visualization
        </Typography>
      </Container>

      <div id="test" style={{ display: 'flex', justifyContent: 'center', height: '100vh', marginTop : '80px' }}>

      <Box  component="span" sx={{bgcolor :"grey" , boxShadow: 4, borderRadius:2, p:6, minWidth: 0, height:140} } >

      <Button
          style={{ marginTop: "0px", marginBottom : "300px" , background: "#0066CC", width:"150px", height: "40px"}}
          variant="contained"
          sx={{ mb: 2, mr: 5 }}
          onClick={() => clickMe(true)}>
          NEXRAD
        </Button>


        <Button
          style={{ marginTop: "0px",  marginBottom : "300px", background: "#0066CC", width:"150px", height: "40px"}}
          variant="contained"

          sx={{ mb: 2 }}
          onClick={() => clickMe(false)}>
          NASA
        </Button>

      </Box>
  
      </div>
    </div>

  )
}

export default Select
