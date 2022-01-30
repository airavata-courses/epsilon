import React from "react";
import { Typography, CssBaseline, Container } from '@material-ui/core';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

import Maphome from "./Maphome";
import PlotResults from "./PlotResults";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const theme = createTheme();

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/maphome" element={<Maphome />}></Route>
                <Route path="/plotresults" element={<PlotResults />}></Route>
            </Routes>
        </Router>
    );
}

const Home = () => (
    <>
        <main>
            <div>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs" >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 23,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxShadow: 4
                            }}
                        >
                            <Avatar sx={{ m: 1 }} style={{ background: '#0066CC' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                                Sign In
                            </Typography>

                            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                                Please sign into your Google Account
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <Button
                                    style={{ marginTop: '40px', background: '#990000' }}
                                    variant="contained"
                                    startIcon={<GoogleIcon />}
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}

                                >
                                    Sign in with Google
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        </main>
    </>
);
export default App;