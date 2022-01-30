import React from "react";
import { Typography, Box, CssBaseline, Container } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import Header from "./Header";

const theme = createTheme();



const DateTimeFilter = () => {
    const [value, setValue] = React.useState(null);
    const search = useLocation().search;
    const stid = new URLSearchParams(search).get('id');
    return (
        <>
            <Header />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 23,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: 4,
                        }}
                    >
                        <Typography variant="h5" align="center" color="textPrimary" gutterBottom >
                            Please select a particular date and time
                        </Typography>
                        <TextField
                            disabled
                            label="Station Selected"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '25ch' }}
                            value={stid.toUpperCase()}

                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Select Date and Time"
                                maxDate={new Date()}
                                maxTime={new Date()}
                                renderInput={(props) => <TextField {...props} />}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </LocalizationProvider>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Link to='/plotresults' style={{ textDecoration: 'none' }}>
                                <Button
                                    style={{ marginTop: '10px', background: '#990000' }}
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Generate Plot
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Container >
            </ThemeProvider >
        </>
    );

}
export default DateTimeFilter;