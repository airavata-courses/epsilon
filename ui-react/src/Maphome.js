import React from "react";
import { Typography, AppBar, CssBaseline, Toolbar, Container } from '@material-ui/core';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';


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