import React from "react";
import { Typography, AppBar, CssBaseline, Toolbar } from '@material-ui/core';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';

const Header = () => (
    <>
        <CssBaseline />
        <AppBar position="relative" style={{ background: '#990000' }}>
            <Toolbar>
                <WbSunnyTwoToneIcon style={{ marginRight: '20px' }} />
                <Typography variant="h5">Welcome to Epsilon</Typography>
            </Toolbar>
        </AppBar>
    </>
);
export default Header;