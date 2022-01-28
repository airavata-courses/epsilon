import React from "react";
import { Typography, AppBar, CssBaseline, Toolbar, Container } from '@material-ui/core';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

import Timefilter from "./Timefilter";

const theme = createTheme();


const Maphome = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position="relative" style={{ background: '#990000' }}>
                <Toolbar>
                    <WbSunnyTwoToneIcon style={{ marginRight: '20px' }} />
                    <Typography variant="h5">Welcome to Epsilon</Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div>

                </div>
            </main>
            <footer style={{ padding: '10px 0', position: 'absolute', left: '0', bottom: '0', right: '0' }}>
                <Typography varirant="h6" align="center" gutterBottom>
                    Applied Distributed Systems @ Epsilon
                </Typography>
                <Typography varirant="subtitle1" align="center" color="textSecondary">
                    NOAA Nexrad Data
                </Typography>
            </footer>
        </>
    );
}

export default Maphome;