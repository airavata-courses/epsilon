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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { constants } from "./Constants";
import FormControl from '@mui/material/FormControl';
import DatePicker from '@mui/lab/DatePicker';

const theme = createTheme();

const DateTimeFilterNasa = () => {

    const [value, setValue] = React.useState(null);
    const search = useLocation().search;
    const stid = search ? new URLSearchParams(search).get('id') : "";
    const navigate = useNavigate();

    const RequestImageData = () => {
        const generateRequestImageRequest = {

            "year": document.getElementById("dateTimePicker").value.split(" ")[0].split("/")[2],
            "month": document.getElementById("dateTimePicker").value.split(" ")[0].split("/")[0],
            "day": document.getElementById("dateTimePicker").value.split(" ")[0].split("/")[1],
           // "station": document.getElementById("stationSelectedSelect").innerHTML,
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
                        <Typography sx={{ mt: 2, mb: 2 }} variant="h5" align="center" color="textPrimary" gutterBottom >
                            Please select a particular date and time
                        </Typography>
                        
                       {/*  <FormControl style={{ minWidth: 230 }}>
                            <InputLabel sx={{ marginTop: 2 }}>
                                Select Station
                            </InputLabel>
                            <Select
                                id="stationSelectedSelect"
                                defaultValue={stid.toUpperCase()}
                                sx={{
                                    marginTop: 3,
                                    marginBottom: 2
                                }}

                            >
                                {constants["station_names"].map(item => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        */}

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
          disableFuture
          label="Responsive"
          openTo="year"
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
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

export default DateTimeFilterNasa;