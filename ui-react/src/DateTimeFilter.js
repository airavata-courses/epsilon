import React from "react";
import { Typography, Box, CssBaseline, Container } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const DateTimeFilter = () => {

    const [value, setValue] = React.useState(null);
    const search = useLocation().search;
    const stid = search ? new URLSearchParams(search).get('id') : "";
    const navigate = useNavigate();

    const RequestImageData = () => {
        const generateRequestImageRequest = {

            "year": document.getElementById("dateTimePicker").value.split(" ")[0].split("/")[2],
            "month": document.getElementById("dateTimePicker").value.split(" ")[0].split("/")[0],
            "day": document.getElementById("dateTimePicker").value.split(" ")[0].split("/")[1],
            "station": document.getElementById("stationSelected").value,
            "time": document.getElementById("dateTimePicker").value.split(" ")[1]
        }
        navigate("../plotresults", { state: generateRequestImageRequest });
    };

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
                            label="Station Selected"
                            id="stationSelected"
                            sx={{ m: 1, width: '25ch' }}
                            defaultValue={stid.toUpperCase()}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Select Date and Time"
                                ampm={false}
                                maxDateTime={new Date()}
                                renderInput={(props) => <TextField id='dateTimePicker' {...props} />}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </LocalizationProvider>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Button
                                id='generatePlotButton'
                                style={{ marginTop: '10px', background: '#990000' }}
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => RequestImageData()}
                            >
                                Generate Plot
                            </Button>
                        </Box>
                    </Box>
                </Container >
            </ThemeProvider >
        </>
    );

}

export default DateTimeFilter;