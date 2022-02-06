import React from "react";
import { Typography, AppBar, CssBaseline, Toolbar, Box } from '@material-ui/core';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import axios from "axios";

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
    axiosApiCall("http://localhost:19030/auth/ms1/logout", "GET")
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            throw new Error(err);
        });
};

const Header = () => (
    <>
        <CssBaseline />
        <AppBar position="relative" style={{ background: '#990000' }}>
            <Toolbar>
                <WbSunnyTwoToneIcon style={{ marginRight: '20px' }} />
                <Typography variant="h5">Welcome to Epsilon</Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} style={{ marginLeft: '1000px' }} >
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button
                            style={{ marginTop: '10px', background: '#0066CC' }}
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
    </>
);
export default Header;