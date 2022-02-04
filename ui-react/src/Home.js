import React from "react";
import { Typography, Container, AppBar, CssBaseline, Toolbar } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";


const theme = createTheme();

const axiosApiCall = (url, method, body = {}) =>
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

const Home = () => {
    const navigate = useNavigate();

    const ResponseGoogle = (response) => {
        axiosApiCall("http://localhost:19030/auth/ms1/google/", "POST", response)
            .then((res) => {
                console.log(res);
                makeNav();
            })
            .catch((err) => {
                throw new Error(err);
            });

    };

    function makeNav() {
        navigate("../maphome", { replace: true });
    }

    return (
        <>
            <main>
                <div>
                    <ThemeProvider theme={theme}>
                        <AppBar position="relative" style={{ background: '#990000' }}>
                            <Toolbar>
                                <WbSunnyTwoToneIcon style={{ marginRight: '20px' }} />
                                <Typography variant="h5">Welcome to Epsilon</Typography>
                            </Toolbar>
                        </AppBar>
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
                                <Box component="form" noValidate sx={{ mt: 1, boxShadow: 4 }}>
                                    <GoogleLogin
                                        clientId="636817888058-df41du2pgci4432ipd7b7afea6plq846.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        onSuccess={ResponseGoogle}
                                        cookiePolicy="single_host_origin"
                                    />
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </main>
        </>
    )
};

export default Home;