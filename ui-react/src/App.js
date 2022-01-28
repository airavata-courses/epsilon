import React from "react";
import { Typography, AppBar, CssBaseline, Toolbar, Container } from '@material-ui/core';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

const theme = createTheme();

const App = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position="relative" style={{ background: '#2E3B55' }}>
                <Toolbar>
                    <WbSunnyTwoToneIcon />
                    <Typography variant="h5">Welcome to Epsilon</Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    border: '1px solid grey',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                                    Sign In
                                </Typography>

                                <Typography variant="h6" align="center" color="textSecondary" paragraph>
                                    Please sign into your Google Account
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<GoogleIcon />}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
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
}

export default App;