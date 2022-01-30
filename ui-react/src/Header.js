import React from "react";
import { Typography, AppBar, CssBaseline, Toolbar, Box } from '@material-ui/core';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const pathname = window.location.pathname
let dontShowLogout = false
if (pathname == "/") {
    dontShowLogout = true
}

const Header = () => (

    <>

        <CssBaseline />
        <AppBar position="relative" style={{ background: '#990000' }}>
            <Toolbar>
                <WbSunnyTwoToneIcon style={{ marginRight: '20px' }} />
                <Typography variant="h5">Welcome to Epsilon</Typography>
                {dontShowLogout ? null :
                    <Box component="form" noValidate sx={{ mt: 1 }} style={{ marginLeft: '1042px' }} >
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Button
                                style={{ marginTop: '10px', background: '#0066CC' }}
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Logout
                            </Button>
                        </Link>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    </>
);
export default Header;