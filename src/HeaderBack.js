import React from "react";
import {Typography,AppBar, CssBaseline,Toolbar,Box,} from "@material-ui/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { ArrowBackIosNewOutlined, ArrowBackIosNewSharp, ArrowBackRounded } from "@mui/icons-material";
import { ArrowBack } from "@material-ui/icons";

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

const LogUserOut = () => {
  axiosApiCall(`${process.env.REACT_APP_API_GTW}/auth/ms1/logout`, "GET")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const HeaderBack = () => (
  <>
    <CssBaseline />
    <AppBar position="relative" style={{ background: "#990000" }}>

      
       

        {/*Back Button*/}
        {/* 
        <Link to="/select" style={{ textDecoration: "none" }}>
        <Button  style={{ marginTop: "0px", marginLeft:"5px", background: "#0066CC"}}
         variant="contained" > 
         BACK
        </Button>
        </Link> 
        */}       
       

      <Toolbar>
        {/*Back Link*/}
      <Link to="/select" style={{ textDecoration: "none" }}>
            <ArrowBackIcon style={{marginTop: "6px", background: "#0066CC", color:"white"}} />
        </Link>
        <WbSunnyTwoToneIcon style={{ marginRight: "20px", marginLeft :"5px" }} />
        <Typography variant="h5" style={{  marginRight:"10px"}} >Welcome to Epsilon</Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          style={{ marginLeft: "1000px" }}
        >
           
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
        
        </Box>
      </Toolbar>
    </AppBar>
  </>
);
export default HeaderBack;
