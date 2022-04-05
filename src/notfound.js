import React from "react";
import { Typography, AppBar, CssBaseline, Toolbar, Box } from '@material-ui/core';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const NotFound = () => {
    return (
        <main>
            <CssBaseline />
            <AppBar position="relative" style={{ background: '#990000' }}>
                <Toolbar>
                    <WbSunnyTwoToneIcon style={{ marginRight: '20px' }} />
                    <Typography variant="h5">Welcome to Epsilon</Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} style={{ marginLeft: '1000px' }} >
                        <Link to='/select' style={{ textDecoration: 'none' }}>
                            <Button
                                style={{ marginTop: '10px', background: '#0066CC' }}
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Home
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <div id="test" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h5">The page you are looking for doesn't exist, go back to Map Home</Typography>
            </div>
        </main>
    );
}

export default NotFound;